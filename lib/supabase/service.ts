// Service-role Supabase client. Bypasses Row-Level Security — use ONLY in
// trusted server contexts like the /api/bookings/create route, where we
// need to insert on behalf of users. Never import this from a Client
// Component or expose the service key.
import { createClient } from "@supabase/supabase-js";

export function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: { persistSession: false, autoRefreshToken: false },
    }
  );
}
