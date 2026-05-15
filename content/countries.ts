// Country registry. To add Kazakhstan, Kyrgyzstan, etc.:
//   1. Create content/countries/<slug>/cities.ts + itineraries.ts
//   2. Import them here and push to `countries` below
//   3. The /cities, /itineraries, /map routes pick them up automatically
//
// During Phase A only Uzbekistan is filled in; the architecture is here
// already so future contributors don't have to refactor.

import type { Country } from "@/content/types";
import { uzbekistanCities } from "./countries/uzbekistan/cities";
import { uzbekistanItineraries } from "./countries/uzbekistan/itineraries";
import { IMG } from "./images";

const uzbekistan: Country = {
  slug: "uzbekistan",
  name: "Uzbekistan",
  tagline: "The heart of the Silk Road",
  flag: "🇺🇿",
  heroImage: IMG.samarkand_hero,
  cities: uzbekistanCities,
  itineraries: uzbekistanItineraries,
};

export const countries: Country[] = [uzbekistan];

/** Lookup helpers used across routes. */
export function getCountry(slug: string): Country | undefined {
  return countries.find((c) => c.slug === slug);
}

export function getAllCities() {
  return countries.flatMap((c) =>
    c.cities.map((city) => ({ country: c, city }))
  );
}

export function getAllItineraries() {
  return countries.flatMap((c) =>
    c.itineraries.map((itinerary) => ({ country: c, itinerary }))
  );
}

export function getCityBySlug(slug: string) {
  for (const country of countries) {
    const city = country.cities.find((c) => c.slug === slug);
    if (city) return { country, city };
  }
  return null;
}

export function getItineraryBySlug(slug: string) {
  for (const country of countries) {
    const it = country.itineraries.find((i) => i.slug === slug);
    if (it) return { country, itinerary: it };
  }
  return null;
}
