import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { countries, getItineraryBySlug, getCityBySlug } from "@/content/countries";
import { ItineraryHero } from "@/components/itineraries/itinerary-hero";
import { ItineraryStats } from "@/components/itineraries/itinerary-stats";
import { ItineraryHighlights } from "@/components/itineraries/itinerary-highlights";
import { ItineraryTimeline } from "@/components/itineraries/itinerary-timeline";
import { ItineraryCities } from "@/components/itineraries/itinerary-cities";
import { ItineraryCta } from "@/components/itineraries/itinerary-cta";

export async function generateStaticParams() {
  return countries.flatMap((c) =>
    c.itineraries.map((it) => ({ slug: it.slug }))
  );
}

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const found = getItineraryBySlug(slug);
  if (!found) return { title: "Itinerary not found" };
  return {
    title: `${found.itinerary.title} — ${found.itinerary.days} days · Journey to the East`,
    description: found.itinerary.tagline,
    openGraph: { images: [found.itinerary.heroImage] },
  };
}

export default async function ItineraryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const found = getItineraryBySlug(slug);
  if (!found) notFound();

  // Resolve city slugs to city objects for the bottom "Cities visited" cards.
  const cities = found.itinerary.cities
    .map((s) => getCityBySlug(s)?.city)
    .filter(Boolean) as NonNullable<ReturnType<typeof getCityBySlug>>["city"][];

  return (
    <article>
      <ItineraryHero itinerary={found.itinerary} />

      <div className="container-editorial py-16 md:py-24 space-y-20 md:space-y-28">
        <ItineraryStats itinerary={found.itinerary} />
        <ItineraryHighlights itinerary={found.itinerary} />
        <ItineraryTimeline itinerary={found.itinerary} />
        <ItineraryCities cities={cities} />
        <ItineraryCta itinerary={found.itinerary} />
      </div>
    </article>
  );
}
