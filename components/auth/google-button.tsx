"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

// Google "G" mark — official multi-color logo. Inline SVG so no extra
// asset to ship and it stays sharp at any size.
function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.6 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.6 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35.3 26.8 36 24 36c-5.2 0-9.6-3.3-11.2-8L6.2 33C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.7l6.2 5.2C40.6 35.5 44 30.1 44 24c0-1.2-.1-2.3-.4-3.5z" />
    </svg>
  );
}

/**
 * Continue-with-Google button. Uses Supabase's signInWithOAuth, which
 * redirects to Google → comes back to /auth/callback with a code that
 * the callback route exchanges for a session.
 *
 * Requires the Google provider enabled in:
 *   Supabase dashboard → Authentication → Providers → Google
 * (configure the OAuth client ID & secret there, plus add the redirect URL
 * https://<project-ref>.supabase.co/auth/v1/callback to Google Console.)
 */
export function GoogleButton({ next = "/" }: { next?: string }) {
  const [loading, setLoading] = useState(false);

  async function onClick() {
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });
    if (error) {
      setLoading(false);
      toast.error("Google sign-in failed", {
        description:
          error.message.includes("provider")
            ? "Enable Google in your Supabase dashboard → Authentication → Providers."
            : error.message,
      });
    }
    // On success, the browser navigates away; no need to clear loading.
  }

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={onClick}
      disabled={loading}
      className="w-full"
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <GoogleG className="h-5 w-5" />}
      Continue with Google
    </Button>
  );
}
