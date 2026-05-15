"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { IMG } from "@/content/images";

/**
 * Editorial split section — a photo on one side, story-style copy on the
 * other. We use this same pattern for Top Attractions on city pages too.
 */
const POINTS = [
  {
    title: "The travel cost still surprises Western visitors",
    body:
      "Two nights at a beautiful boutique riad in Bukhara, full-day private guide, three meals out — under $120. Uzbekistan is on the cusp of becoming expensive; 2026 is the year to go.",
  },
  {
    title: "Visa-free for almost every passport",
    body:
      "Citizens of 90+ countries — including the US, UK, EU, Canada, South Korea, Japan — enter without a visa for 30 days. Border friction has finally caught up to the country's hospitality.",
  },
  {
    title: "Sleeper trains that actually work",
    body:
      "The Tashkent–Samarkand–Bukhara high-speed Afrosiyob train and the overnight Sharq sleeper are punctual, comfortable, and — at $15–35 — about a tenth of what their European cousins cost.",
  },
  {
    title: "The Silk Road's best food is not what you'd expect",
    body:
      "Plov for lunch, lagman for late afternoon, samsa from a tandyr oven on the walk home — Uzbek cuisine is meat-heavy, vegetable-rich, and far more nuanced than its reputation abroad.",
  },
];

export function WhyUzbekistan() {
  return (
    <section className="relative py-24 md:py-32 bg-uz-cream-deep/40 dark:bg-uz-ultramarine-soft/30">
      <div className="container-editorial grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative aspect-[4/5] lg:aspect-[3/4] rounded-2xl overflow-hidden shadow-warm"
        >
          <Image
            src={IMG.shah_i_zinda}
            alt="Tile detail at the Shah-i-Zinda necropolis, Samarkand"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
          {/* Floating handwritten caption */}
          <div className="absolute bottom-6 left-6 right-6">
            <p className="font-script text-3xl text-uz-cream drop-shadow-lg">
              "A whole country is opening up."
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-uz-cream/70">
              The New York Times · 2025
            </p>
          </div>
        </motion.div>

        {/* Copy */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="font-script text-2xl text-uz-terracotta mb-2"
          >
            Why now
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl tracking-tight mb-6"
          >
            Uzbekistan in
            <span className="italic text-uz-turquoise"> 2026</span>.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl"
          >
            For a few years now, this corner of Central Asia has been the
            destination travel writers whisper about. The reasons are
            practical, not romantic:
          </motion.p>

          <ul className="space-y-6">
            {POINTS.map((point, i) => (
              <motion.li
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="flex gap-4"
              >
                <CheckCircle2 className="h-5 w-5 mt-1 shrink-0 text-uz-terracotta" />
                <div>
                  <h3 className="font-serif text-xl mb-1">{point.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{point.body}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
