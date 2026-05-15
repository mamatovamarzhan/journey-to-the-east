"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { stories } from "@/content/stories";
import { StoryCard } from "@/components/stories/story-card";
import { Button } from "@/components/ui/button";

/**
 * Homepage teaser — the 3 most recent stories. Style matches the
 * existing FeaturedCities / FeaturedItineraries section headers so the
 * homepage rhythm stays consistent.
 */
export function TravelerStories() {
  const recent = [...stories]
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    .slice(0, 3);

  return (
    <section className="container-editorial py-24 md:py-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="font-script text-2xl text-uz-terracotta mb-2">
            From the road
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight max-w-3xl">
            Stories from
            <span className="italic text-uz-turquoise"> travelers</span>.
          </h2>
        </div>
        <Button asChild variant="outline" size="md">
          <Link href="/stories">
            See all stories <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recent.map((story, i) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
            className="h-full"
          >
            <StoryCard story={story} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
