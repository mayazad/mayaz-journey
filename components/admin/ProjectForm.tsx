'use client'

import { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createClient } from '@/lib/supabase/client'
import ImageUploader from '@/components/admin/ImageUploader'
import { projectSchema, type ProjectFormData } from '@/lib/validations/project'
import { Plus, Trash2, CheckCircle, AlertTriangle } from 'lucide-react'
import type { Project } from '@/types'

interface ProjectFormProps {
  project?: Project
  onSaved?: () => void
  allFeaturedCount?: number
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export default function ProjectForm({ project, onSaved, allFeaturedCount = 0 }: ProjectFormProps) {
  const isEdit = !!project
  const [saved, setSaved] = useState(false)
  const [serverError, setServerError] = useState('')
  const [coverUrl, setCoverUrl] = useState(project?.cover_image_url || '')
  const [techInput, setTechInput] = useState('')
  const supabase = createClient()

  const { register, handleSubmit, setValue, watch, control, formState: { errors, isSubmitting } } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: project?.title || '',
      slug: project?.slug || '',
      short_description: project?.short_description || '',
      long_description: project?.long_description || '',
      tech_stack: project?.tech_stack || [],
      github_url: project?.github_url || '',
      live_url: project?.live_url || '',
      achievements: project?.achievements || [{ label: '', value: '' }],
      is_featured: project?.is_featured ?? false,
      display_order: project?.display_order ?? 0,
    },
  })

  const { fields: achFields, append: achAppend, remove: achRemove } = useFieldArray({ control, name: 'achievements' })
  const watchTitle = watch('title')
  const watchTech = watch('tech_stack')
  const watchFeatured = watch('is_featured')

  // Auto-slug from title (only when creating)
  useEffect(() => {
    if (!isEdit && watchTitle) setValue('slug', slugify(watchTitle))
  }, [watchTitle, isEdit, setValue])

  const showFeaturedWarning = watchFeatured && !isEdit && allFeaturedCount >= 6

  async function onSubmit(data: ProjectFormData) {
    setServerError('')
    const payload = { ...data, cover_image_url: coverUrl || null, github_url: data.github_url || null, live_url: data.live_url || null }

    if (isEdit && project) {
      const { error } = await supabase.from('projects').update({ ...payload, updated_at: new Date().toISOString() }).eq('id', project.id)
      if (error) { setServerError(error.message); return }
    } else {
      const { error } = await supabase.from('projects').insert(payload)
      if (error) { setServerError(error.message); return }
    }

    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
    onSaved?.()
  }

  function addTech(e: React.KeyboardEvent) {
    if ((e.key === 'Enter' || e.key === ',') && techInput.trim()) {
      e.preventDefault()
      const current = watchTech || []
      if (!current.includes(techInput.trim())) setValue('tech_stack', [...current, techInput.trim()])
      setTechInput('')
    }
  }

  const inputCls = 'w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm'
  const labelCls = 'block text-sm font-medium text-slate-300 mb-1.5'

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="p-title" className={labelCls}>Title</label>
          <input id="p-title" {...register('title')} className={inputCls} placeholder="My Awesome Project" />
          {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title.message}</p>}
        </div>
        <div>
          <label htmlFor="p-slug" className={labelCls}>Slug</label>
          <input id="p-slug" {...register('slug')} className={inputCls} placeholder="my-awesome-project" />
          {errors.slug && <p className="mt-1 text-xs text-red-400">{errors.slug.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="p-short" className={labelCls}>Short Description (card)</label>
        <textarea id="p-short" {...register('short_description')} rows={2} className={inputCls + ' resize-none'} />
        {errors.short_description && <p className="mt-1 text-xs text-red-400">{errors.short_description.message}</p>}
      </div>

      <div>
        <label htmlFor="p-long" className={labelCls}>Long Description (detail page)</label>
        <textarea id="p-long" {...register('long_description')} rows={6} className={inputCls + ' resize-y'} placeholder="Full project write-up..." />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="p-github" className={labelCls}>GitHub URL</label>
          <input id="p-github" {...register('github_url')} className={inputCls} placeholder="https://github.com/..." />
          {errors.github_url && <p className="mt-1 text-xs text-red-400">{errors.github_url.message}</p>}
        </div>
        <div>
          <label htmlFor="p-live" className={labelCls}>Live URL</label>
          <input id="p-live" {...register('live_url')} className={inputCls} placeholder="https://..." />
          {errors.live_url && <p className="mt-1 text-xs text-red-400">{errors.live_url.message}</p>}
        </div>
      </div>

      {/* Tech stack tag input */}
      <div>
        <label className={labelCls}>Tech Stack</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {(watchTech || []).map((t) => (
            <span key={t} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-600/15 border border-indigo-500/20 text-indigo-300 text-xs">
              {t}
              <button type="button" onClick={() => setValue('tech_stack', (watchTech || []).filter(x => x !== t))} className="hover:text-red-400"><Trash2 size={10} /></button>
            </span>
          ))}
        </div>
        <input
          value={techInput}
          onChange={(e) => setTechInput(e.target.value)}
          onKeyDown={addTech}
          className={inputCls}
          placeholder="Type a tech and press Enter or comma..."
        />
        {errors.tech_stack && <p className="mt-1 text-xs text-red-400">{errors.tech_stack.message}</p>}
      </div>

      {/* Achievements */}
      <div>
        <label className={labelCls}>Achievements</label>
        <div className="space-y-3">
          {achFields.map((field, i) => (
            <div key={field.id} className="flex gap-3 items-start">
              <div className="flex-1">
                <input {...register(`achievements.${i}.value`)} className={inputCls} placeholder="Value (e.g. 40%)" />
              </div>
              <div className="flex-1">
                <input {...register(`achievements.${i}.label`)} className={inputCls} placeholder="Label (e.g. Faster load)" />
              </div>
              <button type="button" onClick={() => achRemove(i)} className="mt-3 text-slate-500 hover:text-red-400 transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => achAppend({ label: '', value: '' })}
          className="mt-3 flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          <Plus size={14} /> Add Achievement
        </button>
      </div>

      {/* Cover image */}
      <ImageUploader
        bucket="project-images"
        currentUrl={coverUrl}
        onUpload={setCoverUrl}
        label="Cover Image"
      />

      {/* Featured + Order */}
      <div className="flex flex-wrap items-center gap-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" {...register('is_featured')} className="w-4 h-4 rounded accent-indigo-500" />
          <span className="text-sm text-slate-300">Featured project</span>
        </label>
        <div className="flex items-center gap-3">
          <label htmlFor="p-order" className="text-sm text-slate-300">Display order</label>
          <input
            id="p-order"
            type="number"
            {...register('display_order', { valueAsNumber: true })}
            className="w-20 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {showFeaturedWarning && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm">
          <AlertTriangle size={15} />
          You already have 6 featured projects. The public site only shows up to 6.
        </div>
      )}

      {serverError && <p className="text-sm text-red-400">{serverError}</p>}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-medium transition-all hover:shadow-lg hover:shadow-indigo-500/25 min-h-[44px]"
        >
          {isSubmitting ? 'Saving...' : isEdit ? 'Update Project' : 'Create Project'}
        </button>
        {saved && (
          <span className="flex items-center gap-1.5 text-emerald-400 text-sm">
            <CheckCircle size={16} /> {isEdit ? 'Updated!' : 'Created!'}
          </span>
        )}
      </div>
    </form>
  )
}
