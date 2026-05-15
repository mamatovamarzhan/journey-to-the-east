// Traveler stories — static mock data for now (no Supabase backing).
// Phase F minimal scope: a listing page + a homepage teaser. Detail pages,
// likes, and comments come later if/when we wire stories to the DB.
//
// To add a story: append to the array. To feature it on the homepage,
// give it a recent `createdAt` — the homepage shows the three newest.

export interface Story {
  id: string;
  authorName: string;
  authorCountry: string;
  /** Future-proofing — null for now; the card renders an initials fallback. */
  authorAvatar?: string | null;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  /** 2–3 sentence teaser, rendered italic. The opening of a longer story. */
  excerpt: string;
  /** City slugs matching content/countries/uzbekistan/cities.ts. */
  cities: string[];
  /** Free-form, e.g. "10 days", "3 weeks". */
  duration: string;
  /** ISO date — used to pick the homepage teasers (newest 3). */
  createdAt: string;
}

export const stories: Story[] = [
  {
    id: "japan-solo-silk-road",
    authorName: "Aiko Tanaka",
    authorCountry: "Japan",
    rating: 5,
    title: "Quieter than I expected, in the best way",
    excerpt:
      "I went alone, with three weeks of leave from my job in Osaka, half-expecting to feel out of place. By the second morning in Samarkand I had a regular tea stall and a few words of Uzbek. By the second week, I had extended my flight home.",
    cities: ["tashkent", "samarkand", "bukhara"],
    duration: "14 days",
    createdAt: "2026-04-12",
  },
  {
    id: "korea-couple-bukhara",
    authorName: "Min-jun & So-yeon",
    authorCountry: "South Korea",
    rating: 5,
    title: "A week is the right amount for Bukhara",
    excerpt:
      "We'd done Samarkand on a previous trip and wanted real time in just one city. Bukhara has more layers than the guidebooks let on — the textile workshops alone could fill three afternoons, and we still hadn't seen the Samanid mausoleum at dusk.",
    cities: ["bukhara"],
    duration: "7 days",
    createdAt: "2026-04-05",
  },
  {
    id: "uk-photographer-khiva",
    authorName: "Marcus Bell",
    authorCountry: "United Kingdom",
    rating: 4,
    title: "Walking the walls at dawn",
    excerpt:
      "Khiva isn't a city you photograph at speed. It's a city you walk slowly through and stop, every few steps, because the light just shifted on a clay wall and your hand is already reaching for the camera. Five mornings on the ramparts and I never got the same shot twice.",
    cities: ["khiva"],
    duration: "5 days",
    createdAt: "2026-03-21",
  },
  {
    id: "italian-foodies-plov-pilgrimage",
    authorName: "Carolina Rossi",
    authorCountry: "Italy",
    rating: 5,
    title: "The plov pilgrimage",
    excerpt:
      "Three of us, ten days, one rule: we ate every regional plov we could find. Tashkent's was the richest, Bukhara's the driest and most layered, Samarkand's the most ceremonial — served on one shared platter, eaten slowly. Fergana surprised us with golden raisins.",
    cities: ["tashkent", "samarkand", "bukhara", "fergana"],
    duration: "10 days",
    createdAt: "2026-02-08",
  },
  {
    id: "german-retirees-slow-travel",
    authorName: "Alexander & Maria Weber",
    authorCountry: "Germany",
    rating: 5,
    title: "Two weeks, no rush",
    excerpt:
      "Retirement gave us time we never had on Mediterranean tours — long lunches, second cups of tea, a whole afternoon spent reading in one madrasa courtyard. Uzbekistan rewards that kind of pace more than anywhere we've been in twenty years of travel.",
    cities: ["samarkand", "bukhara", "khiva"],
    duration: "16 days",
    createdAt: "2025-11-14",
  },
  {
    id: "weekend-in-samarkand-riya",
    authorName: "Riya Patel",
    authorCountry: "United States",
    rating: 4,
    title: "Three sunsets and one perfect dawn",
    excerpt:
      "I flew in from Almaty for a long weekend, almost as a dare to myself. The Registan at sunset on Friday made the trip worth it. The empty courtyard at six on Sunday morning, with one guard sweeping the stones — that's what I came home thinking about.",
    cities: ["samarkand"],
    duration: "3 days",
    createdAt: "2025-10-29",
  },
];

/** Resolve city slugs into display names so cards don't have to look them up. */
export function cityNameFromSlug(slug: string): string {
  const map: Record<string, string> = {
    samarkand: "Samarkand",
    bukhara: "Bukhara",
    khiva: "Khiva",
    tashkent: "Tashkent",
    fergana: "Fergana",
  };
  return map[slug] ?? slug;
}
