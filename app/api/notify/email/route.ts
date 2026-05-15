// POST /api/notify/email — sends a booking-confirmation email via Resend.
// Used by /api/bookings/create when the user's notification_channel
// includes "email". Returns { id } from Resend, or { error }.

import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import type { Tour } from "@/lib/tour-types";

export const runtime = "nodejs";

interface Payload {
  to: string;
  name: string;
  reference: string;
  tour: Tour;
}

export async function POST(request: NextRequest) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.FROM_EMAIL || "onboarding@resend.dev";
  if (!key) {
    return NextResponse.json(
      { error: "RESEND_API_KEY is not configured." },
      { status: 503 }
    );
  }

  const { to, name, reference, tour } = (await request.json()) as Payload;
  const resend = new Resend(key);

  const subject = `Your Journey to the East booking is confirmed — ${reference}`;
  const html = renderHtmlEmail({ name, reference, tour });

  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 502 });
    }
    return NextResponse.json({ id: data?.id ?? null });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Email send failed" },
      { status: 500 }
    );
  }
}

// ─────────────────────────────────────────────────────────────────────
// HTML email template. Inline styles + table layout because most email
// clients don't honor external CSS. Palette mirrors the site so the
// email feels like a continuation of the booking flow.
// ─────────────────────────────────────────────────────────────────────
function renderHtmlEmail({
  name,
  reference,
  tour,
}: Omit<Payload, "to">): string {
  const cream = "#FBF5EC";
  const terracotta = "#C26B4B";
  const turquoise = "#1B5E7E";
  const charcoal = "#2A2520";
  const ochre = "#D4A24C";

  const dayRows = tour.days_plan
    .map(
      (d) => `
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #e6d9bf;width:48px;color:${terracotta};font-family:Georgia,serif;font-size:18px;font-weight:600;">Day ${d.day}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e6d9bf;">
            <div style="font-family:Georgia,serif;font-size:16px;color:${charcoal};">${escape(d.title)}</div>
            <div style="font-size:13px;color:#6b5d4c;margin-top:2px;">${escape(d.city)}${d.stay ? ` · ${escape(d.stay)}` : ""}</div>
          </td>
        </tr>`
    )
    .join("");

  const breakdownRows = [
    ["Flights", tour.breakdown.flights],
    ["Transport in Uzbekistan", tour.breakdown.transport],
    ["Lodging", tour.breakdown.lodging],
    ["Food", tour.breakdown.food],
    ["Activities", tour.breakdown.activities],
    ["10% reserve", tour.breakdown.reserve],
  ]
    .map(
      ([label, val]) => `
        <tr>
          <td style="padding:6px 0;color:#6b5d4c;font-size:14px;">${label}</td>
          <td style="padding:6px 0;text-align:right;font-variant-numeric:tabular-nums;color:${charcoal};font-size:14px;">$${val.toLocaleString()}</td>
        </tr>`
    )
    .join("");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width" />
<title>Booking confirmed</title>
</head>
<body style="margin:0;padding:0;background:${cream};font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:${charcoal};">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${cream};">
    <tr><td align="center">
      <table role="presentation" cellspacing="0" cellpadding="0" width="600" style="max-width:600px;width:100%;">
        <!-- Brand bar -->
        <tr><td style="padding:32px 36px;background:${turquoise};color:${cream};border-radius:14px 14px 0 0;">
          <div style="font-size:12px;letter-spacing:0.3em;text-transform:uppercase;color:${ochre};">Journey to the East</div>
          <div style="font-family:Georgia,serif;font-size:32px;margin-top:8px;line-height:1.1;">Your booking is confirmed.</div>
          <div style="font-size:15px;margin-top:10px;color:${cream};opacity:0.9;">Booking reference <strong style="color:${ochre};letter-spacing:0.08em;">${escape(reference)}</strong></div>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:32px 36px;background:#ffffff;">
          <p style="margin:0 0 18px;font-size:16px;line-height:1.6;">Hi ${escape(name)},</p>
          <p style="margin:0 0 22px;font-size:16px;line-height:1.6;">
            Thank you for booking <em>${escape(tour.title)}</em>. We've reserved your place and will follow up within
            <strong>one business day</strong> to confirm flight dates and hotels.
          </p>

          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:22px;">
            <tr>
              <td style="padding:12px 14px;background:${cream};border-radius:8px;font-size:14px;">
                <div style="color:#6b5d4c;text-transform:uppercase;letter-spacing:0.18em;font-size:11px;">Trip</div>
                <div style="font-family:Georgia,serif;font-size:18px;color:${charcoal};margin-top:4px;">${escape(tour.title)}</div>
                <div style="font-size:13px;color:#6b5d4c;margin-top:4px;">${tour.days} days · ${tour.travelers} traveler${tour.travelers === 1 ? "" : "s"} · ${escape(tour.style)}</div>
              </td>
            </tr>
          </table>

          <h3 style="font-family:Georgia,serif;font-size:20px;margin:0 0 10px;color:${charcoal};">Itinerary</h3>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e6d9bf;border-radius:10px;overflow:hidden;margin-bottom:24px;">
            ${dayRows}
          </table>

          <h3 style="font-family:Georgia,serif;font-size:20px;margin:0 0 10px;color:${charcoal};">Cost breakdown</h3>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:6px;">
            ${breakdownRows}
            <tr>
              <td style="padding:10px 0 0;border-top:1px solid #e6d9bf;font-family:Georgia,serif;font-size:18px;color:${charcoal};">Total</td>
              <td style="padding:10px 0 0;border-top:1px solid #e6d9bf;text-align:right;font-family:Georgia,serif;font-size:22px;color:${terracotta};font-variant-numeric:tabular-nums;">$${tour.totalUsd.toLocaleString()}</td>
            </tr>
          </table>

          <p style="margin:28px 0 0;font-size:14px;color:#6b5d4c;line-height:1.6;">
            Questions? Just reply to this email — we read every message.
          </p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:24px 36px;background:${cream};border-radius:0 0 14px 14px;font-size:12px;color:#6b5d4c;line-height:1.6;">
          <p style="margin:0;">Journey to the East · Modern guidebook + AI concierge for Uzbekistan</p>
          <p style="margin:6px 0 0;">If you didn't make this booking, please reply — we'll cancel it.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// Minimal HTML escape so user-supplied names don't break the markup.
function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
