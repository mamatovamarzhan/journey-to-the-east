"use client";

// Thin client wrapper that lazy-loads the Leaflet map (which can't be
// server-rendered because Leaflet touches `window` on import).
//
// In Next.js 15+ App Router, `dynamic(..., { ssr: false })` must be called
// from a Client Component — hence this two-file structure: a tiny client
// wrapper here, the actual Leaflet code in ./uzbekistan-map.tsx.
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const UzbekistanMap = dynamic(
  () => import("./uzbekistan-map").then((m) => m.UzbekistanMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-[78vh] min-h-[600px] w-full flex items-center justify-center bg-uz-cream-deep/40 dark:bg-uz-ultramarine-soft/30">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin text-uz-terracotta" />
          <span>Loading the Silk Road…</span>
        </div>
      </div>
    ),
  }
);

export function MapWrapper() {
  return <UzbekistanMap />;
}
