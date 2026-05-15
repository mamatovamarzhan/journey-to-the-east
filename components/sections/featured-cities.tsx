"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { uzbekistanCities } from "@/content/countries/uzbekistan/cities";
import { Badge } from "@/components/ui/badge";
import { UzPattern } from "@/components/ui/uz-pattern";
import { FavoriteButton } from "@/components/favorites/favorite-button";

/**
 * Featured cities grid: five hand-picked cities, alternating size for visual
 * rhythm (Samarkand is largest, "hero" tile; others are smaller). Hover
 * triggers an image zoom + an overlay tint shift.
 */
export function FeaturedCities({
  loggedIn = false,
  favoritedSlugs = [],
}: {
  loggedIn?: boolean;
  favoritedSlugs?: string[];
}) {
  const favoritedSet = new Set(favoritedSlugs);
  return (
    <section className="container-editorial py-24 md:py-32">
      {/* Section header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="font-script text-2xl text-uz-terracotta mb-2">
            Where to go
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight max-w-2xl">
            Five cities, each its own
            <span className="italic text-uz-turquoise"> chapter</span>.
          </h2>
        </div>
        <Link
          href="/cities"
          className="inline-flex items-center gap-1 text-sm font-medium text-uz-terracotta hover:text-uz-terracotta-deep transition-colors group"
        >
          See all cities
          <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>

      <UzPattern className="h-3 text-uz-ochre/40 mb-12" />

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        {/* Samarkand spans 2 cols on md+, the rest are equal */}
        {uzbekistanCities.map((city, i) => {
          const isHero = i === 0;
          return (
            <motion.div
              key={city.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
              className={isHero ? "md:col-span-2 md:row-span-2" : ""}
            >
              <CityCard
                city={city}
                large={isHero}
                loggedIn={loggedIn}
                isFavorited={favoritedSet.has(city.slug)}
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function CityCard({
  city,
  large,
  loggedIn,
  isFavorited,
}: {
  city: (typeof uzbekistanCities)[number];
  large: boolean;
  loggedIn: boolean;
  isFavorited: boolean;
}) {
  return (
    <Link
      href={`/cities/${city.slug}`}
      className={`group relative block overflow-hidden rounded-2xl bg-uz-charcoal ${
        large ? "aspect-[4/5] md:aspect-auto md:h-full md:min-h-[640px]" : "aspect-[4/5]"
      }`}
    >
      <Image
        src={city.cardImage}
        alt={city.name}
        fill
        sizes={large ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
        className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-110"
      />
      {/* Bottom-up gradient for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-uz-ultramarine/95 via-uz-ultramarine/30 to-transparent" />
      {/* Hover tint — fades in a terracotta wash */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-uz-terracotta transition-opacity duration-500 mix-blend-multiply" />

      <FavoriteButton
        itemType="city"
        itemId={city.slug}
        initial={isFavorited}
        loggedIn={loggedIn}
        className="top-4 right-4"
      />

      {/* Content */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-uz-cream">
        <Badge variant="glass" className="self-start mb-3">
          {city.recommendedDays} · {city.bestTime.split("·")[0].trim()}
        </Badge>
        <h3
          className={`font-serif font-medium tracking-tight ${
            large ? "text-5xl md:text-6xl" : "text-3xl"
          }`}
        >
          {city.name}
        </h3>
        <p className={`mt-2 max-w-md text-uz-cream/85 ${large ? "text-lg" : "text-sm"}`}>
          {city.tagline}
        </p>

        <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-uz-ochre opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          Read the guide
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}
