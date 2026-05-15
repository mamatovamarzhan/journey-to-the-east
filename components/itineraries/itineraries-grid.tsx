"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock, MapPin } from "lucide-react";

import { uzbekistanItineraries } from "@/content/countries/uzbekistan/itineraries";
import { Badge } from "@/components/ui/badge";
import { formatUSD, cn } from "@/lib/utils";

const FILTERS = ["All", "Budget", "Standard", "Luxury"] as const;
type Filter = (typeof FILTERS)[number];

export function ItinerariesGrid() {
  const [active, setActive] = useState<Filter>("All");

  const filtered = useMemo(() => {
    if (active === "All") return uzbekistanItineraries;
    return uzbekistanItineraries.filter((t) => t.style === active);
  }, [active]);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-10">
        {FILTERS.map((filter) => {
          const isActive = filter === active;
          return (
            <button
              key={filter}
              onClick={() => setActive(filter)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium tracking-wide transition-all",
                isActive
                  ? "bg-uz-charcoal text-uz-cream shadow-sm"
                  : "bg-uz-cream-deep/60 text-foreground/70 hover:bg-uz-cream-deep hover:text-foreground dark:bg-uz-ultramarine-soft/60 dark:hover:bg-uz-ultramarine-soft"
              )}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((trip, i) => (
          <motion.article
            key={trip.slug}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: Math.min(i * 0.06, 0.3) }}
            className="group rounded-2xl overflow-hidden bg-card border border-border hover:shadow-warm hover:-translate-y-1 transition-all duration-500"
          >
            <Link href={`/itineraries/${trip.slug}`} className="block">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={trip.heroImage}
                  alt={trip.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[900ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <Badge
                  variant={
                    trip.style === "Luxury"
                      ? "ochre"
                      : trip.style === "Budget"
                      ? "terracotta"
                      : "glass"
                  }
                  className="absolute top-4 left-4"
                >
                  {trip.style}
                </Badge>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {trip.days} days
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {trip.cities.length} cities
                  </span>
                  <span className="ml-auto font-medium text-uz-terracotta">
                    {formatUSD(trip.priceUsd)}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-medium mb-2 group-hover:text-uz-turquoise transition-colors">
                  {trip.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {trip.tagline}
                </p>
                <div className="inline-flex items-center gap-1 text-sm font-medium text-uz-terracotta opacity-0 group-hover:opacity-100 transition-opacity">
                  See day-by-day <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
