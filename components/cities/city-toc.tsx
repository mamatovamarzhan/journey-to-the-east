"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Section IDs match the anchors used by each city subsection component.
const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "attractions", label: "Top attractions" },
  { id: "stay", label: "Where to stay" },
  { id: "eat", label: "Where to eat" },
  { id: "getting-there", label: "Getting there" },
  { id: "weather", label: "Best time" },
];

/**
 * Sticky in-page table of contents for the city page. Uses
 * IntersectionObserver to highlight the section currently in view; we keep
 * a small bias toward the top half of the viewport so the highlight feels
 * snappy.
 */
export function CityToc() {
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    const observers = SECTIONS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        // Trigger when the section enters the upper third of the viewport.
        { rootMargin: "-30% 0px -55% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <nav className="sticky top-28">
      <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
        In this guide
      </p>
      <ul className="space-y-1 border-l border-border">
        {SECTIONS.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                className={cn(
                  "block -ml-px pl-4 py-1.5 text-sm transition-all border-l-2",
                  isActive
                    ? "text-uz-terracotta border-uz-terracotta font-medium"
                    : "text-muted-foreground border-transparent hover:text-foreground hover:border-uz-ochre"
                )}
              >
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
