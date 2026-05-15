"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";
import type { FavoriteItemType } from "@/lib/db-types";
import { cn } from "@/lib/utils";

/**
 * Heart-icon favorite toggle. Renders a small circular button (good as an
 * overlay on a photo card) and supports an "inline" variant for use inside
 * the city detail hero next to the title.
 *
 * Behavior:
 *   • Not signed in → toast + nav to /auth/login (returning here after).
 *   • Signed in → optimistic UI flip, then INSERT or DELETE on favorites.
 */
export function FavoriteButton({
  itemType,
  itemId,
  initial,
  loggedIn,
  variant = "overlay",
  className,
  onChange,
}: {
  itemType: FavoriteItemType;
  itemId: string;
  initial: boolean;
  loggedIn: boolean;
  variant?: "overlay" | "inline";
  className?: string;
  /** Optional callback when toggle commits — useful on /favorites where
   *  unfavoriting should immediately remove the card from the list. */
  onChange?: (nowFavorited: boolean) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState(initial);
  const [busy, setBusy] = useState(false);

  async function toggle(e: React.MouseEvent | React.KeyboardEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (busy) return;

    if (!loggedIn) {
      toast.info("Sign in to save favorites", {
        action: {
          label: "Sign in",
          onClick: () => router.push(`/auth/login?next=${encodeURIComponent(pathname)}`),
        },
      });
      return;
    }

    const next = !active;
    setActive(next); // optimistic
    setBusy(true);

    const supabase = createClient();
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not signed in");

      if (next) {
        const { error } = await supabase
          .from("favorites")
          .insert({ user_id: user.id, item_type: itemType, item_id: itemId });
        if (error && !error.message.includes("duplicate")) throw error;
      } else {
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("item_type", itemType)
          .eq("item_id", itemId);
        if (error) throw error;
      }
      onChange?.(next);
    } catch (err) {
      // Roll back optimistic flip on error.
      setActive(!next);
      const msg = err instanceof Error ? err.message : "Couldn't update favorite";
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  }

  const Icon = (
    <Heart
      className={cn(
        "transition-all",
        variant === "overlay" ? "h-4 w-4" : "h-5 w-5",
        active && "fill-uz-terracotta text-uz-terracotta"
      )}
    />
  );

  if (variant === "inline") {
    return (
      <button
        onClick={toggle}
        aria-pressed={active}
        aria-label={active ? "Remove from favorites" : "Save to favorites"}
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border transition-all",
          active
            ? "bg-uz-terracotta/15 border-uz-terracotta/30 text-uz-terracotta-deep"
            : "border-border bg-card hover:bg-secondary",
          className
        )}
      >
        {Icon}
        {active ? "Saved" : "Save"}
      </button>
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.88 }}
      onClick={toggle}
      aria-pressed={active}
      aria-label={active ? "Remove from favorites" : "Save to favorites"}
      className={cn(
        "absolute inline-flex items-center justify-center h-9 w-9 rounded-full backdrop-blur-md transition-colors",
        "bg-uz-cream/85 hover:bg-uz-cream text-uz-charcoal",
        "shadow-md",
        className
      )}
    >
      {Icon}
    </motion.button>
  );
}
