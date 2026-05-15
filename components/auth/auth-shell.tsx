import Image from "next/image";
import Link from "next/link";
import { Compass } from "lucide-react";

import { IMG } from "@/content/images";
import { UzPattern } from "@/components/ui/uz-pattern";

/**
 * Shared split-layout shell for /auth/login + /auth/register.
 *  • Left half (desktop only): full-bleed Uzbek monument photo with a
 *    turquoise-to-ultramarine overlay and a handwritten editorial caption
 *  • Right half: branded header + the form (passed as children)
 */
export function AuthShell({
  title,
  subtitle,
  children,
  side = "Registan",
  cta,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  side?: "Registan" | "Bukhara" | "Khiva";
  /** Bottom-right call-to-action hint, e.g. "New here? Create an account →" */
  cta?: React.ReactNode;
}) {
  const sideImage =
    side === "Bukhara" ? IMG.bukhara_hero : side === "Khiva" ? IMG.khiva_hero : IMG.samarkand_hero;

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Pattern + photo column (decorative) */}
      <aside className="relative hidden lg:block bg-uz-ultramarine overflow-hidden">
        <Image
          src={sideImage}
          alt=""
          fill
          priority
          sizes="50vw"
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-uz-turquoise/40 via-uz-ultramarine/55 to-uz-ultramarine/90" />
        <UzPattern className="absolute inset-x-0 top-12 h-8 text-uz-ochre/30" />
        <UzPattern className="absolute inset-x-0 bottom-12 h-8 text-uz-ochre/30 rotate-180" />

        <div className="relative z-10 h-full flex flex-col justify-between p-12 text-uz-cream">
          <Link href="/" className="inline-flex items-center gap-2 font-serif text-xl tracking-tight">
            <Compass className="h-5 w-5 text-uz-ochre" />
            Journey to the East
          </Link>

          <div className="max-w-md">
            <p className="font-script text-4xl text-uz-ochre mb-4">
              Welcome, traveller.
            </p>
            <p className="text-lg text-uz-cream/85 leading-relaxed">
              Save trip plans, favorite monuments, write stories — and book
              the journey with our AI concierge when you're ready.
            </p>
          </div>

          <p className="text-xs uppercase tracking-[0.25em] text-uz-cream/55">
            The Silk Road, modern guidebook
          </p>
        </div>
      </aside>

      {/* Form column */}
      <main className="flex flex-col justify-center p-8 md:p-12 lg:p-16 bg-background">
        <div className="w-full max-w-md mx-auto">
          {/* Mobile brand mark — desktop sees it on the left half. */}
          <Link
            href="/"
            className="lg:hidden inline-flex items-center gap-2 font-serif text-lg tracking-tight mb-10 text-foreground"
          >
            <Compass className="h-5 w-5 text-uz-turquoise" />
            Journey to the East
          </Link>

          <p className="font-script text-2xl text-uz-terracotta mb-2">
            {subtitle}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight mb-10">
            {title}
          </h1>

          {children}

          {cta && (
            <p className="mt-10 text-sm text-muted-foreground">{cta}</p>
          )}
        </div>
      </main>
    </div>
  );
}
