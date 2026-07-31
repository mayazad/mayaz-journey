import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import { ExternalLink, ArrowLeft } from 'lucide-react'
import { GithubIcon } from '@/components/icons/SocialIcons'

import type { Project } from '@/types'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('projects').select('title, short_description').eq('slug', slug).single()
  if (!data) return { title: 'Project Not Found' }
  return {
    title: data.title,
    description: data.short_description,
  }
}

export async function generateStaticParams() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/projects?select=slug&is_featured=eq.true`,
      {
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
        },
        // Don't cache at build time so stale data isn't an issue
        cache: 'no-store',
      }
    )
    if (!res.ok) return []
    const data = await res.json()
    if (!Array.isArray(data)) return []
    return data.map((p: { slug: string }) => ({ slug: p.slug }))
  } catch {
    return []
  }
}



export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('projects').select('*').eq('slug', slug).single()

  if (!data) notFound()
  const project = data as Project

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            All projects
          </Link>

          {/* Cover */}
          {project.cover_image_url && (
            <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden mb-8 border border-white/5">
              <Image
                src={project.cover_image_url}
                alt={`${project.title} cover`}
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/60 to-transparent" />
            </div>
          )}

          {/* Title + Links */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <h1 className="font-outfit text-3xl sm:text-4xl font-bold text-white">{project.title}</h1>
            <div className="flex items-center gap-3 flex-shrink-0">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-slate-300 hover:text-white hover:border-white/20 text-sm transition-colors min-h-[44px]"
                >
                  <GithubIcon size={15} /> Code
                </a>
              )}
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm transition-colors min-h-[44px]"
                >
                  <ExternalLink size={15} /> Live Demo
                </a>
              )}
            </div>
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech_stack.map((tech) => (
              <span key={tech} className="px-3 py-1 rounded-full bg-indigo-600/10 border border-indigo-500/20 text-indigo-300 text-sm">
                {tech}
              </span>
            ))}
          </div>

          {/* Achievements */}
          {project.achievements && project.achievements.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {project.achievements.map((ach, i) => (
                <div key={i} className="glass rounded-xl p-4 text-center">
                  <div className="font-outfit text-2xl font-bold text-indigo-400">{ach.value}</div>
                  <div className="text-xs text-slate-400 mt-1">{ach.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Description */}
          <div className="prose prose-invert prose-lg max-w-none">
            {(project.long_description || project.short_description).split('\n\n').map((para, i) => (
              <p key={i} className="text-slate-300 leading-relaxed mb-4">
                {para}
              </p>
            ))}
          </div>

          {/* Gallery */}
          {project.gallery_image_urls && project.gallery_image_urls.length > 0 && (
            <div className="mt-12">
              <h2 className="font-outfit text-xl font-bold text-white mb-6">Gallery</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {project.gallery_image_urls.map((url, i) => (
                  <div key={i} className="relative h-48 rounded-xl overflow-hidden border border-white/5">
                    <Image
                      src={url}
                      alt={`${project.title} screenshot ${i + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
