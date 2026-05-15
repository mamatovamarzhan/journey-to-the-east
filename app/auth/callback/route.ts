// OAuth + email-verification callback. Supabase redirects here with a
// short-lived `code` param; we exchange it for a session cookie, then
// bounce the user wherever they were headed.
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Anything that didn't carry a code (or where exchange failed) lands
  // back on the login page with a flag the form can surface.
  return NextResponse.redirect(`${origin}/auth/login?error=auth_callback`);
}
