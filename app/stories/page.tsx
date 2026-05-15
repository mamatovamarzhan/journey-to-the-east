import type { Metadata } from "next";
import { stories } from "@/content/stories";
import { StoryCard } from "@/components/stories/story-card";
import { UzPattern } from "@/components/ui/uz-pattern";

export const metadata: Metadata = {
  title: "Traveler Stories — Journey to the East",
  description:
    "Real journeys, in travelers' own words. Six stories from photographers, retirees, foodies, and solo explorers who came back from Uzbekistan with something to say.",
};

export default function StoriesPage() {
  // Newest first — preserves the homepage teaser order.
  const sorted = [...stories].sort(
    (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
  );

  return (
    <>
      <section className="container-editorial pt-32 pb-12 md:pt-40 md:pb-16">
        <p className="font-script text-2xl text-uz-terracotta mb-3">
          From the road
        </p>
        <h1 className="font-serif text-5xl md:text-7xl tracking-tight max-w-4xl">
          Traveler
          <span className="italic text-uz-turquoise"> stories</span>.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Real journeys, in travelers' own words — photographers, retirees,
          foodies, and solo explorers who came back from Uzbekistan with
          something to say.
        </p>
      </section>

      <div className="container-editorial">
        <UzPattern className="h-3 text-uz-ochre/40 mb-12" />
      </div>

      <section className="container-editorial pb-24 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </section>
    </>
  );
}
