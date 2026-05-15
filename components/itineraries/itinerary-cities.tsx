import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import type { City } from "@/content/types";

export function ItineraryCities({ cities }: { cities: City[] }) {
  if (!cities.length) return null;

  return (
    <section>
      <p className="font-script text-2xl text-uz-terracotta mb-2">Cities visited</p>
      <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-10 max-w-3xl">
        Read up before you go.
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cities.map((city) => (
          <Link
            key={city.slug}
            href={`/cities/${city.slug}`}
            className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-uz-charcoal block"
          >
            <Image
              src={city.cardImage}
              alt={city.name}
              fill
              sizes="(min-width: 768px) 22vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-uz-ultramarine/95 via-uz-ultramarine/30 to-transparent" />
            <div className="absolute inset-0 p-4 flex flex-col justify-end text-uz-cream">
              <h3 className="font-serif text-xl tracking-tight">{city.name}</h3>
              <span className="mt-1 inline-flex items-center gap-1 text-xs text-uz-ochre opacity-0 group-hover:opacity-100 transition-opacity">
                Open guide <ArrowUpRight className="h-3 w-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
