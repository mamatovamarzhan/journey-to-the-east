"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, Clock, Wallet } from "lucide-react";

import type { City } from "@/content/types";
import { Badge } from "@/components/ui/badge";
import { FavoriteButton } from "@/components/favorites/favorite-button";

/**
 * Tall image hero for a city page. Title in 96px Cormorant overlaid on the
 * image with a turquoise→ultramarine gradient and three glass-morphism
 * floating "facts" chips along the bottom of the hero card.
 */
export function CityHero({
  city,
  loggedIn = false,
  isFavorited = false,
}: {
  city: City;
  loggedIn?: boolean;
  isFavorited?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Slight parallax on the bg image.
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section
      ref={ref}
      className="relative w-full h-[88svh] min-h-[600px] overflow-hidden"
    >
      <motion.div style={{ y: imageY }} className="absolute inset-0 -top-[8%] -bottom-[8%]">
        <Image
          src={city.heroImage}
          alt={city.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-uz-turquoise/30 via-uz-ultramarine/55 to-uz-ultramarine/95" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.55)_100%)]" />

      <div className="relative z-10 h-full container-editorial flex flex-col justify-end pb-24 md:pb-32 text-uz-cream">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-script text-3xl text-uz-ochre mb-3">
            {city.tagline}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="flex flex-wrap items-end justify-between gap-6"
        >
          <h1 className="font-serif font-medium text-6xl md:text-8xl lg:text-9xl leading-[0.95] tracking-tight">
            {city.name}
          </h1>
          {/* Inline favorite chip — visible only on detail page hero. */}
          <FavoriteButton
            itemType="city"
            itemId={city.slug}
            initial={isFavorited}
            loggedIn={loggedIn}
            variant="inline"
            className="bg-uz-cream/15 border-uz-cream/30 text-uz-cream hover:bg-uz-cream/25"
          />
        </motion.div>

        {/* Floating fact chips */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <Chip icon={<Calendar className="h-3.5 w-3.5" />} label="Best time" value={city.bestTime} />
          <Chip icon={<Clock className="h-3.5 w-3.5" />} label="Stay" value={city.recommendedDays} />
          <Chip icon={<Wallet className="h-3.5 w-3.5" />} label="Daily budget" value={city.dailyBudget} />
        </motion.div>
      </div>
    </section>
  );
}

function Chip({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="glass-dark rounded-2xl px-4 py-3 flex items-center gap-3 backdrop-blur-md">
      <div className="text-uz-ochre">{icon}</div>
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-uz-cream/60">{label}</p>
        <p className="text-sm font-medium text-uz-cream">{value}</p>
      </div>
    </div>
  );
}

// Suppress unused import warning if Badge no longer used in this file
void Badge;
