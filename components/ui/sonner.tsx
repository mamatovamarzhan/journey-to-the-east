"use client";

import { useTheme } from "next-themes";
import { Toaster as SonnerToaster } from "sonner";

/**
 * Sonner toaster, themed to our palette. We pass `theme` from next-themes so
 * toasts switch with the rest of the UI; the className overrides re-color
 * the default sonner accent stripe to terracotta.
 */
export function Toaster() {
  const { theme = "system" } = useTheme();

  return (
    <SonnerToaster
      theme={theme as "light" | "dark" | "system"}
      position="bottom-right"
      richColors
      toastOptions={{
        classNames: {
          toast:
            "rounded-xl border border-border bg-card text-card-foreground shadow-warm",
          title: "font-serif text-base",
          description: "text-muted-foreground text-sm",
          actionButton:
            "bg-uz-terracotta text-uz-cream hover:bg-uz-terracotta-deep",
          cancelButton:
            "bg-muted text-muted-foreground",
        },
      }}
    />
  );
}
