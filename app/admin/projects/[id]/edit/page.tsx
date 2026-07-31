import { createClient } from '@/lib/supabase/server'
import AdminSidebar from '@/components/admin/AdminSidebar'
import ProjectForm from '@/components/admin/ProjectForm'
import { notFound } from 'next/navigation'
import type { Project } from '@/types'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

type Props = { params: Promise<{ id: string }> }

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const [{ data: project }, { count: featuredCount }] = await Promise.all([
    supabase.from('projects').select('*').eq('id', id).single(),
    supabase.from('projects').select('*', { count: 'exact', head: true }).eq('is_featured', true),
  ])

  if (!project) notFound()

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <Link href="/admin/projects" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group mb-4">
              <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
              Back to Projects
            </Link>
            <h1 className="font-outfit text-2xl font-bold text-white">Edit Project</h1>
            <p className="text-slate-400 text-sm mt-1">{(project as Project).title}</p>
          </div>
          <div className="glass rounded-2xl p-6 sm:p-8">
            <ProjectForm project={project as Project} allFeaturedCount={featuredCount ?? 0} />
          </div>
        </div>
      </main>
    </div>
  )
}
