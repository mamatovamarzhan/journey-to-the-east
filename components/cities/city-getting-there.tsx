"use client";

import { Plane, Train, MapPin, Car } from "lucide-react";
import { motion } from "framer-motion";

import type { City } from "@/content/types";

export function CityGettingThere({ city }: { city: City }) {
  if (!city.gettingThere.length) return null;

  return (
    <section id="getting-there" className="scroll-mt-28">
      <p className="font-script text-2xl text-uz-terracotta mb-2">Logistics</p>
      <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-10 max-w-3xl">
        Getting there.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        {city.gettingThere.map((leg, i) => (
          <motion.div
            key={leg.from}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
              From
            </p>
            <h3 className="font-serif text-2xl mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-uz-turquoise" />
              {leg.from}
            </h3>

            <div className="space-y-3 text-sm">
              {leg.flight && (
                <div className="flex items-start gap-3">
                  <Plane className="h-4 w-4 text-uz-terracotta mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">By air · {leg.flight.hours}</p>
                    <p className="text-muted-foreground">{leg.flight.priceUsd}</p>
                  </div>
                </div>
              )}
              {leg.train && (
                <div className="flex items-start gap-3">
                  <Train className="h-4 w-4 text-uz-ochre mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">By train · {leg.train.hours}</p>
                    <p className="text-muted-foreground">{leg.train.priceUsd}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Getting around sub-section */}
      <div id="getting-around" className="scroll-mt-28 rounded-2xl bg-uz-cream-deep/40 dark:bg-uz-ultramarine-soft/30 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-3">
          <Car className="h-5 w-5 text-uz-terracotta" />
          <h3 className="font-serif text-2xl tracking-tight">Getting around</h3>
        </div>
        <p className="text-muted-foreground leading-relaxed">{city.gettingAround}</p>
      </div>
    </section>
  );
}
