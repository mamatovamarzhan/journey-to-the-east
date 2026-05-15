"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { IMG } from "@/content/images";

/**
 * Editorial pull-quote — a single big testimonial set against a softly
 * blurred image so the page has a breath of pause before the newsletter.
 */
export function PullQuote() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <Image
        src={IMG.registan_night}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-25 dark:opacity-15 scale-110 blur-[2px]"
      />
      <div className="absolute inset-0 bg-uz-cream/70 dark:bg-uz-ultramarine/85" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 container-editorial max-w-4xl text-center"
      >
        <Quote className="h-10 w-10 text-uz-ochre mx-auto mb-6" />
        <blockquote className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.25] tracking-tight">
          <span className="italic">"We arrived planning a five-day visit.</span>
          {" "}
          By the second sunset on the Registan, we'd already extended the
          flights home by a week."
        </blockquote>
        <footer className="mt-8 flex flex-col items-center gap-1">
          <p className="font-script text-2xl text-uz-terracotta">— Hana &amp; Daniyar</p>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            First-time visitors · April 2026
          </p>
        </footer>
      </motion.div>
    </section>
  );
}
