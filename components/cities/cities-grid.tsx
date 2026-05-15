"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Clock, Wallet } from "lucide-react";

import { uzbekistanCities } from "@/content/countries/uzbekistan/cities";
import { Badge } from "@/components/ui/badge";
import { FavoriteButton } from "@/components/favorites/favorite-button";
import { cn } from "@/lib/utils";

/**
 * Each city carries an implicit set of tags that the filter chips below use.
 * Defined here (rather than in cities.ts) because the categories are a
 * presentation concern, not a content concern.
 */
const TAGS: Record<string, string[]> = {
  samarkand: ["UNESCO", "Silk Road", "Heritage"],
  bukhara: ["UNESCO", "Silk Road", "Heritage", "Crafts"],
  khiva: ["UNESCO", "Desert", "Heritage"],
  tashkent: ["Capital", "Soviet modernism", "Food"],
  fergana: ["Off-the-beaten-path", "Crafts", "Valley"],
};

const FILTERS = ["All", "UNESCO", "Silk Road", "Crafts", "Off-the-beaten-path"] as const;
type Filter = (typeof FILTERS)[number];

export function CitiesGrid({
  loggedIn = false,
  favoritedSlugs = [],
}: {
  loggedIn?: boolean;
  favoritedSlugs?: string[];
}) {
  const [active, setActive] = useState<Filter>("All");
  const favoritedSet = new Set(favoritedSlugs);

  const filtered = useMemo(() => {
    if (active === "All") return uzbekistanCities;
    return uzbekistanCities.filter((c) => TAGS[c.slug]?.includes(active));
  }, [active]);

  return (
    <div>
      {/* Filter chips */}
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

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((city, i) => (
          <motion.div
            key={city.slug}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: Math.min(i * 0.06, 0.3), ease: "easeOut" }}
          >
            <Link
              href={`/cities/${city.slug}`}
              className="group block relative aspect-[4/5] overflow-hidden rounded-2xl bg-uz-charcoal"
            >
              <Image
                src={city.cardImage}
                alt={city.name}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-uz-ultramarine/95 via-uz-ultramarine/30 to-transparent" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-25 bg-uz-terracotta transition-opacity duration-500 mix-blend-multiply" />

              <FavoriteButton
                itemType="city"
                itemId={city.slug}
                initial={favoritedSet.has(city.slug)}
                loggedIn={loggedIn}
                className="top-4 right-4"
              />

              <div className="absolute inset-0 p-6 flex flex-col text-uz-cream">
                {/* Top — tags */}
                <div className="flex flex-wrap gap-1.5">
                  {(TAGS[city.slug] ?? []).slice(0, 2).map((t) => (
                    <Badge key={t} variant="glass" className="text-[10px]">
                      {t}
                    </Badge>
                  ))}
                </div>

                {/* Bottom — name + meta */}
                <div className="mt-auto">
                  <h3 className="font-serif text-3xl md:text-4xl font-medium tracking-tight">
                    {city.name}
                  </h3>
                  <p className="mt-2 text-sm text-uz-cream/85 max-w-xs">
                    {city.tagline}
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-uz-cream/80">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {city.recommendedDays}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Wallet className="h-3 w-3" />
                      {city.dailyBudget}
                    </span>
                  </div>
                  <div className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-uz-ochre opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    Read the guide <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          <Calendar className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p>No cities match this filter yet.</p>
        </div>
      )}
    </div>
  );
}
