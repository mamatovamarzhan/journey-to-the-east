// Supabase browser client — used inside Client Components and event handlers.
// Reads cookies set by the server (see server.ts + middleware.ts) so the
// auth session stays in sync across server and client.
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    // Anon key is safe to ship to the browser; Row-Level Security in the
    // database is what actually enforces who can read or write what.
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
