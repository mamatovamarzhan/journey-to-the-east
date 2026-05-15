"use client";

import { motion } from "framer-motion";
import { Bed } from "lucide-react";

import type { City, StayTier } from "@/content/types";
import { Badge } from "@/components/ui/badge";
import { formatUSD } from "@/lib/utils";

/**
 * Where to stay — three columns, one per tier. Hotels are grouped by tier
 * from the city data so adding a new hotel is just a content edit.
 */
const TIERS: { tier: StayTier; label: string; sub: string; accent: string }[] = [
  { tier: "Budget", label: "Budget", sub: "$20 – $40 / night", accent: "bg-uz-cream-deep border-uz-cream-deep" },
  { tier: "Mid-range", label: "Mid-range", sub: "$50 – $100 / night", accent: "bg-uz-turquoise/10 border-uz-turquoise/30" },
  { tier: "Luxury", label: "Luxury", sub: "$120+ / night", accent: "bg-uz-ochre/15 border-uz-ochre/40" },
];

export function CityStay({ city }: { city: City }) {
  if (!city.hotels.length) return null;

  const grouped = TIERS.map((t) => ({
    ...t,
    hotels: city.hotels.filter((h) => h.tier === t.tier),
  }));

  return (
    <section id="stay" className="scroll-mt-28">
      <p className="font-script text-2xl text-uz-terracotta mb-2">Where to sleep</p>
      <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-12 max-w-3xl">
        A bed for every budget.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {grouped.map((g, ci) => (
          <motion.div
            key={g.tier}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: ci * 0.08 }}
            className={`rounded-2xl border ${g.accent} p-6 dark:bg-uz-ultramarine-soft/30`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Bed className="h-4 w-4 text-uz-turquoise" />
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {g.sub}
              </p>
            </div>
            <h3 className="font-serif text-2xl mb-5">{g.label}</h3>

            <ul className="space-y-5">
              {g.hotels.map((h) => (
                <li key={h.name}>
                  <div className="flex items-baseline justify-between gap-3 mb-1">
                    <h4 className="font-medium text-base leading-tight">{h.name}</h4>
                    <Badge variant="outline" className="shrink-0 text-xs">
                      {formatUSD(h.priceFrom)} – {formatUSD(h.priceTo)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{h.note}</p>
                </li>
              ))}
              {g.hotels.length === 0 && (
                <li className="text-sm text-muted-foreground italic">
                  Limited options in this tier — see the mid-range column.
                </li>
              )}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
