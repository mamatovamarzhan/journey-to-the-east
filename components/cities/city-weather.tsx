"use client";

import { motion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CloudSun } from "lucide-react";

import type { City } from "@/content/types";

/**
 * Monthly weather mini-chart. We bar-chart the daytime high in Celsius and
 * color each bar by the rating (1–5) — bright ochre for prime months,
 * dimmer cream for off-season.
 */
const ratingColor = (rating: number) => {
  if (rating >= 5) return "var(--uz-terracotta)";
  if (rating >= 4) return "var(--uz-ochre)";
  if (rating >= 3) return "var(--uz-ochre-soft)";
  return "var(--uz-cream-deep)";
};

export function CityWeather({ city }: { city: City }) {
  if (!city.weather.length) return null;

  // Recharts wants plain objects, not our typed records.
  const data = city.weather.map((m) => ({
    month: m.month,
    high: m.highC,
    low: m.lowC,
    rating: m.rating,
    note: m.note,
  }));

  // Pick best months (rating === 5) to call out.
  const bestMonths = city.weather.filter((m) => m.rating === 5).map((m) => m.month);

  return (
    <section id="weather" className="scroll-mt-28">
      <p className="font-script text-2xl text-uz-terracotta mb-2">When to go</p>
      <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-4 max-w-3xl">
        Best time to visit.
      </h2>
      <p className="text-muted-foreground max-w-2xl mb-10 leading-relaxed">
        Daytime highs across the year (°C), colored by overall travel comfort —
        terracotta is prime, soft cream is to be avoided. The shoulder seasons
        consistently produce the best photographs.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="rounded-2xl border border-border bg-card p-4 md:p-8"
      >
        <div className="h-72 w-full">
          <ResponsiveContainer>
            <BarChart data={data} margin={{ top: 10, right: 10, bottom: 5, left: -10 }}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={{ stroke: "var(--border)" }}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={{ stroke: "var(--border)" }}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                unit="°"
              />
              <Tooltip
                cursor={{ fill: "var(--secondary)", opacity: 0.4 }}
                contentStyle={{
                  backgroundColor: "var(--card)",
                  borderRadius: 12,
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                  boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)",
                }}
                labelStyle={{ fontFamily: "var(--font-serif)", fontSize: 16 }}
                formatter={(val, _name, item) => {
                  const high = Number(val);
                  const low = (item?.payload as { low?: number } | undefined)?.low;
                  return [
                    low !== undefined ? `${high}° high / ${low}° low` : `${high}°`,
                    "Temperature",
                  ];
                }}
              />
              <Bar dataKey="high" radius={[6, 6, 0, 0]}>
                {data.map((entry, i) => (
                  <Cell key={i} fill={ratingColor(entry.rating)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between text-sm">
          <div className="inline-flex items-center gap-2 text-foreground/80">
            <CloudSun className="h-4 w-4 text-uz-ochre" />
            <span>
              <span className="font-medium">Prime months:</span>{" "}
              {bestMonths.length ? bestMonths.join(" · ") : "Shoulder seasons"}
            </span>
          </div>
          {/* Legend */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <Legend swatch="var(--uz-terracotta)" label="Prime" />
            <Legend swatch="var(--uz-ochre)" label="Great" />
            <Legend swatch="var(--uz-ochre-soft)" label="OK" />
            <Legend swatch="var(--uz-cream-deep)" label="Avoid" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <div className="inline-flex items-center gap-1.5">
      <span className="inline-block h-3 w-3 rounded-sm" style={{ background: swatch }} />
      <span>{label}</span>
    </div>
  );
}
