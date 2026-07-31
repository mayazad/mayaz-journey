'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { GithubIcon } from '@/components/icons/SocialIcons'
import type { Project } from '@/types'

export default function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group glass rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 flex flex-col"
    >
      {/* Cover image */}
      <div className="relative h-48 bg-gradient-to-br from-indigo-900/50 to-violet-900/50 overflow-hidden flex-shrink-0">
        {project.cover_image_url ? (
          <Image
            src={project.cover_image_url}
            alt={`${project.title} cover image`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-outfit text-4xl font-bold text-indigo-400/30">
              {project.title.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#13131a]/80 to-transparent" />

        {/* Featured badge */}
        {project.is_featured && (
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 rounded-full bg-indigo-600/90 text-white text-xs font-medium backdrop-blur-sm">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <h3 className="font-outfit text-lg font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors">
          <Link href={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>

        <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">
          {project.short_description}
        </p>

        {/* Achievements */}
        {project.achievements && project.achievements.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.achievements.slice(0, 2).map((ach, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium"
              >
                <span className="font-bold">{ach.value}</span>
                <span className="text-emerald-500/70">{ach.label}</span>
              </span>
            ))}
          </div>
        )}

        {/* Tech stack */}
        {project.tech_stack && project.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tech_stack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-md bg-indigo-600/10 border border-indigo-500/15 text-indigo-400 text-xs"
              >
                {tech}
              </span>
            ))}
            {project.tech_stack.length > 5 && (
              <span className="px-2 py-0.5 text-slate-500 text-xs">
                +{project.tech_stack.length - 5} more
              </span>
            )}
          </div>
        )}

        {/* Links */}
        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/5">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} GitHub repository`}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors group/link"
            >
              <GithubIcon size={15} />
              <span>Code</span>
            </a>
          )}
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              className="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 text-sm transition-colors ml-auto"
            >
              Live Demo
              <ExternalLink size={13} />
            </a>
          )}
          <Link
            href={`/projects/${project.slug}`}
            className={`inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors ${project.live_url ? '' : 'ml-auto'}`}
          >
            Details →
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
