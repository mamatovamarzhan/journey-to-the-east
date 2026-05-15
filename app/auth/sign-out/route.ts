// POST /auth/sign-out → revokes the Supabase session + bounces home.
// The navbar account menu submits to this endpoint as a plain HTML form so
// it works without JavaScript.
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL("/", request.url), { status: 303 });
}
