import { Star, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { type Story, cityNameFromSlug } from "@/content/stories";
import { cn } from "@/lib/utils";

/**
 * Single traveler story card. Used on /stories (full grid) and the
 * homepage "Traveler Stories" teaser. Server-renderable — no client
 * state needed for the minimal Phase F scope.
 */
export function StoryCard({ story }: { story: Story }) {
  // Build initials from the author's name. Couples like "Hana & Daniyar"
  // get "H&D"; single names get the first two letters of their words.
  const initials = story.authorName
    .split(/\s+/)
    .filter((s) => s !== "&")
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");

  return (
    <Card className="group flex flex-col h-full overflow-hidden border-border hover:shadow-warm hover:-translate-y-0.5 transition-all duration-500">
      <CardContent className="flex flex-col flex-1 gap-5 p-6">
        {/* Author + rating */}
        <header className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar className="h-10 w-10 shrink-0">
              <AvatarFallback className="text-xs">{initials}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="font-medium text-sm leading-tight truncate">
                {story.authorName}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {story.authorCountry}
              </p>
            </div>
          </div>
          <StarRating rating={story.rating} />
        </header>

        {/* Title */}
        <h3 className="font-serif text-2xl leading-snug tracking-tight group-hover:text-uz-turquoise transition-colors">
          {story.title}
        </h3>

        {/* Excerpt */}
        <p className="italic text-muted-foreground leading-relaxed text-[15px] flex-1">
          &ldquo;{story.excerpt}&rdquo;
        </p>

        {/* Footer — cities + duration */}
        <footer className="flex flex-wrap items-center gap-2 pt-4 border-t border-border">
          {story.cities.map((slug) => (
            <Badge key={slug} variant="outline" className="font-normal">
              {cityNameFromSlug(slug)}
            </Badge>
          ))}
          <span className="ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {story.duration}
          </span>
        </footer>
      </CardContent>
    </Card>
  );
}

/** Five-star row. Filled stars are ochre; empty ones use the border color. */
function StarRating({ rating }: { rating: Story["rating"] }) {
  return (
    <div className="flex items-center gap-0.5 shrink-0" aria-label={`${rating} of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < rating ? "fill-uz-ochre text-uz-ochre" : "text-border"
          )}
        />
      ))}
    </div>
  );
}
