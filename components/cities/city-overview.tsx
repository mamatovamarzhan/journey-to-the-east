import type { City } from "@/content/types";

/**
 * Overview section — uses the drop-cap utility on the first paragraph for
 * an editorial magazine feel.
 */
export function CityOverview({ city }: { city: City }) {
  return (
    <section id="overview" className="scroll-mt-28">
      <p className="font-script text-2xl text-uz-terracotta mb-2">Overview</p>
      <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-8 max-w-3xl">
        A first look at <span className="italic text-uz-turquoise">{city.name}</span>.
      </h2>
      <p className="drop-cap text-lg md:text-xl leading-[1.75] text-foreground/85 max-w-3xl">
        {city.overview}
      </p>
    </section>
  );
}
