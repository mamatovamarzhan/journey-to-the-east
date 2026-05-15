"use client";

import Link from "next/link";
import { LogIn, User, Heart, Briefcase, LogOut } from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export type AccountInfo = {
  email: string;
  name: string | null;
  avatarUrl: string | null;
};

/**
 * Right-hand-side account control on the navbar.
 *   • signed out → "Sign in" link
 *   • signed in  → avatar that opens a dropdown menu (Profile, Favorites,
 *     My bookings, Sign out)
 *
 * Renders different colors depending on whether the navbar is in its
 * transparent (hero) or solid (scrolled) state.
 */
export function AccountMenu({
  account,
  scrolled,
}: {
  account: AccountInfo | null;
  scrolled: boolean;
}) {
  if (!account) {
    return (
      <Link
        href="/auth/login"
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors",
          scrolled
            ? "text-foreground hover:bg-secondary"
            : "text-uz-cream hover:bg-white/10"
        )}
      >
        <LogIn className="h-4 w-4" />
        Sign in
      </Link>
    );
  }

  const initials =
    (account.name ?? account.email)
      .split(/[\s@]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((s) => s[0]?.toUpperCase())
      .join("") || "JE";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Open account menu"
          className={cn(
            "rounded-full ring-2 ring-transparent transition-all focus:outline-none focus:ring-uz-ochre",
            scrolled ? "hover:ring-uz-ochre/50" : "hover:ring-uz-cream/50"
          )}
        >
          <Avatar className="h-9 w-9">
            {account.avatarUrl && <AvatarImage src={account.avatarUrl} alt={account.name ?? "Avatar"} />}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          {account.name ?? "Your account"}
        </DropdownMenuLabel>
        <p className="px-3 pb-1.5 text-xs text-muted-foreground truncate" title={account.email}>
          {account.email}
        </p>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/auth/profile">
            <User className="h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/favorites">
            <Heart className="h-4 w-4" />
            Favorites
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/my-bookings">
            <Briefcase className="h-4 w-4" />
            My bookings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* Plain HTML form so sign-out works without JS. */}
        <DropdownMenuItem asChild>
          <form action="/auth/sign-out" method="post" className="w-full">
            <button type="submit" className="w-full flex items-center gap-2 text-uz-terracotta">
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
