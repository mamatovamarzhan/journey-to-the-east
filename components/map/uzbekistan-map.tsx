"use client";

import { useMemo, useState } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { countries } from "@/content/countries";
import { cn } from "@/lib/utils";

/**
 * Leaflet map of Uzbekistan with clustered markers for every city + every
 * top attraction. OpenStreetMap tiles, no API key. Filter chips along the
 * top let visitors narrow markers to one category.
 *
 * Styling notes:
 *   • marker is a CSS-only DivIcon (no PNG dependency, palette-matched)
 *   • cluster bubbles are restyled to terracotta + cream
 *   • popups are glass-cream with gold borders, declared in globals.css
 */

// Use Uzbekistan's geographic center as the initial view; zoom 6 fits the
// whole country with a little headroom.
const UZ_CENTER: [number, number] = [40.5, 64.5];
const UZ_ZOOM = 6;

type Feature = {
  id: string;
  kind: "city" | "attraction";
  cityName: string;
  citySlug: string;
  name: string;
  category: string;
  coords: [number, number]; // [lat, lng] for Leaflet
  image: string;
  href: string;
  description?: string;
};

// Flatten cities + their attractions into one Feature list. We swap our
// [lng, lat] storage convention to [lat, lng] which Leaflet wants.
function buildFeatures(): Feature[] {
  const features: Feature[] = [];

  for (const country of countries) {
    for (const city of country.cities) {
      features.push({
        id: `city-${city.slug}`,
        kind: "city",
        cityName: city.name,
        citySlug: city.slug,
        name: city.name,
        category: "City",
        coords: [city.coords[1], city.coords[0]],
        image: city.cardImage,
        href: `/cities/${city.slug}`,
        description: city.tagline,
      });

      for (const attr of city.attractions) {
        if (!attr.coords) continue;
        features.push({
          id: `attr-${city.slug}-${attr.slug}`,
          kind: "attraction",
          cityName: city.name,
          citySlug: city.slug,
          name: attr.name,
          category: attr.category ?? "Monument",
          coords: [attr.coords[1], attr.coords[0]],
          image: attr.image,
          href: `/cities/${city.slug}#attractions`,
          description: attr.description.slice(0, 140) + "…",
        });
      }
    }
  }
  return features;
}

const ALL_CATEGORIES = [
  "All",
  "City",
  "Monument",
  "Mosque",
  "Madrasa",
  "Mausoleum",
  "Bazaar",
  "Museum",
  "Square",
] as const;
type Category = (typeof ALL_CATEGORIES)[number];

// CSS-only marker icon. A small terracotta dot with a gold ring;
// the "city" markers are slightly bigger.
const makeIcon = (kind: Feature["kind"]) =>
  L.divIcon({
    className: "", // disable Leaflet's default class so our styles apply cleanly
    html: `<span class="jte-marker ${kind === "city" ? "jte-marker-city" : ""}"></span>`,
    iconSize: kind === "city" ? [24, 24] : [16, 16],
    iconAnchor: kind === "city" ? [12, 12] : [8, 8],
  });

// Cluster bubble styling. The cluster count goes inside a circular badge
// colored by size (small = ochre, big = terracotta).
const makeClusterIcon = (cluster: { getChildCount: () => number }) => {
  const count = cluster.getChildCount();
  const size = count < 5 ? "sm" : count < 15 ? "md" : "lg";
  return L.divIcon({
    className: "",
    html: `<div class="jte-cluster jte-cluster-${size}">${count}</div>`,
    iconSize: [44, 44],
    iconAnchor: [22, 22],
  });
};

export function UzbekistanMap() {
  const [active, setActive] = useState<Category>("All");
  const features = useMemo(buildFeatures, []);
  const filtered = useMemo(
    () =>
      active === "All"
        ? features
        : features.filter((f) => f.category === active),
    [active, features]
  );

  return (
    <div className="relative">
      {/* Filter chips overlaid on the map */}
      <div className="container-editorial pb-4">
        <div className="flex flex-wrap gap-2">
          {ALL_CATEGORIES.map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium tracking-wide transition-all",
                  isActive
                    ? "bg-uz-charcoal text-uz-cream shadow-sm"
                    : "bg-uz-cream-deep/60 text-foreground/70 hover:bg-uz-cream-deep hover:text-foreground dark:bg-uz-ultramarine-soft/60 dark:hover:bg-uz-ultramarine-soft"
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-[78vh] min-h-[600px] w-full relative">
        <MapContainer
          center={UZ_CENTER}
          zoom={UZ_ZOOM}
          scrollWheelZoom
          className="h-full w-full z-0"
        >
          {/* OpenStreetMap tiles. Free, no API key, attribution required. */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={19}
          />

          {/* MarkerClusterGroup is typed loosely upstream; cast iconCreateFunction. */}
          <MarkerClusterGroup
            chunkedLoading
            iconCreateFunction={makeClusterIcon as never}
            showCoverageOnHover={false}
            spiderfyDistanceMultiplier={1.3}
          >
            {filtered.map((f) => (
              <Marker
                key={f.id}
                position={f.coords}
                icon={makeIcon(f.kind)}
              >
                <Popup className="jte-popup">
                  <div className="w-64">
                    <div className="relative aspect-[5/3] rounded-lg overflow-hidden mb-3">
                      <Image
                        src={f.image}
                        alt={f.name}
                        fill
                        sizes="256px"
                        className="object-cover"
                      />
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-uz-terracotta font-medium mb-1">
                      {f.category} {f.kind === "attraction" && `· ${f.cityName}`}
                    </p>
                    <h3 className="font-serif text-xl leading-tight mb-1 text-uz-charcoal">
                      {f.name}
                    </h3>
                    {f.description && (
                      <p className="text-sm text-uz-charcoal/75 leading-snug mb-3">
                        {f.description}
                      </p>
                    )}
                    <Link
                      href={f.href}
                      className="inline-flex items-center gap-1 text-sm font-medium text-uz-terracotta hover:text-uz-terracotta-deep"
                    >
                      {f.kind === "city" ? "Read the city guide" : "See in context"}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </div>
  );
}
