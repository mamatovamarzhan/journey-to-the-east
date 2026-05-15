"use client";

// Thin wrapper around next-themes' provider. Keeps the import side of the
// app simple — no other component needs to know about the next-themes lib.
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
