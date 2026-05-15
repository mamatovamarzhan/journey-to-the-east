import type { Metadata } from "next";
import { ItinerariesGrid } from "@/components/itineraries/itineraries-grid";
import { UzPattern } from "@/components/ui/uz-pattern";

export const metadata: Metadata = {
  title: "Itineraries — Journey to the East",
  description:
    "Five hand-crafted trip plans for Uzbekistan, from budget student loops to eight-day luxury Silk Road experiences.",
};

export default function ItinerariesPage() {
  return (
    <>
      <section className="container-editorial pt-32 pb-12 md:pt-40 md:pb-16">
        <p className="font-script text-2xl text-uz-terracotta mb-3">
          Hand-crafted journeys
        </p>
        <h1 className="font-serif text-5xl md:text-7xl tracking-tight max-w-4xl">
          Trip plans for
          <span className="italic text-uz-turquoise"> every traveler</span>.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          From a 5-day student trip on sleeper trains to an 8-day private
          journey with after-hours Registan access. Pick one as a starting
          point — the AI concierge can adapt any of them to your dates,
          interests, and budget.
        </p>
      </section>

      <div className="container-editorial">
        <UzPattern className="h-3 text-uz-ochre/40 mb-12" />
      </div>

      <section className="container-editorial pb-24 md:pb-32">
        <ItinerariesGrid />
      </section>
    </>
  );
}
