import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Use placeholders when env is missing so static export build does not throw (admin runs client-side with real env in browser).
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'

/** True if real Supabase env vars are set (not placeholder). Use for dev diagnostic. */
export const hasRealSupabaseConfig =
  typeof process.env.NEXT_PUBLIC_SUPABASE_URL === 'string' &&
  process.env.NEXT_PUBLIC_SUPABASE_URL.length > 0 &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder') &&
  typeof process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === 'string' &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length > 0 &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'placeholder'

export function createSupabaseClient(): SupabaseClient {
  return createClient(supabaseUrl, supabaseAnonKey)
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
export { supabaseUrl }
