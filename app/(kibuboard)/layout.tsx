'use client'

import { Button } from "@/components/ui/button"
import { 
  Plus, 
  LogOut, 
  Settings, 
  MessageCircle,
  Building,
  TrendingUp,
  FolderOpen,
  Megaphone
} from "lucide-react"
import Link from "next/link"
import { mockDepartments, mockOrganization } from "@/lib/mock-data"
import { createClient } from "@/lib/supabase-client"
import { useRouter } from "next/navigation"

// Icon mapping for departments
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building: Building,
  TrendingUp: TrendingUp,
  FolderOpen: FolderOpen,
  Megaphone: Megaphone,
}

export default function KibuboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const supabase = createClient()
  
  // Mock: aktives Department (später aus URL params)
  const activeDepartmentSlug = "marketing"
  
  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <aside className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold uppercase">Kibubot</h1>
          </div>
          <p className="text-sm text-gray-500 uppercase tracking-wider">
            @{mockOrganization.name}
          </p>
        </div>

        {/* Department Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {mockDepartments.map((dept) => {
            const Icon = iconMap[dept.icon || 'Building']
            const isActive = dept.slug === activeDepartmentSlug
            
            return (
              <Link
                key={dept.id}
                href={`/d/${dept.slug}`}
                className="block"
              >
                <Button
                  variant={isActive ? "active" : "default"}
                  size="full"
                  className="justify-start gap-3"
                >
                  <Icon className="h-5 w-5" />
                  {dept.name}
                </Button>
              </Link>
            )
          })}
          
          {/* Add Department Button */}
          <Button
            variant="outline"
            size="full"
            className="justify-start gap-3 mt-4"
          >
            <Plus className="h-5 w-5" />
            ADD DEPARTMENT
          </Button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
            {/* Area title will go here */}
          </div>
          
          <div className="flex items-center gap-4">
            {/* Admin View Indicator */}
            <span className="text-red-600 font-bold text-sm uppercase tracking-wider">
              ADMINVIEW
            </span>
            
            {/* Header Buttons */}
            <Link href="/settings">
              <Button size="sm">
                SETTINGS
              </Button>
            </Link>
            <Button size="sm" variant="destructive" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              LOGOUT
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>

      {/* Chat Button - Fixed Position */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90"
        >
          <MessageCircle className="h-6 w-6 text-black" />
        </Button>
      </div>
    </div>
  )
}