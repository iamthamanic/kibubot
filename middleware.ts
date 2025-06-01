import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

/**
 * Middleware for handling authentication and access control.
 * 
 * @param {NextRequest} request - The incoming request
 * @returns {Promise<NextResponse>} The response, potentially with redirects
 * 
 * @remarks
 * This middleware:
 * - Protects routes under /d/, /settings, and /kibuboard
 * - Redirects unauthenticated users to login
 * - Redirects authenticated users away from auth pages
 * - Will check RACCOOVA user tools access when database is available
 */
export async function middleware(request: NextRequest): Promise<NextResponse> {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // Prüfe Auth-Status
  const { data: { user } } = await supabase.auth.getUser()

  // Geschützte Routen
  const protectedPaths = ['/d/', '/settings', '/kibuboard']
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  // Auth-Routen (Login/Callback)
  const authPaths = ['/auth/']
  const isAuthPath = authPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  // Redirect nicht-authentifizierte User von geschützten Routen
  if (isProtectedPath && !user) {
    const redirectUrl = new URL('/auth/login', request.url)
    redirectUrl.searchParams.set('next', request.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Redirect authentifizierte User von Auth-Seiten
  if (isAuthPath && user) {
    return NextResponse.redirect(new URL('/d/marketing', request.url))
  }

  // TODO: Wenn DB verfügbar ist:
  // 1. Lade RACCOOVAUser aus DB mit user.id
  // 2. Prüfe ob 'kibubot' in tools Array ist
  // 3. Falls nicht, redirect zu /auth/no-access

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}