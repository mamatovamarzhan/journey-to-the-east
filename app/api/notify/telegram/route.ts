// POST /api/notify/telegram — sends a booking-confirmation Telegram message.
//
// How chat_id discovery works:
//   The Telegram Bot API does NOT expose username → chat_id lookup. The
//   user must have /start'd the bot first; then a Message update lands in
//   the bot's getUpdates queue with both the username and the chat_id.
//   We fetch that queue and find the matching user.
//
// Limitations:
//   - getUpdates only returns updates from the last 24 hours.
//   - If we previously called getUpdates with an offset, those updates are
//     gone. For this project's scale (occasional bookings) we accept that;
//     in production we'd run a webhook + cache chat_ids in the profile.

import { NextResponse, type NextRequest } from "next/server";
import type { Tour } from "@/lib/tour-types";

export const runtime = "nodejs";

interface Payload {
  username: string;       // without the leading @
  reference: string;
  tour: Tour;
}

export async function POST(request: NextRequest) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const botUsername = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME;
  if (!token) {
    return NextResponse.json(
      { error: "TELEGRAM_BOT_TOKEN is not configured." },
      { status: 503 }
    );
  }

  const { username, reference, tour } = (await request.json()) as Payload;
  if (!username) {
    return NextResponse.json({ error: "username is required" }, { status: 400 });
  }

  // 1) Look up chat_id from recent /start messages.
  const cleanUsername = username.replace(/^@/, "").toLowerCase();
  let chatId: number | null = null;
  try {
    const updatesRes = await fetch(`https://api.telegram.org/bot${token}/getUpdates`);
    const updatesJson = await updatesRes.json();
    if (updatesJson?.ok) {
      // Walk recent updates newest-first so we pick the most recent /start.
      const updates = (updatesJson.result as { message?: { chat: { id: number; username?: string } } }[]).slice().reverse();
      for (const u of updates) {
        const msgUser = u.message?.chat?.username?.toLowerCase();
        if (msgUser === cleanUsername && u.message?.chat?.id) {
          chatId = u.message.chat.id;
          break;
        }
      }
    }
  } catch {
    /* fall through */
  }

  if (chatId == null) {
    return NextResponse.json(
      {
        error:
          `We couldn't find a /start message from @${cleanUsername}. ` +
          `Please open Telegram, send "/start" to @${botUsername ?? "our bot"}, and try again within 24 hours.`,
      },
      { status: 422 }
    );
  }

  // 2) Compose + send the message.
  const text = formatMessage({ reference, tour });
  const sendRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "Markdown",
      disable_web_page_preview: true,
    }),
  });
  const sendJson = await sendRes.json();
  if (!sendJson?.ok) {
    return NextResponse.json(
      { error: sendJson?.description ?? "Telegram send failed" },
      { status: 502 }
    );
  }
  return NextResponse.json({ chatId, messageId: sendJson.result?.message_id });
}

function formatMessage({ reference, tour }: Pick<Payload, "reference" | "tour">): string {
  const days = tour.days_plan
    .map((d) => `*Day ${d.day}* — ${d.city}: ${d.title}${d.stay ? ` (stay: ${d.stay})` : ""}`)
    .join("\n");
  return [
    `*Journey to the East — booking confirmed* ✦`,
    ``,
    `Reference: \`${reference}\``,
    ``,
    `*${tour.title}*`,
    `${tour.days} days · ${tour.travelers} traveler${tour.travelers === 1 ? "" : "s"} · ${tour.style}`,
    ``,
    days,
    ``,
    `*Total*: $${tour.totalUsd.toLocaleString()} USD`,
    ``,
    `We'll follow up within one business day to confirm flight dates and hotels.`,
  ].join("\n");
}
