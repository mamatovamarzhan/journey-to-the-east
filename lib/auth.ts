// Server-side auth helpers. Always use these in RSCs and Route Handlers
// instead of calling supabase.auth.getUser() directly, so the createClient
// import path is uniform and easy to grep.

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/db-types";

/** Returns the current user or null. Safe in any Server Component. */
export async function getUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

/**
 * Same as getUser, but redirects to /auth/login if there's no session.
 * Use this at the top of any RSC page that requires an account.
 */
export async function requireUser(nextPath = "/") {
  const user = await getUser();
  if (!user) redirect(`/auth/login?next=${encodeURIComponent(nextPath)}`);
  return user;
}

/** Fetches the profile row for the current user, if any. */
export async function getMyProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();
  return data;
}
