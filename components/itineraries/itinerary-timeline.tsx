"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Bed, MapPin } from "lucide-react";

import type { Itinerary } from "@/content/types";
import { Badge } from "@/components/ui/badge";

/**
 * Day-by-day timeline. Each day is a horizontal row with an image and a
 * column of text — they alternate left/right on desktop, and on the left
 * margin runs a vertical accent line punctuated by the day-number dot.
 */
export function ItineraryTimeline({ itinerary }: { itinerary: Itinerary }) {
  if (!itinerary.days_plan.length) return null;

  return (
    <section>
      <p className="font-script text-2xl text-uz-terracotta mb-2">Day by day</p>
      <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-12 max-w-3xl">
        The journey, paced out.
      </h2>

      <div className="relative">
        {/* Accent vertical line behind the day dots */}
        <div className="hidden md:block absolute left-[35px] top-2 bottom-2 w-px bg-border" aria-hidden />

        <div className="space-y-16">
          {itinerary.days_plan.map((d, i) => (
            <motion.article
              key={d.day}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative md:pl-20"
            >
              {/* Day number dot */}
              <div className="hidden md:flex absolute left-0 top-1 items-center justify-center w-[70px] h-[70px] rounded-full bg-uz-terracotta text-uz-cream font-serif text-2xl shadow-warm">
                {d.day}
              </div>

              {/* Mobile day pill */}
              <div className="md:hidden mb-4">
                <Badge variant="terracotta">Day {d.day}</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-6 md:gap-10 items-start">
                {/* Text */}
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                    {d.city}
                  </p>
                  <h3 className="font-serif text-2xl md:text-3xl tracking-tight mb-3">
                    {d.title}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed mb-5">
                    {d.summary}
                  </p>

                  <ul className="space-y-2 mb-5">
                    {d.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm">
                        <MapPin className="h-3.5 w-3.5 text-uz-ochre mt-1 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {d.stay && (
                    <div className="inline-flex items-center gap-2 text-sm text-foreground/80 bg-uz-cream-deep/50 dark:bg-uz-ultramarine-soft/40 px-3 py-1.5 rounded-full">
                      <Bed className="h-3.5 w-3.5 text-uz-turquoise" />
                      <span><span className="font-medium">Stay:</span> {d.stay}</span>
                    </div>
                  )}
                </div>

                {/* Image */}
                {d.image && (
                  <div className="relative aspect-[4/3] md:aspect-[5/4] rounded-2xl overflow-hidden shadow-warm">
                    <Image
                      src={d.image}
                      alt={d.title}
                      fill
                      sizes="(min-width: 768px) 30vw, 100vw"
                      className="object-cover hover:scale-105 transition-transform duration-[1100ms]"
                    />
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
