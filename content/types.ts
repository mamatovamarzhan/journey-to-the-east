// Types that describe the static travel-guide content. Adding a new country
// is a matter of (a) defining a Country object that points to a CitiesModule
// and ItinerariesModule, (b) registering it in content/countries.ts. Routes,
// queries, and UI auto-pick it up.

export type Currency = "USD" | "UZS" | "KZT" | "KGS" | "TJS" | "TMT";

export interface PriceTag {
  /** Display in USD; the local label is optional, e.g. "≈ 380,000 UZS". */
  usd: string;
  local?: string;
}

export interface Attraction {
  slug: string;
  name: string;
  /** 2-4 paragraph travel-writer-style description. */
  description: string;
  image: string;
  /** Opening hours summary, e.g. "Daily 8am–6pm". */
  hours?: string;
  /** Entry fee or "Free". */
  fee?: PriceTag;
  /** Approximate visit duration in minutes (used by AI tour planner). */
  durationMin?: number;
  /** Mapbox-ready coordinates [lng, lat]. */
  coords?: [number, number];
  /** Loose category for the /map filter. */
  category?:
    | "Monument"
    | "Mosque"
    | "Madrasa"
    | "Mausoleum"
    | "Bazaar"
    | "Museum"
    | "Square"
    | "Nature";
}

export type StayTier = "Budget" | "Mid-range" | "Luxury";

export interface Hotel {
  name: string;
  tier: StayTier;
  /** Nightly price range in USD. */
  priceFrom: number;
  priceTo: number;
  note: string;
  /** Optional booking link. */
  url?: string;
}

export interface FoodPick {
  /** e.g. "Plov", "Manty", "Shashlik". */
  dish: string;
  description: string;
  /** Restaurant where this dish is best in the city. */
  whereToTry: string;
}

export interface GettingThere {
  /** Free-form sentence summarizing flights and trains from a hub city. */
  from: string;
  flight?: { hours: string; priceUsd: string };
  train?: { hours: string; priceUsd: string };
}

export interface WeatherMonth {
  month: string;
  highC: number;
  lowC: number;
  /** 1-5 quality rating for travel comfort. */
  rating: number;
  note?: string;
}

export interface City {
  slug: string;
  name: string;
  /** A short editorial tagline shown on cards and the city hero. */
  tagline: string;
  /** Long-form Overview (1-2 paragraphs). The drop-cap renders the first letter. */
  overview: string;
  /** Hero image URL — Unsplash for now, swap to local /public/ in Phase B+. */
  heroImage: string;
  /** Square or 4:5 portrait for grid cards. */
  cardImage: string;
  /** Mapbox center [lng, lat]. */
  coords: [number, number];
  /** Recommended duration of stay. */
  recommendedDays: string;
  /** Best months to visit, free form e.g. "Apr – early Jun · Sep – Oct". */
  bestTime: string;
  /** Daily budget guidance, e.g. "$40 – $90". */
  dailyBudget: string;
  attractions: Attraction[];
  hotels: Hotel[];
  food: FoodPick[];
  gettingThere: GettingThere[];
  gettingAround: string;
  weather: WeatherMonth[];
}

export interface ItineraryDay {
  day: number;
  city: string;
  title: string;
  /** Bullet-style narrative of the day. */
  summary: string;
  /** Attractions / experiences (refer to attraction.slug when possible). */
  highlights: string[];
  /** Where to sleep that night. */
  stay?: string;
  image?: string;
}

export interface Itinerary {
  slug: string;
  title: string;
  tagline: string;
  /** Total nights, used by /chat AI for matching. */
  days: number;
  /** Estimated total cost in USD, midpoint of typical bookings. */
  priceUsd: number;
  style: "Budget" | "Standard" | "Luxury";
  heroImage: string;
  highlights: string[];
  cities: string[]; // city slugs
  days_plan: ItineraryDay[];
}

export interface Country {
  slug: string;
  name: string;
  tagline: string;
  flag: string;
  heroImage: string;
  /** Lazy modules so unused countries don't bloat the bundle. */
  cities: City[];
  itineraries: Itinerary[];
}
