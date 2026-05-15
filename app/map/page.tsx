import type { Metadata } from "next";
import { MapWrapper } from "@/components/map/map-wrapper";

export const metadata: Metadata = {
  title: "Map — Journey to the East",
  description:
    "Every monument, bazaar, and station marked. Filter by category and click a marker for the story.",
};

/**
 * /map — Leaflet + OpenStreetMap (no API key) full-width interactive map.
 *
 * The actual Leaflet bits live in a client component because Leaflet
 * imports `window` at module load. We render a short editorial header
 * above the map so the page feels intentional, not a bare tile canvas.
 */
export default function MapPage() {
  return (
    <>
      <section className="container-editorial pt-32 pb-8 md:pt-40 md:pb-12">
        <p className="font-script text-2xl text-uz-terracotta mb-3">
          Where everything is
        </p>
        <h1 className="font-serif text-5xl md:text-7xl tracking-tight max-w-4xl">
          A map of the
          <span className="italic text-uz-turquoise"> Silk Road</span>.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Every city we cover, every attraction we recommend, plotted on
          OpenStreetMap. Filter by category, click a marker for a photo
          and a link to the full guide.
        </p>
      </section>

      <MapWrapper />
    </>
  );
}
