"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import type { Itinerary } from "@/content/types";
import { Badge } from "@/components/ui/badge";

export function ItineraryHero({ itinerary }: { itinerary: Itinerary }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section ref={ref} className="relative h-[78svh] min-h-[540px] overflow-hidden">
      <motion.div style={{ y: imageY }} className="absolute inset-0 -top-[8%] -bottom-[8%]">
        <Image
          src={itinerary.heroImage}
          alt={itinerary.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-uz-turquoise/30 via-uz-ultramarine/55 to-uz-ultramarine/95" />

      <div className="relative z-10 h-full container-editorial flex flex-col justify-end pb-20 md:pb-28 text-uz-cream">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge
            variant={
              itinerary.style === "Luxury"
                ? "ochre"
                : itinerary.style === "Budget"
                ? "terracotta"
                : "glass"
            }
            className="mb-5"
          >
            {itinerary.style} · {itinerary.days} days
          </Badge>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif font-medium text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight max-w-5xl"
        >
          {itinerary.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-6 max-w-2xl text-lg md:text-xl text-uz-cream/85 leading-relaxed"
        >
          {itinerary.tagline}
        </motion.p>
      </div>
    </section>
  );
}
