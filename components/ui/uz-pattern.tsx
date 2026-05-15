// Reusable Uzbek-tile-inspired SVG pattern strip. Used as a section divider
// (in the footer header, between page sections, etc). Pure CSS / SVG so it
// scales crisply and respects dark mode through currentColor.

import { cn } from "@/lib/utils";

interface UzPatternProps {
  className?: string;
}

export function UzPattern({ className }: UzPatternProps) {
  return (
    <svg
      role="presentation"
      aria-hidden
      viewBox="0 0 240 24"
      preserveAspectRatio="xMidYMid slice"
      className={cn("block", className)}
    >
      <defs>
        {/* A single repeating tile: a star inside a diamond — a simplified
            riff on the eight-point Rub-el-Hizb common in Uzbek tilework. */}
        <pattern
          id="uz-tile"
          x="0"
          y="0"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <g fill="none" stroke="currentColor" strokeWidth="1">
            {/* Diamond outline */}
            <path d="M12 2 L22 12 L12 22 L2 12 Z" />
            {/* Inner 8-point star */}
            <path d="M12 5 L14 10 L19 12 L14 14 L12 19 L10 14 L5 12 L10 10 Z" />
            {/* Small center dot */}
            <circle cx="12" cy="12" r="0.8" fill="currentColor" />
          </g>
        </pattern>
      </defs>
      <rect width="240" height="24" fill="url(#uz-tile)" />
    </svg>
  );
}
