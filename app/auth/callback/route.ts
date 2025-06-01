import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

/**
 * OAuth callback handler for Supabase authentication.
 * 
 * @param {Request} request - The incoming request with OAuth code
 * @returns {Promise<NextResponse>} Redirect to dashboard or error page
 * 
 * @remarks
 * This route handler:
 * 1. Exchanges the OAuth code for a session
 * 2. Retrieves authenticated user details
 * 3. Would check RACCOOVA user access in production
 * 4. Redirects to the originally requested page or dashboard
 * 
 * Expected query parameters:
 * - code: OAuth authorization code from provider
 * - next: Optional redirect path after successful auth
 */
export async function GET(request: Request): Promise<NextResponse> {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') ?? '/d/marketing'

  if (code) {
    const supabase = await createClient()
    
    try {
      // Exchange code for session
      const { error: sessionError } = await supabase.auth.exchangeCodeForSession(code)
      
      if (sessionError) {
        console.error('Session exchange error:', sessionError)
        return NextResponse.redirect(`${requestUrl.origin}/auth/login?error=session_failed`)
      }

      // Get the authenticated user
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError || !user) {
        console.error('Get user error:', userError)
        return NextResponse.redirect(`${requestUrl.origin}/auth/login?error=user_failed`)
      }

      // RACCOOVA Multi-Tool Architecture:
      // Warum dieser Schritt wichtig ist: RACCOOVA ist eine Plattform mit mehreren Tools.
      // Ein User meldet sich einmal an und kann dann auf verschiedene Tools zugreifen.
      // Kibubot ist eines dieser Tools. Wir müssen prüfen, ob der User Zugriff hat.
      
      // TODO: Wenn DB verfügbar ist, hier implementieren:
      // 1. Prüfe ob RACCOOVAUser in unserer DB existiert
      // 2. Falls nicht, erstelle neuen RACCOOVAUser mit:
      //    - id: user.id (von Supabase Auth)
      //    - email: user.email
      //    - raccoovaRole: 'USER'
      //    - tools: ['kibubot'] // Initial nur Kibubot-Zugriff
      // 3. Falls User existiert, prüfe ob 'kibubot' in tools Array ist
      // 4. Falls nicht, zeige Fehlerseite "Kein Zugriff auf Kibubot"
      
      // Logging für Debugging und Monitoring
      console.log('User authenticated:', {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.full_name || user.user_metadata?.name,
        avatar: user.user_metadata?.avatar_url,
        // In Zukunft würden wir hier die tools aus der DB laden
        mockTools: ['kibubot']
      })
      
      // MOCK: Simuliere Kibubot-Zugriffsprüfung
      // In Produktion würde hier eine Datenbankabfrage stattfinden
      const mockHasKibubotAccess = true
      
      if (!mockHasKibubotAccess) {
        return NextResponse.redirect(`${requestUrl.origin}/auth/no-access`)
      }

      // Redirect to requested page or dashboard
      return NextResponse.redirect(`${requestUrl.origin}${next}`)
      
    } catch (error) {
      console.error('Auth callback error:', error)
      return NextResponse.redirect(`${requestUrl.origin}/auth/login?error=unknown`)
    }
  }

  // No code present, redirect to login
  return NextResponse.redirect(`${requestUrl.origin}/auth/login?error=no_code`)
}