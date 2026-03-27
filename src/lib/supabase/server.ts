import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

/**
 * Server-side Supabase client with service role key.
 * Only use in API routes / server components — never import on the client.
 */
export function createServerSupabaseClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
