import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import type { User } from '@supabase/supabase-js'

/**
 * Gets the currently authenticated user from Supabase Auth.
 * 
 * @returns {Promise<User | null>} The authenticated user or null if not authenticated
 * 
 * @remarks
 * This function is safe to use in any server context and will return null
 * instead of throwing if there's no authenticated user.
 */
export async function getAuthUser(): Promise<User | null> {
  const supabase = await createClient()
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return null
    }
    
    return user
  } catch (error) {
    console.error('Error getting auth user:', error)
    return null
  }
}

/**
 * Requires an authenticated user and redirects to login if not authenticated.
 * 
 * @returns {Promise<User>} The authenticated user
 * @throws {never} Redirects to /auth/login if not authenticated
 * 
 * @remarks
 * Use this in Server Components or Route Handlers where authentication is required.
 * The function will redirect and never return if the user is not authenticated.
 */
export async function requireAuth(): Promise<User> {
  const user = await getAuthUser()
  
  if (!user) {
    redirect('/auth/login')
  }
  
  return user
}

/**
 * Requires an authenticated user with Kibubot access.
 * 
 * @returns {Promise<User>} The authenticated user with Kibubot access
 * @throws {never} Redirects to /auth/login if not authenticated or /auth/no-access if no Kibubot access
 * 
 * @remarks
 * This function checks both authentication and Kibubot tool access.
 * In production, it will verify the user's tools array in the RACCOOVA database.
 * Currently using mock implementation until database is available.
 * 
 * @todo Implement actual database check when Prisma connection is available
 */
export async function requireKibubotAccess(): Promise<User> {
  const user = await requireAuth()
  
  // TODO: Wenn DB verfügbar ist, diese Logik implementieren:
  // 1. RACCOOVAUser aus DB laden mit user.id
  // 2. Prüfen ob 'kibubot' in tools Array ist
  // 3. Falls nicht, zu /auth/no-access redirecten
  
  // Mock-Implementierung für Entwicklung
  const mockHasAccess = true
  
  if (!mockHasAccess) {
    redirect('/auth/no-access')
  }
  
  return user
}