"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * ThemeToggle — swaps between cream (light) and ultramarine (dark) modes.
 * We delay rendering until mounted so the sun/moon icon doesn't hydrate-
 * mismatch with the actual theme on first paint.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className={className} aria-hidden>
        <Sun className="h-4 w-4 opacity-0" />
      </Button>
    );
  }

  const isDark = (theme === "system" ? resolvedTheme : theme) === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle color theme"
      className={className}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-uz-ochre" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  );
}
