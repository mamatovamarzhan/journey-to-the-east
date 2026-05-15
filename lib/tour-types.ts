// Shared Tour type that the Python service produces (POST /build-tour) and
// the chat UI renders. Keep this in sync with the schema in
// python-service/main.py (_TOUR_SCHEMA).

export type TourStyle = "Budget" | "Standard" | "Luxury";

export interface TourDay {
  day: number;
  city: string;
  title: string;
  summary: string;
  stay?: string;
}

export interface TourBreakdown {
  flights: number;
  transport: number;
  lodging: number;
  food: number;
  activities: number;
  reserve: number;
}

export interface Tour {
  title: string;
  days: number;
  travelers: number;
  style: TourStyle;
  cities: string[]; // lowercase slugs
  days_plan: TourDay[];
  breakdown: TourBreakdown;
  totalUsd: number;
}
