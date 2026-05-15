import type { Metadata } from "next";
import Link from "next/link";

import { requireUser } from "@/lib/auth";
import { getFavorites } from "@/lib/favorites";
import { getCityBySlug, getItineraryBySlug } from "@/content/countries";
import { FavoritesList } from "@/components/favorites/favorites-list";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Favorites — Journey to the East",
};

export default async function FavoritesPage() {
  const user = await requireUser("/favorites");
  const favorites = await getFavorites(user.id);

  // Hydrate each favorite reference into the actual city/itinerary object
  // so we can render a rich card. Stories aren't user-content yet
  // (Phase F), so for now they show as a small placeholder.
  const items = favorites
    .map((fav) => {
      if (fav.item_type === "city") {
        const found = getCityBySlug(fav.item_id);
        if (!found) return null;
        return { kind: "city" as const, fav, city: found.city };
      }
      if (fav.item_type === "itinerary") {
        const found = getItineraryBySlug(fav.item_id);
        if (!found) return null;
        return { kind: "itinerary" as const, fav, itinerary: found.itinerary };
      }
      return { kind: "story" as const, fav };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  return (
    <section className="container-editorial pt-32 pb-24 md:pt-40">
      <p className="font-script text-2xl text-uz-terracotta mb-3">Saved</p>
      <h1 className="font-serif text-5xl md:text-7xl tracking-tight max-w-3xl">
        Your <span className="italic text-uz-turquoise">favorites</span>.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
        Every place, plan, and story you've saved — collected here for the
        next time you're planning.
      </p>

      <div className="mt-12">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-10 text-center max-w-xl mx-auto">
            <h2 className="font-serif text-2xl mb-2">Nothing saved yet</h2>
            <p className="text-muted-foreground mb-6">
              Tap the heart on a city, itinerary, or story to save it here.
            </p>
            <Button asChild variant="terracotta">
              <Link href="/cities">Browse cities</Link>
            </Button>
          </div>
        ) : (
          <FavoritesList items={items} />
        )}
      </div>
    </section>
  );
}
