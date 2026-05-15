import type { Metadata } from "next";
import { CitiesGrid } from "@/components/cities/cities-grid";
import { UzPattern } from "@/components/ui/uz-pattern";
import { getUser } from "@/lib/auth";
import { getFavoriteKeys } from "@/lib/favorites";

export const metadata: Metadata = {
  title: "Cities of Uzbekistan — Journey to the East",
  description:
    "A guide to the five essential cities on Uzbekistan's Silk Road: Samarkand, Bukhara, Khiva, Tashkent, Fergana.",
};

export default async function CitiesPage() {
  // Fetch favorites at request time so each card knows whether to render
  // a filled heart. The Set is gzip-friendly even with many favorites.
  const user = await getUser();
  const favoriteKeys = user ? await getFavoriteKeys(user.id) : new Set<string>();
  const favoritedCitySlugs = Array.from(favoriteKeys)
    .filter((k) => k.startsWith("city:"))
    .map((k) => k.split(":")[1]);

  return (
    <>
      {/* Page header. pt-32 to clear the fixed navbar (h-16/20) with breathing room. */}
      <section className="container-editorial pt-32 pb-12 md:pt-40 md:pb-16">
        <p className="font-script text-2xl text-uz-terracotta mb-3">
          The grand tour
        </p>
        <h1 className="font-serif text-5xl md:text-7xl tracking-tight max-w-4xl">
          Five cities,
          <span className="italic text-uz-turquoise"> one Silk Road</span>.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          From Tashkent's wide Soviet boulevards to Khiva's walled mirage on
          the desert edge — these are the places that anchor a journey through
          Uzbekistan, each shaped by a different century and a different trade.
        </p>
      </section>

      <div className="container-editorial">
        <UzPattern className="h-3 text-uz-ochre/40 mb-12" />
      </div>

      {/* Filter chips + grid; client component because of filter state. */}
      <section className="container-editorial pb-24 md:pb-32">
        <CitiesGrid
          loggedIn={!!user}
          favoritedSlugs={favoritedCitySlugs}
        />
      </section>
    </>
  );
}
