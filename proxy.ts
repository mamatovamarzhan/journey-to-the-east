// In Next 16 this file is called `proxy.ts` (renamed from `middleware.ts`).
// It runs before every matched request. We use it to refresh the Supabase
// auth session cookie — without this, a logged-in user's token can expire
// while they browse and they'd suddenly look logged-out to RSCs.
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  // If Supabase isn't configured yet (early development, env vars not set),
  // we just no-op rather than crashing on every page load.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return response;

  const supabase = createServerClient(
    url,
    key,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Just calling getUser() is enough — @supabase/ssr will rotate the token
  // and write fresh cookies via the setAll() hook above when needed.
  await supabase.auth.getUser();

  return response;
}

export const config = {
  // Skip static assets, Next internals, and the favicon.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
