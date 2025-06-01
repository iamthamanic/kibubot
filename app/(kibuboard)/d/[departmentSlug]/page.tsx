import { mockDepartments } from "@/lib/mock-data"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus, FileText } from "lucide-react"

interface PageProps {
  params: Promise<{
    departmentSlug: string
  }>
}

export default async function DepartmentPage({ params }: PageProps) {
  const { departmentSlug } = await params
  const department = mockDepartments.find(d => d.slug === departmentSlug)
  if (!department) notFound()

  return (
    <>
      {/* Department Header */}
      <div className="bg-black text-primary px-8 py-4">
        <h1 className="text-xl font-bold uppercase tracking-wider">
          {department.name} Department
        </h1>
      </div>

      {/* Areas Grid */}
      <div className="p-8">
        {department.areas && department.areas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {department.areas.map((area) => (
              <Link
                key={area.id}
                href={`/d/${department.slug}/${area.slug}`}
                className="block"
              >
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all hover:scale-105 cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <FileText className="h-8 w-8 text-primary" />
                    <span className="text-sm text-gray-500">
                      {area.widgets.length} Widgets
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{area.name}</h3>
                  <p className="text-sm text-gray-600">
                    Zuletzt aktualisiert: {new Date(area.updatedAt).toLocaleDateString('de-DE')}
                  </p>
                </div>
              </Link>
            ))}
            
            {/* Add Area Card */}
            <button className="bg-gray-100 rounded-2xl p-6 border-2 border-dashed border-gray-300 hover:border-primary hover:bg-gray-50 transition-all cursor-pointer">
              <div className="flex flex-col items-center justify-center h-full">
                <Plus className="h-12 w-12 text-gray-400 mb-3" />
                <p className="text-gray-600 font-semibold">Neue Area erstellen</p>
              </div>
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Keine Areas vorhanden</h2>
            <p className="text-gray-600 mb-6">
              Erstellen Sie Ihre erste Area in diesem Department
            </p>
            <Button variant="primary" size="lg">
              <Plus className="h-5 w-5 mr-2" />
              Erste Area erstellen
            </Button>
          </div>
        )}
      </div>
    </>
  )
}