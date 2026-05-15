import type { Metadata } from "next";
import Link from "next/link";

import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { Booking } from "@/lib/db-types";
import type { Tour } from "@/lib/tour-types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatUSD } from "@/lib/utils";
import { Calendar, MapPin, Sparkles, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "My bookings — Journey to the East",
};

export default async function MyBookingsPage() {
  await requireUser("/my-bookings");
  const supabase = await createClient();

  // RLS limits the query to the current user automatically.
  const { data } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });
  const bookings = (data ?? []) as Booking[];

  return (
    <section className="container-editorial pt-32 pb-24 md:pt-40">
      <p className="font-script text-2xl text-uz-terracotta mb-3">Your trips</p>
      <h1 className="font-serif text-5xl md:text-7xl tracking-tight max-w-3xl">
        My <span className="italic text-uz-turquoise">bookings</span>.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
        Every tour you've confirmed, in one place. Status updates as our team
        confirms hotels and flights.
      </p>

      <div className="mt-12">
        {bookings.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-10 text-center max-w-xl mx-auto">
            <h2 className="font-serif text-2xl mb-2">No bookings yet</h2>
            <p className="text-muted-foreground mb-6">
              The AI concierge can build a personalized tour in a few minutes.
            </p>
            <Button asChild variant="terracotta">
              <Link href="/chat">
                <Sparkles className="h-4 w-4" />
                Start with the concierge
              </Link>
            </Button>
          </div>
        ) : (
          <ul className="space-y-4">
            {bookings.map((b) => (
              <BookingRow key={b.id} booking={b} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function BookingRow({ booking }: { booking: Booking }) {
  // The Tour JSON was stored when the booking was created; we trust its
  // shape because the API validates with zod before insert.
  const tour = booking.tour_data as unknown as Tour;
  const created = new Date(booking.created_at);

  return (
    <li className="rounded-2xl border border-border bg-card p-6 md:p-7 hover:shadow-warm transition-shadow">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <Badge variant="terracotta" className="font-mono tracking-wider">
              {booking.reference}
            </Badge>
            <StatusBadge status={booking.status} />
            <span className="text-xs text-muted-foreground ml-1">
              {created.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <h2 className="font-serif text-2xl tracking-tight mb-2">{tour.title}</h2>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {tour.days} days
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {tour.cities.length} cities
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Tag className="h-3.5 w-3.5" />
              {tour.style}
            </span>
          </div>
        </div>
        <div className="md:text-right">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Total</p>
          <p className="font-serif text-3xl text-uz-terracotta tabular-nums">
            {formatUSD(tour.totalUsd)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {tour.travelers} traveler{tour.travelers === 1 ? "" : "s"} · via {booking.notification_channel}
          </p>
        </div>
      </div>
    </li>
  );
}

function StatusBadge({ status }: { status: Booking["status"] }) {
  const variants = {
    pending: { variant: "ochre" as const, label: "Pending review" },
    confirmed: { variant: "default" as const, label: "Confirmed" },
    cancelled: { variant: "outline" as const, label: "Cancelled" },
  };
  const v = variants[status];
  return <Badge variant={v.variant}>{v.label}</Badge>;
}
