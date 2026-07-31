import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import ProjectCard from '@/components/public/ProjectCard'
import type { Project } from '@/types'

export const metadata: Metadata = {
  title: 'Projects | Mayaz',
  description: 'A showcase of AI, machine learning, and software projects built by Md Adnan Hossain Mayaz.',
}

export default async function ProjectsPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('projects')
    .select('*')
    .eq('is_featured', true)
    .order('display_order', { ascending: true })

  const projects = (data as Project[]) || []

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <p className="text-indigo-400 text-sm font-medium uppercase tracking-widest mb-3">Portfolio</p>
            <h1 className="font-outfit text-4xl sm:text-5xl font-bold text-white">
              My <span className="gradient-text">Projects</span>
            </h1>
            <p className="mt-4 text-slate-400 max-w-xl">
              A collection of my best work — from full-stack web apps to AI-powered tools.
            </p>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
              Projects coming soon — check back later!
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
