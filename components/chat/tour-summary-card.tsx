"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bed,
  Calendar,
  ChevronDown,
  MapPin,
  Tag,
  Wallet,
  Sparkles,
} from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import type { Tour } from "@/lib/tour-types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn, formatUSD } from "@/lib/utils";

/**
 * The Tour Summary card — the centerpiece of the chat. Editorial-style
 * header with totals, collapsible day-by-day plan, cost-breakdown donut,
 * and a big "Confirm booking" button.
 */
export function TourSummaryCard({
  tour,
  onConfirm,
}: {
  tour: Tour;
  onConfirm: () => void;
}) {
  const chartData = [
    { name: "Flights", value: tour.breakdown.flights, color: "var(--uz-terracotta)" },
    { name: "Transport", value: tour.breakdown.transport, color: "var(--uz-ochre)" },
    { name: "Lodging", value: tour.breakdown.lodging, color: "var(--uz-turquoise)" },
    { name: "Food", value: tour.breakdown.food, color: "var(--uz-terracotta-deep)" },
    { name: "Activities", value: tour.breakdown.activities, color: "var(--uz-ochre-soft)" },
    { name: "Reserve", value: tour.breakdown.reserve, color: "var(--uz-charcoal-soft)" },
  ].filter((d) => d.value > 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="not-prose -mx-1 my-1 rounded-2xl bg-uz-ultramarine text-uz-cream overflow-hidden shadow-warm"
    >
      {/* Header */}
      <div className="relative px-6 py-6 md:px-8 md:py-8">
        <div className="absolute -top-24 -right-20 w-72 h-72 rounded-full bg-uz-ochre/20 blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <Badge variant="ochre" className="mb-3 bg-uz-ochre/15 border-uz-ochre/30 text-uz-ochre">
            <Sparkles className="h-3 w-3" />
            Your tour
          </Badge>
          <h3 className="font-serif text-3xl md:text-4xl tracking-tight leading-tight">
            {tour.title}
          </h3>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-uz-cream/80">
            <Stat icon={Calendar} label={`${tour.days} days`} />
            <Stat icon={MapPin} label={`${tour.cities.length} cities`} />
            <Stat icon={Tag} label={tour.style} />
            <Stat icon={Wallet} label={`${tour.travelers} traveler${tour.travelers === 1 ? "" : "s"}`} />
          </div>
        </div>
      </div>

      {/* Body — cream background card */}
      <div className="bg-uz-cream text-uz-charcoal">
        {/* Day-by-day, collapsible */}
        <div className="px-6 py-6 md:px-8 md:py-7 border-b border-uz-charcoal/10">
          <p className="text-xs uppercase tracking-[0.2em] text-uz-charcoal/55 mb-3">
            Day by day
          </p>
          <ol className="space-y-2">
            {tour.days_plan.map((d) => (
              <DayRow key={d.day} day={d} />
            ))}
          </ol>
        </div>

        {/* Cost breakdown + total */}
        <div className="px-6 py-6 md:px-8 md:py-7 grid grid-cols-1 md:grid-cols-[1fr_220px] gap-6 items-center">
          <ul className="text-sm divide-y divide-uz-charcoal/10">
            <BreakdownRow label="Flights" value={tour.breakdown.flights} />
            <BreakdownRow label="Transport in Uzbekistan" value={tour.breakdown.transport} />
            <BreakdownRow label="Lodging" value={tour.breakdown.lodging} />
            <BreakdownRow label="Food" value={tour.breakdown.food} />
            <BreakdownRow label="Activities" value={tour.breakdown.activities} />
            <BreakdownRow label="10% reserve" value={tour.breakdown.reserve} subtle />
            <li className="flex items-baseline justify-between pt-3">
              <span className="font-serif text-lg">Total</span>
              <span className="font-serif text-3xl tabular-nums text-uz-terracotta">
                {formatUSD(tour.totalUsd)}
              </span>
            </li>
          </ul>

          <div className="h-44">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  innerRadius={42}
                  outerRadius={70}
                  paddingAngle={2}
                  strokeWidth={2}
                  stroke="var(--uz-cream)"
                >
                  {chartData.map((slice, i) => (
                    <Cell key={i} fill={slice.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val) => formatUSD(Number(val))}
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderRadius: 10,
                    border: "1px solid #e6d9bf",
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CTA */}
        <div className="px-6 pb-7 md:px-8">
          <Button onClick={onConfirm} variant="terracotta" size="xl" className="w-full">
            <Sparkles className="h-5 w-5" />
            Confirm booking
          </Button>
          <p className="mt-3 text-xs text-center text-uz-charcoal/60">
            No payment yet — we'll confirm hotels and quote you in 1 business day.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function Stat({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <Icon className="h-3.5 w-3.5 text-uz-ochre" />
      {label}
    </span>
  );
}

function BreakdownRow({ label, value, subtle }: { label: string; value: number; subtle?: boolean }) {
  return (
    <li className={cn("flex items-center justify-between py-2", subtle && "text-uz-charcoal/55")}>
      <span>{label}</span>
      <span className="tabular-nums font-medium">{formatUSD(value)}</span>
    </li>
  );
}

function DayRow({ day }: { day: Tour["days_plan"][number] }) {
  const [open, setOpen] = useState(false);
  return (
    <li>
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <button className="w-full flex items-center gap-3 py-2 text-left group">
            <span className="shrink-0 h-7 w-7 rounded-full bg-uz-terracotta/15 text-uz-terracotta inline-flex items-center justify-center font-serif text-sm">
              {day.day}
            </span>
            <span className="flex-1">
              <span className="font-medium">{day.title}</span>
              <span className="text-sm text-uz-charcoal/65 ml-2">{day.city}</span>
            </span>
            <ChevronDown
              className={cn("h-4 w-4 text-uz-charcoal/55 transition-transform", open && "rotate-180")}
            />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0">
          <div className="pl-10 pr-2 pb-3 text-sm text-uz-charcoal/80 leading-relaxed">
            <p>{day.summary}</p>
            {day.stay && (
              <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-uz-charcoal/65">
                <Bed className="h-3 w-3" />
                Stay: {day.stay}
              </p>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </li>
  );
}
