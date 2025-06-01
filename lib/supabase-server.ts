import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Creates a Supabase client for server-side usage with cookie-based session management.
 * 
 * @returns {Promise<ReturnType<typeof createServerClient>>} Supabase client configured for server-side use
 * 
 * @remarks
 * This function handles the Next.js 15 requirement for async cookie operations.
 * It's designed to work in Server Components, Route Handlers, and Server Actions.
 * The try-catch blocks in set/remove are necessary because cookies can't be modified
 * in Server Components (only in Route Handlers and Server Actions).
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Der `set` method wird für Server Components aufgerufen,
            // aber das Setzen von Cookies funktioniert dort nicht.
            // Dies kann in Server Actions oder Route Handlers ignoriert werden.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Siehe oben
          }
        },
      },
    }
  )
}