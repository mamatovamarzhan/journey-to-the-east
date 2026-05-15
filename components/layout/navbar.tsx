"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Compass, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { AccountMenu, type AccountInfo } from "./account-menu";

/**
 * The Navbar fades from transparent (overlaid on the hero image) to a solid
 * blurred surface once the user scrolls more than ~60px. On the homepage it
 * starts transparent; on every other page we render solid from the top.
 */

const NAV_ITEMS = [
  { href: "/cities", label: "Cities" },
  { href: "/itineraries", label: "Itineraries" },
  { href: "/map", label: "Map" },
  { href: "/budget", label: "Budget" },
  { href: "/stories", label: "Stories" },
];

// Pages with a full-bleed hero image want the navbar to start transparent
// and become solid on scroll. Every other route gets the solid navbar from
// the top so content isn't hidden under it.
function hasHero(pathname: string) {
  if (pathname === "/") return true;
  if (/^\/cities\/[^/]+$/.test(pathname)) return true;
  if (/^\/itineraries\/[^/]+$/.test(pathname)) return true;
  return false;
}

export function Navbar({ account }: { account: AccountInfo | null }) {
  const pathname = usePathname();
  const heroPage = hasHero(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Track scroll position so we can swap the navbar style.
  useEffect(() => {
    if (!heroPage) {
      setScrolled(true);
      return;
    }
    setScrolled(false);
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [heroPage, pathname]);

  // Close the mobile menu when the route changes.
  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-lg border-b border-border shadow-sm"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <nav
        className={cn(
          "container-editorial flex items-center justify-between transition-all duration-300",
          scrolled ? "h-16" : "h-20"
        )}
      >
        {/* Brand mark */}
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2 font-serif text-xl tracking-tight transition-colors",
            scrolled ? "text-foreground" : "text-uz-cream"
          )}
        >
          <Compass
            className={cn(
              "h-5 w-5 transition-colors",
              scrolled ? "text-uz-turquoise" : "text-uz-ochre"
            )}
          />
          <span>
            Journey to the East
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium tracking-wide transition-colors",
                  scrolled
                    ? "text-foreground/80 hover:text-uz-turquoise"
                    : "text-uz-cream/85 hover:text-uz-cream",
                  active && (scrolled ? "text-uz-turquoise" : "text-uz-cream")
                )}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-uz-ochre"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle
            className={cn(
              scrolled
                ? "text-foreground hover:bg-secondary"
                : "text-uz-cream hover:bg-white/10"
            )}
          />
          <Button asChild variant="terracotta" size="sm" className="ml-1">
            <Link href="/chat">
              <Sparkles className="h-4 w-4" />
              AI Concierge
            </Link>
          </Button>
          <AccountMenu account={account} scrolled={scrolled} />
        </div>

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          className={cn(
            "md:hidden inline-flex items-center justify-center rounded-full p-2 transition-colors",
            scrolled
              ? "text-foreground hover:bg-secondary"
              : "text-uz-cream hover:bg-white/10"
          )}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile dropdown panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden overflow-hidden border-t border-border bg-background/95 backdrop-blur-lg"
          >
            <div className="container-editorial py-4 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-3 text-base font-medium hover:bg-secondary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-3 mt-2 border-t border-border space-y-2">
                {account ? (
                  <>
                    <Link href="/auth/profile" className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-secondary">
                      Profile
                    </Link>
                    <Link href="/favorites" className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-secondary">
                      Favorites
                    </Link>
                    <Link href="/my-bookings" className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-secondary">
                      My bookings
                    </Link>
                    <form action="/auth/sign-out" method="post">
                      <button type="submit" className="w-full text-left rounded-lg px-3 py-2 text-sm font-medium text-uz-terracotta hover:bg-secondary">
                        Sign out
                      </button>
                    </form>
                  </>
                ) : (
                  <Link href="/auth/login" className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-secondary">
                    Sign in
                  </Link>
                )}
                <div className="flex items-center justify-between pt-2">
                  <ThemeToggle />
                  <Button asChild variant="terracotta" size="sm">
                    <Link href="/chat">
                      <Sparkles className="h-4 w-4" />
                      AI Concierge
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
