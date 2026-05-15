"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  Plane,
  Train,
  Bed,
  UtensilsCrossed,
  Ticket,
  Wallet,
  Save,
  Minus,
  Plus,
} from "lucide-react";

import { uzbekistanCities } from "@/content/countries/uzbekistan/cities";
import {
  calculateBudget,
  FLIGHT_FROM,
  type BudgetBreakdown,
} from "@/lib/budget";
import type { StayStyle } from "@/lib/db-types";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn, formatUSD } from "@/lib/utils";

const STYLES: StayStyle[] = ["Budget", "Standard", "Luxury"];
const DEPARTURES = Object.keys(FLIGHT_FROM);

/**
 * Budget calculator. Five inputs across the top (days · style · departure ·
 * cities · travelers), donut chart + itemized breakdown along the bottom.
 * The "Save plan" button writes to public.saved_trips when the user is
 * logged in; otherwise it shows a toast pointing them to /auth/login.
 */
export function BudgetCalculator() {
  const [days, setDays] = useState(7);
  const [style, setStyle] = useState<StayStyle>("Standard");
  const [departure, setDeparture] = useState("Almaty");
  const [travelers, setTravelers] = useState(2);
  const [cities, setCities] = useState<string[]>(["samarkand", "bukhara", "tashkent"]);
  const [saving, setSaving] = useState(false);
  const [planName, setPlanName] = useState("");

  const breakdown = useMemo<BudgetBreakdown>(
    () => calculateBudget({ days, style, departure, cities, travelers }),
    [days, style, departure, cities, travelers]
  );

  // Pie data — exclude lines that came out as 0 so the donut doesn't have
  // empty slivers.
  const chartData = useMemo(
    () =>
      [
        { name: "Flights", value: breakdown.flights, color: "var(--uz-terracotta)" },
        { name: "Transport", value: breakdown.transport, color: "var(--uz-ochre)" },
        { name: "Lodging", value: breakdown.lodging, color: "var(--uz-turquoise)" },
        { name: "Food", value: breakdown.food, color: "var(--uz-terracotta-deep)" },
        { name: "Activities", value: breakdown.activities, color: "var(--uz-ochre-soft)" },
        { name: "Reserve", value: breakdown.reserve, color: "var(--uz-charcoal-soft)" },
      ].filter((slice) => slice.value > 0),
    [breakdown]
  );

  function toggleCity(slug: string) {
    setCities((curr) =>
      curr.includes(slug) ? curr.filter((c) => c !== slug) : [...curr, slug]
    );
  }

  async function handleSave() {
    if (cities.length === 0) {
      toast.error("Pick at least one city before saving.");
      return;
    }
    setSaving(true);
    try {
      const supabase = createClient();
      // We rely on Supabase auth — the RLS policy requires auth.uid() match.
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.info("Sign in to save plans", {
          description: "Create a free account, then come back and save.",
          action: { label: "Sign in", onClick: () => (window.location.href = "/auth/login") },
        });
        return;
      }

      const name = planName.trim() || `${days}-day ${style} trip`;
      const { error } = await supabase.from("saved_trips").insert({
        user_id: user.id,
        name,
        days,
        style,
        cities,
        total_budget: breakdown.total,
        breakdown: { ...breakdown, departure, travelers },
      });
      if (error) throw error;

      toast.success("Plan saved", {
        description: `"${name}" is in your account. Visit /favorites to find it.`,
      });
      setPlanName("");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Couldn't save the plan";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10">
      {/* ─── Inputs column ─── */}
      <div className="space-y-8">
        {/* Days stepper */}
        <Field label="How many days?">
          <Stepper value={days} setValue={setDays} min={1} max={30} suffix="days" />
        </Field>

        {/* Style toggle */}
        <Field label="Style of trip">
          <div className="grid grid-cols-3 gap-2">
            {STYLES.map((s) => (
              <button
                key={s}
                onClick={() => setStyle(s)}
                className={cn(
                  "rounded-xl border px-4 py-3 text-sm font-medium transition-all",
                  style === s
                    ? "border-uz-terracotta bg-uz-terracotta/10 text-uz-terracotta-deep"
                    : "border-border bg-card hover:bg-secondary"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </Field>

        {/* Departure */}
        <Field label="Flying from">
          <div className="flex flex-wrap gap-2">
            {DEPARTURES.map((d) => (
              <button
                key={d}
                onClick={() => setDeparture(d)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all",
                  departure === d
                    ? "bg-uz-charcoal text-uz-cream"
                    : "bg-uz-cream-deep/60 text-foreground/70 hover:bg-uz-cream-deep dark:bg-uz-ultramarine-soft/60 dark:hover:bg-uz-ultramarine-soft"
                )}
              >
                {d}
                {FLIGHT_FROM[d] === 0 && (
                  <span className="ml-1 text-xs opacity-60">(no flight)</span>
                )}
              </button>
            ))}
          </div>
        </Field>

        {/* Cities multi-select */}
        <Field label="Which cities?" hint="Pick at least one. More cities means more train rides.">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {uzbekistanCities.map((c) => {
              const checked = cities.includes(c.slug);
              return (
                <button
                  key={c.slug}
                  onClick={() => toggleCity(c.slug)}
                  className={cn(
                    "rounded-xl border px-3 py-3 text-left text-sm transition-all",
                    checked
                      ? "border-uz-turquoise bg-uz-turquoise/10 text-uz-turquoise-deep"
                      : "border-border bg-card hover:bg-secondary"
                  )}
                >
                  <p className="font-medium">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.recommendedDays}</p>
                </button>
              );
            })}
          </div>
        </Field>

        {/* Travelers */}
        <Field label="Travelers">
          <Stepper value={travelers} setValue={setTravelers} min={1} max={6} suffix={travelers === 1 ? "person" : "people"} />
        </Field>

        {/* Save plan */}
        <div className="pt-4 border-t border-border">
          <Label htmlFor="plan-name" className="mb-2 block">
            Name this plan (optional)
          </Label>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              id="plan-name"
              placeholder={`${days}-day ${style} trip`}
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              className="flex-1"
            />
            <Button variant="terracotta" size="lg" onClick={handleSave} disabled={saving}>
              <Save className="h-4 w-4" />
              {saving ? "Saving…" : "Save plan"}
            </Button>
          </div>
        </div>
      </div>

      {/* ─── Output column ─── */}
      <motion.div
        layout
        className="lg:sticky lg:top-24 self-start space-y-6"
      >
        {/* Big total card */}
        <div className="rounded-3xl bg-uz-turquoise text-uz-cream p-8 relative overflow-hidden">
          <div className="absolute -top-24 -right-20 w-72 h-72 rounded-full bg-uz-ochre/25 blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <p className="text-xs uppercase tracking-[0.3em] text-uz-cream/70 mb-3">
              Estimated total
            </p>
            <div className="flex items-baseline gap-3 flex-wrap">
              <p className="font-serif text-6xl md:text-7xl tracking-tight tabular-nums">
                {formatUSD(breakdown.total)}
              </p>
              <Badge variant="ochre" className="bg-uz-ochre/30 text-uz-cream border-uz-ochre/40">
                for {travelers} {travelers === 1 ? "person" : "people"}
              </Badge>
            </div>
            <p className="mt-3 text-sm text-uz-cream/75">
              {formatUSD(Math.round(breakdown.total / travelers / days))} per person per day
              · over {days} {days === 1 ? "day" : "days"}
            </p>
          </div>
        </div>

        {/* Donut chart */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Where the money goes
          </p>
          <div className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  strokeWidth={2}
                  stroke="var(--card)"
                >
                  {chartData.map((slice, i) => (
                    <Cell key={i} fill={slice.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val) => formatUSD(Number(val))}
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    borderRadius: 12,
                    border: "1px solid var(--border)",
                    color: "var(--foreground)",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Itemized breakdown */}
          <ul className="mt-4 divide-y divide-border text-sm">
            <Line icon={Plane}     label="Flights (round-trip)" value={breakdown.flights} />
            <Line icon={Train}     label="Trains in Uzbekistan" value={breakdown.transport} />
            <Line icon={Bed}       label="Lodging"              value={breakdown.lodging} />
            <Line icon={UtensilsCrossed} label="Food"           value={breakdown.food} />
            <Line icon={Ticket}    label="Activities & fees"    value={breakdown.activities} />
            <Line icon={Wallet}    label="10% reserve"           value={breakdown.reserve} subtle />
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="mb-2 block text-base font-serif tracking-tight">{label}</Label>
      {hint && <p className="text-xs text-muted-foreground mb-3">{hint}</p>}
      {children}
    </div>
  );
}

function Stepper({
  value, setValue, min, max, suffix,
}: { value: number; setValue: (n: number) => void; min: number; max: number; suffix: string }) {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card p-1.5">
      <button
        onClick={() => setValue(Math.max(min, value - 1))}
        className="h-10 w-10 rounded-full inline-flex items-center justify-center hover:bg-secondary disabled:opacity-30"
        disabled={value <= min}
        aria-label="Decrease"
      >
        <Minus className="h-4 w-4" />
      </button>
      <p className="tabular-nums font-serif text-2xl w-24 text-center">
        {value} <span className="text-base text-muted-foreground">{suffix}</span>
      </p>
      <button
        onClick={() => setValue(Math.min(max, value + 1))}
        className="h-10 w-10 rounded-full inline-flex items-center justify-center hover:bg-secondary disabled:opacity-30"
        disabled={value >= max}
        aria-label="Increase"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

function Line({
  icon: Icon, label, value, subtle,
}: { icon: React.ComponentType<{ className?: string }>; label: string; value: number; subtle?: boolean }) {
  return (
    <li className={cn("flex items-center gap-3 py-2.5", subtle && "text-muted-foreground")}>
      <Icon className="h-4 w-4 text-uz-terracotta shrink-0" />
      <span className="flex-1">{label}</span>
      <span className="tabular-nums font-medium">{formatUSD(value)}</span>
    </li>
  );
}
