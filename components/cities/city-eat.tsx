"use client";

import { motion } from "framer-motion";
import { UtensilsCrossed, MapPin } from "lucide-react";

import type { City } from "@/content/types";

/**
 * Where to eat — one card per dish with a "where to try" pinned line.
 */
export function CityEat({ city }: { city: City }) {
  if (!city.food.length) return null;

  return (
    <section id="eat" className="scroll-mt-28">
      <p className="font-script text-2xl text-uz-terracotta mb-2">What to eat</p>
      <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-12 max-w-3xl">
        Dishes worth a trip.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {city.food.map((f, i) => (
          <motion.div
            key={f.dish}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="rounded-2xl border border-border bg-card p-6 hover:shadow-warm hover:-translate-y-0.5 transition-all"
          >
            <UtensilsCrossed className="h-5 w-5 text-uz-terracotta mb-3" />
            <h3 className="font-serif text-2xl tracking-tight mb-2">{f.dish}</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {f.description}
            </p>
            <div className="flex items-start gap-2 pt-4 border-t border-border text-sm">
              <MapPin className="h-4 w-4 text-uz-ochre mt-0.5 shrink-0" />
              <p>
                <span className="font-medium">Where to try: </span>
                <span className="text-foreground/80">{f.whereToTry}</span>
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
