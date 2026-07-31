'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import type { Project } from '@/types'

export default function FeaturedProjects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-indigo-600/6 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14"
        >
          <div>
            <p className="text-indigo-400 text-sm font-medium uppercase tracking-widest mb-3">What I&apos;ve built</p>
            <h2 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Featured <span className="gradient-text">Projects</span>
            </h2>
          </div>
          <Link
            href="/projects"
            className="shrink-0 text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors group"
          >
            View all projects{' '}
            <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </motion.div>

        {projects.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            No featured projects yet — add them via the admin panel.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
