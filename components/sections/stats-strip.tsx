"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Landmark, Hourglass, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Stat strip directly under the hero. Each number animates from 0 to its
 * target once the strip scrolls into view (only fires once).
 */

type Stat = {
  icon: React.ComponentType<{ className?: string }>;
  /** Target numeric value for the counter, or `null` if the stat is text-only. */
  value: number | null;
  prefix?: string;
  suffix?: string;
  label: string;
  /** Optional plain-text override shown instead of an animated number. */
  display?: string;
};

const STATS: Stat[] = [
  {
    icon: TrendingUp,
    value: 47,
    suffix: "%",
    label: "Tourism growth in 2025",
  },
  {
    icon: Landmark,
    value: 4,
    suffix: "",
    label: "UNESCO World Heritage sites",
  },
  {
    icon: Hourglass,
    value: 2500,
    suffix: "+ yrs",
    label: "Of continuous history",
  },
  {
    icon: Wallet,
    value: null,
    display: "from $400",
    label: "For a 5-day Silk Road trip",
  },
];

export function StatsStrip() {
  return (
    <section className="relative -mt-20 z-20">
      <div className="container-editorial">
        <div className="glass rounded-2xl shadow-warm px-6 py-8 md:px-12 md:py-10 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
          {STATS.map((stat, i) => (
            <Counter key={stat.label} stat={stat} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({ stat, delay }: { stat: Stat; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(stat.display ?? "0");

  useEffect(() => {
    if (!inView || stat.value == null) return;
    const target = stat.value;
    const duration = 1300; // ms
    const start = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      // Ease-out cubic gives a snappier landing.
      const eased = 1 - Math.pow(1 - p, 3);
      const current = Math.round(target * eased);
      setDisplay(`${stat.prefix ?? ""}${current.toLocaleString()}${stat.suffix ?? ""}`);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, stat]);

  const Icon = stat.icon;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="flex flex-col items-center text-center"
    >
      <Icon className={cn("h-5 w-5 mb-3 text-uz-terracotta")} />
      <div className="font-serif text-4xl md:text-5xl font-medium text-foreground tabular-nums">
        {display}
      </div>
      <p className="mt-2 text-xs md:text-sm text-muted-foreground tracking-wide uppercase">
        {stat.label}
      </p>
    </motion.div>
  );
}
