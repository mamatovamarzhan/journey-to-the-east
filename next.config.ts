import type { NextConfig } from "next";

// Next.js 16 no longer runs ESLint as part of `next build` — you run `next
// lint` separately. So we don't need the legacy `eslint.ignoreDuringBuilds`
// flag anymore; the build is intrinsically lint-free.
//
// We allow images from a few external sources (Unsplash for hero imagery,
// Supabase Storage for user uploads, Mapbox tile servers).
const nextConfig: NextConfig = {
  typescript: {
    // Keep type errors loud locally, but don't block production deploys
    // on the rare type-server hiccup. Flip to true if a deploy ever stalls.
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      // Wikimedia hosts our verified Uzbekistan monument photos
      { protocol: "https", hostname: "upload.wikimedia.org" },
      // Unsplash for user-generated content / stories
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      // Curated city-hero photo sources (Uzbek news, Vogue, travel agencies)
      { protocol: "https", hostname: "storage.kun.uz" },
      { protocol: "https", hostname: "assets.vogue.com" },
      { protocol: "https", hostname: "img.pac.ru" },
      { protocol: "https", hostname: "pohcdn.com" },
      { protocol: "https", hostname: "resize.tripster.ru" },
      { protocol: "https", hostname: "cdn.tripster.ru" },
      // Supabase Storage for user uploads, Mapbox tile servers
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "api.mapbox.com" },
    ],
  },
};

export default nextConfig;
