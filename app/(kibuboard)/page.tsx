import { Button } from "@/components/ui/button"
import { mockDepartments } from "@/lib/mock-data"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function KibuboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Willkommen bei Kibubot</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {mockDepartments.map((dept) => (
          <div
            key={dept.id}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-xl font-bold mb-2">{dept.name}</h3>
            <p className="text-gray-600 mb-4">
              {dept.areas?.length || 0} Areas konfiguriert
            </p>
            <Link href={`/d/${dept.slug}`}>
              <Button variant="primary" size="sm" className="gap-2">
                Öffnen <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        ))}
      </div>

      <div className="bg-primary/10 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Erste Schritte</h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Wählen Sie ein Department aus oder erstellen Sie ein neues, um mit der 
          Konfiguration Ihrer Areas und Widgets zu beginnen.
        </p>
        <Button size="lg" variant="primary">
          Neues Department erstellen
        </Button>
      </div>
    </div>
  )
}