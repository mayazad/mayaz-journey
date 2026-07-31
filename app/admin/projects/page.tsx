import { createClient } from '@/lib/supabase/server'
import AdminSidebar from '@/components/admin/AdminSidebar'
import ProjectsManager from '@/components/admin/ProjectsManager'
import type { Project } from '@/types'

export default async function AdminProjectsPage() {
  const supabase = await createClient()

  const [{ data: projects }, { count: featuredCount }] = await Promise.all([
    supabase.from('projects').select('*').order('display_order', { ascending: true }),
    supabase.from('projects').select('*', { count: 'exact', head: true }).eq('is_featured', true),
  ])

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <ProjectsManager
            initialProjects={(projects as Project[]) || []}
            featuredCount={featuredCount ?? 0}
          />
        </div>
      </main>
    </div>
  )
}
