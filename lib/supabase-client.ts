import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

/**
 * Hinweis: Dies ist der Browser-Client für Client-Komponenten.
 * 
 * Für serverseitige Operationen verwenden Sie:
 * - Server Components: createServerClient() mit cookies()
 * - Route Handlers: createServerClient() mit cookies()
 * - Server Actions: createServerClient() mit cookies()
 * - Middleware: createServerClient() mit NextResponse
 * 
 * Diese werden wir bei Bedarf später implementieren.
 */