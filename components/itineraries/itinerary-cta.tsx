import Link from "next/link";
import { Sparkles, Calculator } from "lucide-react";

import type { Itinerary } from "@/content/types";
import { Button } from "@/components/ui/button";

export function ItineraryCta({ itinerary }: { itinerary: Itinerary }) {
  return (
    <section className="rounded-3xl bg-uz-ultramarine text-uz-cream p-10 md:p-14 text-center relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-uz-turquoise/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-24 w-80 h-80 rounded-full bg-uz-terracotta/25 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto">
        <p className="font-script text-2xl text-uz-ochre mb-2">Make it yours</p>
        <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-4">
          Adapt this to your dates.
        </h2>
        <p className="text-uz-cream/80 leading-relaxed mb-8">
          Have a different budget, fewer days, or specific dates? The AI
          concierge will rework this plan around you and quote a real
          all-in price.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="terracotta" size="xl">
            <Link href={`/chat?itinerary=${itinerary.slug}`}>
              <Sparkles className="h-5 w-5" />
              Customize with AI
            </Link>
          </Button>
          <Button asChild variant="ochre" size="xl">
            <Link href={`/budget?days=${itinerary.days}&style=${itinerary.style}`}>
              <Calculator className="h-5 w-5" />
              Estimate cost
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
