import Link from "next/link";
import { Sparkles } from "lucide-react";

import type { City } from "@/content/types";
import { Button } from "@/components/ui/button";

/**
 * Bottom-of-page CTA: nudges the reader into the AI concierge with the city
 * pre-loaded.
 */
export function CityCta({ city }: { city: City }) {
  return (
    <section className="rounded-3xl bg-uz-turquoise text-uz-cream p-10 md:p-14 text-center relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-uz-ochre/25 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-24 w-80 h-80 rounded-full bg-uz-terracotta/30 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto">
        <p className="font-script text-2xl text-uz-ochre mb-2">Next step</p>
        <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-4">
          Ready to plan your trip?
        </h2>
        <p className="text-uz-cream/85 leading-relaxed mb-8">
          Tell our concierge how many days you have and what you'd like, and
          we'll build a personalized {city.name} itinerary with hotels,
          flights, and a quote — in under five minutes.
        </p>
        <Button asChild variant="terracotta" size="xl">
          <Link href={`/chat?city=${city.slug}`}>
            <Sparkles className="h-5 w-5" />
            Plan {city.name} with AI
          </Link>
        </Button>
      </div>
    </section>
  );
}
