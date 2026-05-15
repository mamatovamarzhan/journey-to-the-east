// Supabase server client — used in Server Components, Route Handlers, and
// Server Actions. Wires Next.js cookies() into @supabase/ssr so authenticated
// requests work without us shuttling tokens around manually.
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // `getAll` returns all current cookies, `setAll` writes refreshed
        // session cookies after Supabase rotates the access token.
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll throws when called from a Server Component (cookies
            // can only be mutated in Server Actions / Route Handlers). This
            // is fine — middleware.ts handles the refresh in those cases.
          }
        },
      },
    }
  );
}
