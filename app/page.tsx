// Homepage. The actual sections live in components/sections/ so this file
// stays scannable. Order matches the brief: hero → stats → cities → editorial
// → itineraries → testimonial → newsletter.
import { Hero } from "@/components/sections/hero";
import { StatsStrip } from "@/components/sections/stats-strip";
import { FeaturedCities } from "@/components/sections/featured-cities";
import { WhyUzbekistan } from "@/components/sections/why-uzbekistan";
import { FeaturedItineraries } from "@/components/sections/featured-itineraries";
import { TravelerStories } from "@/components/sections/traveler-stories";
import { PullQuote } from "@/components/sections/pull-quote";
import { Newsletter } from "@/components/sections/newsletter";
import { getUser } from "@/lib/auth";
import { getFavoriteKeys } from "@/lib/favorites";

export default async function HomePage() {
  // Fetch favorites once at the page level and pass to sections that show
  // heart icons. Cheap query — RLS means no DB round trip if logged out.
  const user = await getUser();
  const favoriteKeys = user ? await getFavoriteKeys(user.id) : new Set<string>();
  const favoritedCitySlugs = Array.from(favoriteKeys)
    .filter((k) => k.startsWith("city:"))
    .map((k) => k.split(":")[1]);

  return (
    <>
      <Hero />
      <StatsStrip />
      <FeaturedCities loggedIn={!!user} favoritedSlugs={favoritedCitySlugs} />
      <WhyUzbekistan />
      <FeaturedItineraries />
      <TravelerStories />
      <PullQuote />
      <Newsletter />
    </>
  );
}
