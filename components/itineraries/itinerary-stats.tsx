import type { Itinerary } from "@/content/types";
import { Calendar, MapPin, Tag, Wallet } from "lucide-react";
import { formatUSD } from "@/lib/utils";

export function ItineraryStats({ itinerary }: { itinerary: Itinerary }) {
  const stats = [
    { icon: Calendar, label: "Days", value: `${itinerary.days}` },
    { icon: MapPin, label: "Cities", value: `${itinerary.cities.length}` },
    { icon: Tag, label: "Style", value: itinerary.style },
    { icon: Wallet, label: "From", value: formatUSD(itinerary.priceUsd) + " / person" },
  ];

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4 rounded-2xl bg-uz-cream-deep/40 dark:bg-uz-ultramarine-soft/30 p-6 md:p-8">
      {stats.map(({ icon: Icon, label, value }) => (
        <div key={label} className="flex flex-col items-center text-center">
          <Icon className="h-5 w-5 text-uz-terracotta mb-2" />
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">
            {label}
          </p>
          <p className="font-serif text-2xl tracking-tight">{value}</p>
        </div>
      ))}
    </section>
  );
}
