import { mockDepartments } from "@/lib/mock-data"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{
    departmentSlug: string
    areaSlug: string
  }>
}

export default async function AreaPage({ params }: PageProps) {
  // Find department and area from mock data
  const { departmentSlug, areaSlug } = await params
  const department = mockDepartments.find(d => d.slug === departmentSlug)
  if (!department) notFound()
  
  const area = department.areas?.find(a => a.slug === areaSlug)
  if (!area) notFound()

  return (
    <>
      {/* Area Header */}
      <div className="bg-black text-primary px-8 py-4">
        <h1 className="text-xl font-bold uppercase tracking-wider">
          {department.name} - {area.name}
        </h1>
      </div>

      {/* Widget Area */}
      <div className="p-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm min-h-[600px]">
          {area.widgets.length === 0 ? (
            <div className="flex items-center justify-center h-96 text-gray-400">
              <div className="text-center">
                <p className="text-lg mb-4">Keine Widgets konfiguriert</p>
                <p className="text-sm">Klicken Sie auf "Area bearbeiten" um Widgets hinzuzufügen</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Hier würde die Widget-Engine die Widgets rendern */}
              <p className="text-gray-600">Widget-Rendering kommt hier...</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}