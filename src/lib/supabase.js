/**
 * Supabase Client
 * Untuk upload file ke Supabase Storage
 */

import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "../config/config";

// Create Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Get Supabase client instance
 * @returns {Object} Supabase client
 */
export function getSupabaseClient() {
  return supabase;
}

