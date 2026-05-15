import { createClient } from "@/lib/supabase/server";
import type { Favorite, FavoriteItemType } from "@/lib/db-types";

/** Server-side: fetches all of a user's favorites. */
export async function getFavorites(userId: string): Promise<Favorite[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  return data ?? [];
}

/**
 * Returns a Set of "type:id" composite keys for fast lookup. The cities/
 * itineraries listing pages call this once, then pass the set down so
 * each heart button can render its initial state without a query.
 */
export async function getFavoriteKeys(userId: string): Promise<Set<string>> {
  const favorites = await getFavorites(userId);
  return new Set(favorites.map((f) => `${f.item_type}:${f.item_id}`));
}

export function favoriteKey(type: FavoriteItemType, id: string) {
  return `${type}:${id}`;
}
