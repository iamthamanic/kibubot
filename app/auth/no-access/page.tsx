import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NoAccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg 
              className="w-10 h-10 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-bold mb-2">Kein Zugriff auf Kibubot</h1>
          
          {/* Message */}
          <p className="text-gray-600 mb-8">
            Ihr RACCOOVA-Konto hat keinen Zugriff auf Kibubot. 
            Bitte kontaktieren Sie Ihren Administrator oder erwerben Sie eine Lizenz.
          </p>

          {/* Actions */}
          <div className="space-y-3">
            <Link href="https://raccoova.com/tools/kibubot" className="block">
              <Button variant="primary" size="lg" className="w-full">
                Kibubot-Zugriff erwerben
              </Button>
            </Link>
            
            <Link href="/auth/login" className="block">
              <Button variant="outline" size="lg" className="w-full">
                Mit anderem Konto anmelden
              </Button>
            </Link>
          </div>

          {/* Help Text */}
          <p className="text-sm text-gray-500 mt-6">
            Benötigen Sie Hilfe?{' '}
            <a href="https://raccoova.com/support" className="text-primary underline">
              Support kontaktieren
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}