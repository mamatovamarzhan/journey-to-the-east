"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Compass, ArrowDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IMG } from "@/content/images";

/**
 * Hero. Full-screen Samarkand image with:
 *   • a subtle parallax (image translates upward slower than the page scrolls)
 *   • a turquoise → ultramarine gradient overlay so the type stays legible
 *   • Cormorant 64-80px title + an Inter subtitle + two CTAs
 *   • a scroll-cue chevron at the bottom
 */
export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // The image moves up to -120px as you scroll past the hero; the gradient
  // intensifies so text remains readable as it tightens against the next
  // section.
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.85]);

  return (
    <section
      ref={ref}
      className="relative w-full h-[100svh] min-h-[640px] overflow-hidden"
    >
      {/* Parallax background image */}
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-0 -top-[8%] -bottom-[8%]"
      >
        <Image
          src={IMG.samarkand_hero}
          alt="The Registan square in Samarkand — three madrasas facing each other across the central plaza"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Gradient overlay — turquoise top, ultramarine bottom */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-uz-turquoise/40 via-uz-ultramarine/55 to-uz-ultramarine/95"
      />
      {/* Soft vignette so the corners are darker, drawing eyes to the type */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.55)_100%)]" />

      {/* Foreground content */}
      <div className="relative z-10 h-full container-editorial flex flex-col justify-center text-uz-cream">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Badge variant="glass" className="mb-6 text-uz-cream">
            <Sparkles className="h-3 w-3 text-uz-ochre" />
            <span>An editorial travel guide · 2026 edition</span>
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
          className="font-serif font-medium text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight max-w-4xl"
        >
          Journey
          <br />
          <span className="text-uz-ochre italic">to the East</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
          className="mt-8 max-w-xl text-lg sm:text-xl text-uz-cream/85 leading-relaxed"
        >
          A modern guide to the Silk Road — turquoise domes, clay-walled
          medinas, sleeper trains, and the small kind of wonder only
          Uzbekistan offers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <Button asChild variant="terracotta" size="xl">
            <Link href="/chat">
              <Sparkles className="h-5 w-5" />
              Plan your trip with AI
            </Link>
          </Button>
          <Button asChild variant="ochre" size="xl">
            <Link href="/cities">
              <Compass className="h-5 w-5" />
              Explore cities
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute z-10 bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-uz-cream/70"
      >
        <span className="text-xs tracking-[0.25em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
