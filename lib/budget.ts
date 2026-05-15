// Pricing model for the /budget calculator and the AI concierge.
// Numbers are 2026 estimates in USD per person per day. Adjust here, and
// the calculator + AI quotes update consistently.

import type { StayStyle } from "@/lib/db-types";

/** Daily costs per person (lodging is per room, others per person). */
export const STYLE_RATES: Record<
  StayStyle,
  { hotelPerNight: number; foodPerDay: number; activitiesPerDay: number }
> = {
  Budget:   { hotelPerNight: 30,  foodPerDay: 15, activitiesPerDay: 8  },
  Standard: { hotelPerNight: 75,  foodPerDay: 35, activitiesPerDay: 15 },
  Luxury:   { hotelPerNight: 180, foodPerDay: 80, activitiesPerDay: 35 },
};

/** One-way flight from common origin cities into Tashkent. */
export const FLIGHT_FROM: Record<string, number> = {
  Almaty: 150,
  Tashkent: 0,
  Istanbul: 380,
  Moscow: 280,
  Seoul: 520,
  "New York": 920,
  London: 620,
  Other: 500,
};

/**
 * Approximate intra-Uzbekistan transport per traveler, depending on how
 * many cities are visited. Two cities = one Afrosiyob ride; four or more
 * usually adds a domestic flight to Urgench for Khiva.
 */
export function intraUzbekistanCost(cityCount: number): number {
  if (cityCount <= 1) return 0;
  if (cityCount === 2) return 25;
  if (cityCount === 3) return 50;
  if (cityCount === 4) return 100;
  return 150;
}

export interface BudgetInputs {
  days: number;
  style: StayStyle;
  departure: string;
  cities: string[];
  travelers: number;
}

export interface BudgetBreakdown {
  flights: number;
  transport: number;
  lodging: number;
  food: number;
  activities: number;
  reserve: number;
  total: number;
}

/**
 * Calculates an itemized budget. The "reserve" line is a 10% buffer —
 * good travel agencies include this and call it a "miscellaneous" or
 * "contingency" line.
 */
export function calculateBudget(input: BudgetInputs): BudgetBreakdown {
  const rates = STYLE_RATES[input.style];
  const flightPP = FLIGHT_FROM[input.departure] ?? FLIGHT_FROM.Other;

  const flights = flightPP * input.travelers * 2; // round-trip
  const transport = intraUzbekistanCost(input.cities.length) * input.travelers;
  // Hotels are priced per night and split across travelers (1 room for ≤2,
  // 2 rooms for 3-4) — keep it simple: 1 room per 2 travelers.
  const rooms = Math.ceil(input.travelers / 2);
  const lodging = rates.hotelPerNight * input.days * rooms;
  const food = rates.foodPerDay * input.days * input.travelers;
  const activities = rates.activitiesPerDay * input.days * input.travelers;

  const subtotal = flights + transport + lodging + food + activities;
  const reserve = Math.round(subtotal * 0.1);
  const total = subtotal + reserve;

  return {
    flights,
    transport,
    lodging,
    food,
    activities,
    reserve,
    total,
  };
}
