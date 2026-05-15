"use client";

import { motion } from "framer-motion";
import { Compass, CalendarDays, Wallet } from "lucide-react";

const STARTERS = [
  {
    icon: Compass,
    text: "Plan me a 5-day trip from Almaty",
  },
  {
    icon: CalendarDays,
    text: "When's the best time to visit Samarkand?",
  },
  {
    icon: Wallet,
    text: "What can I see in Uzbekistan under $500?",
  },
];

/**
 * Three "starter" pills shown in the empty chat state. Clicking one
 * submits that prompt directly — no need to type before chatting.
 */
export function StarterChips({ onPick }: { onPick: (text: string) => void }) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {STARTERS.map((s, i) => (
        <motion.button
          key={s.text}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          onClick={() => onPick(s.text)}
          className="inline-flex items-center gap-2 rounded-full border border-uz-ochre/40 bg-uz-cream hover:bg-uz-ochre/15 dark:bg-uz-cream/10 dark:hover:bg-uz-cream/15 px-4 py-2 text-sm text-foreground/85 transition-colors"
        >
          <s.icon className="h-3.5 w-3.5 text-uz-terracotta" />
          {s.text}
        </motion.button>
      ))}
    </div>
  );
}
