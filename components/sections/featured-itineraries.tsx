"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Clock, MapPin } from "lucide-react";

import { uzbekistanItineraries } from "@/content/countries/uzbekistan/itineraries";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatUSD } from "@/lib/utils";

/**
 * Three featured trip plans. We pick a Standard, a Budget, and a Luxury so
 * visitors immediately see the price spread of the country.
 */
const FEATURED_SLUGS = ["silk-road-7-days", "weekend-in-samarkand", "luxury-silk-road"];

export function FeaturedItineraries() {
  const trips = FEATURED_SLUGS.map(
    (slug) => uzbekistanItineraries.find((i) => i.slug === slug)!
  );

  return (
    <section className="container-editorial py-24 md:py-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="font-script text-2xl text-uz-terracotta mb-2">Trip plans</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight max-w-3xl">
            Three journeys, picked
            <span className="italic text-uz-turquoise"> for you</span>.
          </h2>
        </div>
        <Button asChild variant="outline" size="md">
          <Link href="/itineraries">
            All itineraries <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trips.map((trip, i) => (
          <motion.article
            key={trip.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
            className="group rounded-2xl overflow-hidden bg-card border border-border hover:shadow-warm hover:-translate-y-1 transition-all duration-500"
          >
            <Link href={`/itineraries/${trip.slug}`} className="block">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={trip.heroImage}
                  alt={trip.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-[900ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <Badge
                  variant={
                    trip.style === "Luxury"
                      ? "ochre"
                      : trip.style === "Budget"
                      ? "terracotta"
                      : "glass"
                  }
                  className="absolute top-4 left-4"
                >
                  {trip.style}
                </Badge>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {trip.days} days
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {trip.cities.length} cities
                  </span>
                  <span className="ml-auto font-medium text-uz-terracotta">
                    {formatUSD(trip.priceUsd)}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-medium mb-2 group-hover:text-uz-turquoise transition-colors">
                  {trip.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {trip.tagline}
                </p>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
