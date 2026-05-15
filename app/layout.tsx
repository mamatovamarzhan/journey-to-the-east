import type { Metadata } from "next";
// next/font/google loads + self-hosts the fonts at build time, so we don't
// pay a runtime request to fonts.googleapis.com. Each font exports a CSS
// variable that we then plug into Tailwind's @theme block in globals.css.
import { Inter, Cormorant_Garamond, Caveat } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import { getUser, getMyProfile } from "@/lib/auth";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-cormorant",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: "Journey to the East — A modern guide to Uzbekistan",
  description:
    "An editorial travel guide and AI booking concierge for Uzbekistan. Plan your Silk Road journey through Samarkand, Bukhara, Khiva, Tashkent, and Fergana.",
  keywords: [
    "Uzbekistan travel",
    "Silk Road",
    "Samarkand",
    "Bukhara",
    "Khiva",
    "Tashkent",
    "Central Asia",
    "travel guide",
  ],
  openGraph: {
    title: "Journey to the East",
    description: "A modern editorial guide to Uzbekistan + AI booking concierge.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Fetch auth state once at the layout level. Server Components further
  // down the tree can fetch their own data — we just need enough here to
  // render the navbar's account menu.
  const user = await getUser();
  const profile = user ? await getMyProfile() : null;
  const account = user
    ? {
        email: user.email ?? "",
        name: profile?.name ?? null,
        avatarUrl: profile?.avatar_url ?? null,
      }
    : null;

  return (
    // suppressHydrationWarning is required by next-themes — it flips the
    // `class` attribute on <html> before React hydrates, and React otherwise
    // logs a benign mismatch warning.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${cormorant.variable} ${caveat.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Navbar account={account} />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
