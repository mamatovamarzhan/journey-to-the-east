"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Ticket, MapPin } from "lucide-react";

import type { City } from "@/content/types";
import { Badge } from "@/components/ui/badge";

/**
 * Top attractions — alternating image-left / image-right editorial layout.
 * Each row carries hours, fee (USD + local), and category as inline chips.
 */
export function CityAttractions({ city }: { city: City }) {
  if (!city.attractions.length) return null;

  return (
    <section id="attractions" className="scroll-mt-28">
      <p className="font-script text-2xl text-uz-terracotta mb-2">What to see</p>
      <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-12 max-w-3xl">
        Top attractions in <span className="italic text-uz-turquoise">{city.name}</span>.
      </h2>

      <div className="space-y-16 md:space-y-24">
        {city.attractions.map((a, i) => {
          const reverse = i % 2 === 1;
          return (
            <motion.article
              key={a.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center ${
                reverse ? "md:[direction:rtl]" : ""
              }`}
            >
              <div className={`relative aspect-[4/3] md:aspect-[5/4] rounded-2xl overflow-hidden shadow-warm ${reverse ? "[direction:ltr]" : ""}`}>
                <Image
                  src={a.image}
                  alt={a.name}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover hover:scale-105 transition-transform duration-[1100ms]"
                />
              </div>

              <div className={reverse ? "[direction:ltr]" : ""}>
                <Badge variant="terracotta" className="mb-3">
                  {a.category}
                </Badge>
                <h3 className="font-serif text-3xl md:text-4xl tracking-tight mb-4">
                  {a.name}
                </h3>
                <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-6">
                  {a.description}
                </p>

                <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  {a.hours && (
                    <li className="inline-flex items-center gap-2 text-foreground/75">
                      <Clock className="h-4 w-4 text-uz-turquoise shrink-0" />
                      <span>{a.hours}</span>
                    </li>
                  )}
                  {a.fee && (
                    <li className="inline-flex items-center gap-2 text-foreground/75">
                      <Ticket className="h-4 w-4 text-uz-terracotta shrink-0" />
                      <span>
                        {a.fee.usd}
                        {a.fee.local ? ` · ${a.fee.local}` : ""}
                      </span>
                    </li>
                  )}
                  {a.durationMin && (
                    <li className="inline-flex items-center gap-2 text-foreground/75">
                      <MapPin className="h-4 w-4 text-uz-ochre shrink-0" />
                      <span>
                        ~{a.durationMin >= 60 ? `${Math.round(a.durationMin / 60)}h` : `${a.durationMin}m`} visit
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
