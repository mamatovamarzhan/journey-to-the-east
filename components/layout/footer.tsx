import Link from "next/link";
import { Compass, Mail } from "lucide-react";
import { UzPattern } from "@/components/ui/uz-pattern";

// Lucide dropped brand icons (Github / Twitter etc. are trademarked), so
// we inline the two we need below. They use `currentColor` so they inherit
// the parent's text color and respond to hover.
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-1.93c-3.2.69-3.87-1.54-3.87-1.54-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.05 11.05 0 0 1 5.78 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.4-5.25 5.69.41.35.78 1.04.78 2.1v3.11c0 .3.21.66.8.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}
function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.83l-5.34-6.91L4.66 22H1.4l8.02-9.17L1 2h6.99l4.83 6.4L18.244 2Zm-2.4 18h1.9L6.27 4H4.27l11.574 16Z" />
    </svg>
  );
}

/**
 * Footer. Top of the footer carries the editorial pattern divider; the body
 * has nav columns + brand block + small print.
 */
export function Footer() {
  return (
    <footer className="relative mt-24 bg-uz-ultramarine text-uz-cream">
      {/* Geometric Uzbek-tile-inspired divider that arcs across the top edge. */}
      <UzPattern className="h-10 w-full text-uz-ochre/30" />

      <div className="container-editorial py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="col-span-2">
          <Link href="/" className="inline-flex items-center gap-2 font-serif text-2xl">
            <Compass className="h-6 w-6 text-uz-ochre" />
            Journey to the East
          </Link>
          <p className="mt-4 max-w-sm text-sm text-uz-cream/70 leading-relaxed">
            A modern editorial guide to Uzbekistan and the Silk Road, with an AI
            concierge that builds the trip with you and handles the booking.
          </p>
          <p className="mt-4 font-script text-2xl text-uz-ochre">
            Bon voyage, traveller —
          </p>
        </div>

        <div>
          <h4 className="font-serif text-lg text-uz-cream mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-uz-cream/75">
            <li><Link href="/cities" className="hover:text-uz-ochre transition-colors">Cities</Link></li>
            <li><Link href="/itineraries" className="hover:text-uz-ochre transition-colors">Itineraries</Link></li>
            <li><Link href="/map" className="hover:text-uz-ochre transition-colors">Map</Link></li>
            <li><Link href="/budget" className="hover:text-uz-ochre transition-colors">Budget calculator</Link></li>
            <li><Link href="/stories" className="hover:text-uz-ochre transition-colors">Stories</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg text-uz-cream mb-4">Account</h4>
          <ul className="space-y-2 text-sm text-uz-cream/75">
            <li><Link href="/chat" className="hover:text-uz-ochre transition-colors">AI Concierge</Link></li>
            <li><Link href="/auth/login" className="hover:text-uz-ochre transition-colors">Sign in</Link></li>
            <li><Link href="/auth/register" className="hover:text-uz-ochre transition-colors">Create account</Link></li>
            <li><Link href="/favorites" className="hover:text-uz-ochre transition-colors">Favorites</Link></li>
            <li><Link href="/my-bookings" className="hover:text-uz-ochre transition-colors">My bookings</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-uz-cream/10">
        <div className="container-editorial py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-uz-cream/60">
          <p>© {new Date().getFullYear()} Journey to the East. Crafted with care, far from the Silk Road.</p>
          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-uz-ochre transition-colors">
              <GithubIcon className="h-4 w-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-uz-ochre transition-colors">
              <TwitterIcon className="h-4 w-4" />
            </a>
            <a href="mailto:hello@journey.example" aria-label="Email" className="hover:text-uz-ochre transition-colors">
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
