import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getCityBySlug, countries } from "@/content/countries";
import { getUser } from "@/lib/auth";
import { getFavoriteKeys } from "@/lib/favorites";
import { CityHero } from "@/components/cities/city-hero";
import { CityToc } from "@/components/cities/city-toc";
import { CityOverview } from "@/components/cities/city-overview";
import { CityAttractions } from "@/components/cities/city-attractions";
import { CityStay } from "@/components/cities/city-stay";
import { CityEat } from "@/components/cities/city-eat";
import { CityGettingThere } from "@/components/cities/city-getting-there";
import { CityWeather } from "@/components/cities/city-weather";
import { CityCta } from "@/components/cities/city-cta";

// Pre-render all city slugs at build time. Adding new countries automatically
// adds new pages because we flatten the registry.
export async function generateStaticParams() {
  return countries.flatMap((c) =>
    c.cities.map((city) => ({ slug: city.slug }))
  );
}

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const found = getCityBySlug(slug);
  if (!found) return { title: "City not found" };
  return {
    title: `${found.city.name} — ${found.city.tagline} · Journey to the East`,
    description: found.city.overview.slice(0, 160),
    openGraph: { images: [found.city.heroImage] },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const found = getCityBySlug(slug);
  if (!found) notFound();

  const { city } = found;

  // Check whether the current user (if any) has favorited this city.
  const user = await getUser();
  const favoriteKeys = user ? await getFavoriteKeys(user.id) : new Set<string>();
  const isFavorited = favoriteKeys.has(`city:${city.slug}`);

  return (
    <article>
      <CityHero
        city={city}
        loggedIn={!!user}
        isFavorited={isFavorited}
      />

      {/* Body grid: TOC on left (desktop), content on right */}
      <div className="container-editorial py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-12 lg:gap-16">
          {/* Sticky TOC, desktop only */}
          <aside className="hidden lg:block">
            <CityToc />
          </aside>

          <div className="space-y-24 lg:space-y-32 min-w-0">
            <CityOverview city={city} />
            <CityAttractions city={city} />
            <CityStay city={city} />
            <CityEat city={city} />
            <CityGettingThere city={city} />
            <CityWeather city={city} />
            <CityCta city={city} />
          </div>
        </div>
      </div>
    </article>
  );
}
