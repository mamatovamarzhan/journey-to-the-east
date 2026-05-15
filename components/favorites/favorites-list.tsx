"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Wallet, MapPin } from "lucide-react";

import type { City, Itinerary } from "@/content/types";
import type { Favorite } from "@/lib/db-types";
import { FavoriteButton } from "./favorite-button";
import { Badge } from "@/components/ui/badge";
import { formatUSD } from "@/lib/utils";

type Item =
  | { kind: "city"; fav: Favorite; city: City }
  | { kind: "itinerary"; fav: Favorite; itinerary: Itinerary }
  | { kind: "story"; fav: Favorite };

/**
 * Client list so we can remove cards optimistically when the user unfavorites.
 */
export function FavoritesList({ items: initial }: { items: Item[] }) {
  const [items, setItems] = useState(initial);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence>
        {items.map((it) => (
          <motion.div
            key={`${it.fav.item_type}:${it.fav.item_id}`}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            {it.kind === "city" && (
              <CityFavoriteCard
                city={it.city}
                onRemove={() =>
                  setItems((curr) =>
                    curr.filter((x) => x.fav.id !== it.fav.id)
                  )
                }
              />
            )}
            {it.kind === "itinerary" && (
              <ItineraryFavoriteCard
                itinerary={it.itinerary}
                onRemove={() =>
                  setItems((curr) =>
                    curr.filter((x) => x.fav.id !== it.fav.id)
                  )
                }
              />
            )}
            {it.kind === "story" && (
              <div className="rounded-2xl border border-border p-6 text-sm text-muted-foreground">
                Story #{it.fav.item_id.slice(0, 6)} (Stories ship in Phase F.)
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function CityFavoriteCard({ city, onRemove }: { city: City; onRemove: () => void }) {
  return (
    <Link
      href={`/cities/${city.slug}`}
      className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-uz-charcoal"
    >
      <Image
        src={city.cardImage}
        alt={city.name}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-uz-ultramarine/95 via-uz-ultramarine/30 to-transparent" />

      <FavoriteButton
        itemType="city"
        itemId={city.slug}
        initial
        loggedIn
        className="top-4 right-4"
        onChange={(now) => !now && onRemove()}
      />

      <div className="absolute inset-0 p-6 flex flex-col justify-end text-uz-cream">
        <Badge variant="glass" className="self-start mb-2">City</Badge>
        <h3 className="font-serif text-3xl tracking-tight">{city.name}</h3>
        <p className="mt-1 text-sm text-uz-cream/80">{city.tagline}</p>
        <div className="mt-3 flex items-center gap-4 text-xs text-uz-cream/75">
          <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{city.recommendedDays}</span>
          <span className="inline-flex items-center gap-1"><Wallet className="h-3 w-3" />{city.dailyBudget}</span>
        </div>
      </div>
    </Link>
  );
}

function ItineraryFavoriteCard({
  itinerary,
  onRemove,
}: {
  itinerary: Itinerary;
  onRemove: () => void;
}) {
  return (
    <Link
      href={`/itineraries/${itinerary.slug}`}
      className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-uz-charcoal"
    >
      <Image
        src={itinerary.heroImage}
        alt={itinerary.title}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-uz-ultramarine/95 via-uz-ultramarine/30 to-transparent" />

      <FavoriteButton
        itemType="itinerary"
        itemId={itinerary.slug}
        initial
        loggedIn
        className="top-4 right-4"
        onChange={(now) => !now && onRemove()}
      />

      <div className="absolute inset-0 p-6 flex flex-col justify-end text-uz-cream">
        <Badge variant="ochre" className="self-start mb-2">{itinerary.style}</Badge>
        <h3 className="font-serif text-2xl tracking-tight">{itinerary.title}</h3>
        <p className="mt-1 text-sm text-uz-cream/80">{itinerary.tagline}</p>
        <div className="mt-3 flex items-center gap-4 text-xs text-uz-cream/75">
          <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{itinerary.days} days</span>
          <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{itinerary.cities.length} cities</span>
          <span className="font-medium text-uz-ochre ml-auto">{formatUSD(itinerary.priceUsd)}</span>
        </div>
      </div>
    </Link>
  );
}
