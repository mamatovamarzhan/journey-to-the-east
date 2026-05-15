"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import type { Itinerary } from "@/content/types";

export function ItineraryHighlights({ itinerary }: { itinerary: Itinerary }) {
  if (!itinerary.highlights.length) return null;

  return (
    <section>
      <p className="font-script text-2xl text-uz-terracotta mb-2">
        Why this one
      </p>
      <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-8 max-w-3xl">
        Highlights of the journey.
      </h2>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {itinerary.highlights.map((h, i) => (
          <motion.li
            key={h}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="flex items-start gap-3 p-5 rounded-xl border border-border bg-card"
          >
            <Sparkles className="h-5 w-5 text-uz-ochre mt-0.5 shrink-0" />
            <span className="text-base text-foreground/85 leading-relaxed">{h}</span>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
