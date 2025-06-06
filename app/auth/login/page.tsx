'use client'

import { createClient } from '@/lib/supabase-client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `http://localhost:3001/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })

      if (error) {
        setError(error.message)
      }
    } catch (err) {
      setError('Ein unerwarteter Fehler ist aufgetreten')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-lg p-8">
          {/* RACCOOVA Logo/Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold uppercase mb-2">RACCOOVA</h1>
            <p className="text-gray-600">Zentrale Anmeldung für alle Tools</p>
          </div>

          {/* Tool-Zugriff Info */}
          <div className="bg-primary/10 rounded-2xl p-4 mb-6">
            <p className="text-sm text-center">
              Sie melden sich für <span className="font-bold">Kibubot</span> an
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl mb-6">
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Login Button */}
          <Button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            size="lg"
            className="w-full gap-3"
            variant="default"
          >
            {isLoading ? (
              <span>Verbindung wird hergestellt...</span>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Mit Google anmelden
              </>
            )}
          </Button>

          {/* Terms & Info */}
          <p className="text-xs text-gray-500 text-center mt-6">
            Mit der Anmeldung stimmen Sie den{' '}
            <a href="#" className="underline">
              Nutzungsbedingungen
            </a>{' '}
            und der{' '}
            <a href="#" className="underline">
              Datenschutzerklärung
            </a>{' '}
            von RACCOOVA zu.
          </p>
        </div>

        {/* Additional Info */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Noch kein RACCOOVA-Konto?{' '}
          <a href="#" className="text-primary font-semibold">
            Kostenlos registrieren
          </a>
        </p>
      </div>
    </div>
  )
}