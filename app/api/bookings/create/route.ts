// POST /api/bookings/create
//
// 1. Validates input (Zod) and confirms the user is signed in.
// 2. Generates a reference like UZ-2026-001 (auto-incrementing per year).
// 3. Inserts the booking using the SERVICE-ROLE Supabase client so the
//    write doesn't depend on the user's RLS session.
// 4. Dispatches notifications to email + telegram per the chosen channel.
//    Notification failures are reported but DON'T abort the booking —
//    we'd rather store a "pending notification" than lose the record.
// 5. Returns { reference, notifications } so the chat UI can render a
//    success state.

import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";

export const runtime = "nodejs";

const tourDaySchema = z.object({
  day: z.number().int().min(1).max(30),
  city: z.string(),
  title: z.string(),
  summary: z.string(),
  stay: z.string().optional(),
});

const tourSchema = z.object({
  title: z.string().min(1),
  days: z.number().int().min(1).max(30),
  travelers: z.number().int().min(1).max(10),
  style: z.enum(["Budget", "Standard", "Luxury"]),
  cities: z.array(z.string()),
  days_plan: z.array(tourDaySchema).min(1),
  breakdown: z.object({
    flights: z.number().int().nonnegative(),
    transport: z.number().int().nonnegative(),
    lodging: z.number().int().nonnegative(),
    food: z.number().int().nonnegative(),
    activities: z.number().int().nonnegative(),
    reserve: z.number().int().nonnegative(),
  }),
  totalUsd: z.number().int().nonnegative(),
});

const bodySchema = z.object({
  full_name: z.string().min(1).max(120),
  phone: z.string().max(40).optional().nullable(),
  notification_channel: z.enum(["email", "telegram", "both"]),
  telegram_username: z.string().max(40).optional().nullable(),
  tour: tourSchema,
});

export async function POST(request: NextRequest) {
  // Auth check via the user's own server client (reads cookies).
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }

  let body: z.infer<typeof bodySchema>;
  try {
    body = bodySchema.parse(await request.json());
  } catch (e) {
    return NextResponse.json(
      { error: "Invalid request body", detail: e instanceof Error ? e.message : String(e) },
      { status: 400 }
    );
  }

  // Telegram channel requires a username we can look up.
  const usesTelegram = body.notification_channel === "telegram" || body.notification_channel === "both";
  if (usesTelegram && !body.telegram_username?.trim()) {
    return NextResponse.json(
      { error: "Telegram username is required for that notification channel." },
      { status: 400 }
    );
  }

  // ─── Generate reference ──────────────────────────────────────────
  const service = createServiceClient();
  const year = new Date().getFullYear();
  const yearStart = new Date(year, 0, 1).toISOString();

  const { count } = await service
    .from("bookings")
    .select("id", { count: "exact", head: true })
    .gte("created_at", yearStart);

  const seq = (count ?? 0) + 1;
  const reference = `UZ-${year}-${String(seq).padStart(3, "0")}`;

  // ─── Insert booking row ──────────────────────────────────────────
  const { error: insertErr } = await service.from("bookings").insert({
    user_id: user.id,
    reference,
    tour_data: body.tour,
    full_name: body.full_name,
    phone: body.phone || null,
    notification_channel: body.notification_channel,
    status: "pending",
  });
  if (insertErr) {
    return NextResponse.json(
      { error: "Couldn't save your booking", detail: insertErr.message },
      { status: 500 }
    );
  }

  // ─── Save telegram_username on the profile for next time ─────────
  if (usesTelegram && body.telegram_username) {
    await service
      .from("profiles")
      .update({ telegram_username: body.telegram_username.replace(/^@/, "") })
      .eq("user_id", user.id);
  }

  // ─── Dispatch notifications ──────────────────────────────────────
  const origin = new URL(request.url).origin;
  const notifications: { channel: string; ok: boolean; error?: string }[] = [];

  const usesEmail = body.notification_channel === "email" || body.notification_channel === "both";
  if (usesEmail && user.email) {
    const r = await safeFetch(`${origin}/api/notify/email`, {
      to: user.email,
      name: body.full_name,
      reference,
      tour: body.tour,
    });
    notifications.push({ channel: "email", ...r });
  }
  if (usesTelegram) {
    const r = await safeFetch(`${origin}/api/notify/telegram`, {
      username: body.telegram_username!,
      reference,
      tour: body.tour,
    });
    notifications.push({ channel: "telegram", ...r });
  }

  return NextResponse.json({
    reference,
    notifications,
  });
}

async function safeFetch(url: string, body: object) {
  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!r.ok) {
      const j = await r.json().catch(() => ({}));
      return { ok: false, error: j?.error ?? `HTTP ${r.status}` };
    }
    return { ok: true as const };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}
