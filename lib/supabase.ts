import { createClient } from '@supabase/supabase-js'

export function createServerClient() {
  const url  = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    return null
  }

  return createClient(url, key, {
    auth: { persistSession: false },
    global: {
      fetch: (url, options) => {
        // Prevent fetch from utilizing Next.js aggressive caching for Supabase queries
        return fetch(url, { ...options, cache: 'no-store' });
      }
    }
  })
}
