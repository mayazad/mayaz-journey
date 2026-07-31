'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import ProjectForm from '@/components/admin/ProjectForm'
import { Pencil, Trash2, Plus, Star, ChevronUp, ChevronDown, X } from 'lucide-react'
import type { Project } from '@/types'

export default function ProjectsManager({ initialProjects, featuredCount }: {
  initialProjects: Project[]
  featuredCount: number
}) {
  const [projects, setProjects] = useState(initialProjects)
  const [creating, setCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)
  const supabase = createClient()

  async function refresh() {
    const { data } = await supabase.from('projects').select('*').order('display_order', { ascending: true })
    setProjects((data as Project[]) || [])
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this project? This cannot be undone.')) return
    setDeleting(id)
    await supabase.from('projects').delete().eq('id', id)
    setDeleting(null)
    await refresh()
  }

  async function moveOrder(id: string, direction: 'up' | 'down') {
    const idx = projects.findIndex(p => p.id === id)
    if (direction === 'up' && idx === 0) return
    if (direction === 'down' && idx === projects.length - 1) return
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1
    const a = projects[idx]
    const b = projects[swapIdx]
    await Promise.all([
      supabase.from('projects').update({ display_order: b.display_order }).eq('id', a.id),
      supabase.from('projects').update({ display_order: a.display_order }).eq('id', b.id),
    ])
    await refresh()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-outfit text-2xl font-bold text-white">Projects</h1>
          <p className="text-slate-400 text-sm mt-1">{projects.length} project{projects.length !== 1 ? 's' : ''} · {featuredCount} featured</p>
        </div>
        <button
          onClick={() => { setCreating(true); setEditingId(null) }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-all hover:shadow-lg hover:shadow-indigo-500/25 min-h-[44px]"
        >
          <Plus size={16} /> New Project
        </button>
      </div>

      {/* Create form */}
      {creating && (
        <div className="glass rounded-2xl p-6 sm:p-8 border border-indigo-500/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-outfit text-lg font-semibold text-white">New Project</h2>
            <button onClick={() => setCreating(false)} className="text-slate-500 hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>
          <ProjectForm
            allFeaturedCount={featuredCount}
            onSaved={() => { setCreating(false); refresh() }}
          />
        </div>
      )}

      {/* Projects list */}
      <div className="space-y-3">
        {projects.length === 0 ? (
          <div className="glass rounded-2xl py-16 text-center text-slate-500">
            No projects yet. Click &quot;New Project&quot; to create one.
          </div>
        ) : (
          projects.map((project, idx) => (
            <div key={project.id}>
              {editingId === project.id ? (
                <div className="glass rounded-2xl p-6 sm:p-8 border border-indigo-500/20">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-outfit text-lg font-semibold text-white">Edit: {project.title}</h2>
                    <button onClick={() => setEditingId(null)} className="text-slate-500 hover:text-white"><X size={18} /></button>
                  </div>
                  <ProjectForm
                    project={project}
                    allFeaturedCount={featuredCount}
                    onSaved={() => { setEditingId(null); refresh() }}
                  />
                </div>
              ) : (
                <div className="glass rounded-xl px-5 py-4 flex items-center gap-4">
                  {/* Order controls */}
                  <div className="flex flex-col gap-1">
                    <button onClick={() => moveOrder(project.id, 'up')} disabled={idx === 0} className="text-slate-600 hover:text-white disabled:opacity-20 transition-colors">
                      <ChevronUp size={16} />
                    </button>
                    <button onClick={() => moveOrder(project.id, 'down')} disabled={idx === projects.length - 1} className="text-slate-600 hover:text-white disabled:opacity-20 transition-colors">
                      <ChevronDown size={16} />
                    </button>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white truncate">{project.title}</span>
                      {project.is_featured && (
                        <span className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/20 text-amber-400 text-xs">
                          <Star size={10} /> Featured
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 truncate">{project.short_description}</p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => { setEditingId(project.id); setCreating(false) }}
                      className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
                      aria-label="Edit project"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      disabled={deleting === project.id}
                      className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
                      aria-label="Delete project"
                    >
                      {deleting === project.id
                        ? <div className="w-3.5 h-3.5 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                        : <Trash2 size={15} />
                      }
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
