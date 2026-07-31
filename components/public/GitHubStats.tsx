'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Star, GitFork, BookOpen, Users, ExternalLink, Code2 } from 'lucide-react'

interface Repo {
  name: string
  description: string
  language: string
  stars: number
  forks: number
  url: string
  pushedAt: string
}

interface GitHubData {
  username: string
  publicRepos: number
  followers: number
  totalStars: number
  totalForks: number
  topLanguages: { name: string; count: number }[]
  pinnedRepos: Repo[]
}

const LANG_COLORS: Record<string, string> = {
  Python: '#3572A5',
  TypeScript: '#2b7489',
  JavaScript: '#f1e05a',
  'Jupyter Notebook': '#DA5B0B',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Go: '#00ADD8',
  Rust: '#dea584',
}

function timeAgo(dateStr: string) {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`
  return `${Math.floor(diff / 2592000)}mo ago`
}

export default function GitHubStats() {
  const [data, setData] = useState<GitHubData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/github-stats')
      .then((r) => r.json())
      .then((d) => {
        setData(d)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const stats = [
    { label: 'Repositories', value: data?.publicRepos ?? '—', icon: BookOpen },
    { label: 'Total Stars', value: data?.totalStars ?? '—', icon: Star },
    { label: 'Total Forks', value: data?.totalForks ?? '—', icon: GitFork },
    { label: 'Followers', value: data?.followers ?? '—', icon: Users },
  ]

  return (
    <section id="github" className="py-24 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-violet-600/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-indigo-400 text-sm font-medium uppercase tracking-widest mb-3">Active Development</p>
          <h2 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            GitHub <span className="gradient-text">Activity</span>
          </h2>
        </motion.div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map(({ label, value, icon: Icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass rounded-2xl p-5 border border-white/5 glow hover:border-indigo-500/30 transition-all duration-300 flex flex-col gap-2"
            >
              <Icon size={18} className="text-indigo-400" />
              <div className="text-2xl font-bold font-outfit text-white">
                {loading ? (
                  <div className="h-7 w-12 rounded-md bg-white/10 animate-pulse" />
                ) : (
                  value
                )}
              </div>
              <div className="text-xs text-slate-500 uppercase tracking-widest">{label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contribution Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 glass rounded-2xl p-6 border border-white/5 glow"
          >
            <h3 className="text-white font-semibold font-outfit mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400 inline-block" />
              Contribution Calendar
            </h3>
            <div className="overflow-x-auto rounded-xl">
              <img
                src="https://ghchart.rshah.org/6366f1/mayazad"
                alt="GitHub Contribution Chart"
                className="w-full min-w-[400px] opacity-90 hover:opacity-100 transition-opacity"
                style={{ filter: 'invert(0)' }}
              />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-slate-500 text-xs">Contribution activity on GitHub</span>
              <a
                href="https://github.com/mayazad"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 text-xs flex items-center gap-1 transition-colors"
              >
                View profile <ExternalLink size={12} />
              </a>
            </div>
          </motion.div>

          {/* Top Languages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass rounded-2xl p-6 border border-white/5 glow"
          >
            <h3 className="text-white font-semibold font-outfit mb-5 flex items-center gap-2">
              <Code2 size={16} className="text-indigo-400" />
              Top Languages
            </h3>
            {loading ? (
              <div className="flex flex-col gap-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-8 rounded-lg bg-white/5 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {data?.topLanguages?.map(({ name, count }, i) => {
                  const total = data.topLanguages.reduce((a, l) => a + l.count, 0)
                  const pct = Math.round((count / total) * 100)
                  const color = LANG_COLORS[name] ?? '#6366f1'
                  return (
                    <div key={name} className="flex flex-col gap-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-300 flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: color }} />
                          {name}
                        </span>
                        <span className="text-slate-500 text-xs">{pct}%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: i * 0.1 }}
                          className="h-full rounded-full"
                          style={{ background: color }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </motion.div>
        </div>

        {/* Top Repos */}
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          {loading
            ? [...Array(4)].map((_, i) => (
                <div key={i} className="h-32 rounded-2xl bg-white/5 animate-pulse" />
              ))
            : data?.pinnedRepos?.map((repo, i) => (
                <motion.a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="glass rounded-2xl p-5 border border-white/5 hover:border-indigo-500/30 glow transition-all duration-300 group flex flex-col gap-3"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-semibold text-white font-outfit group-hover:text-indigo-300 transition-colors truncate pr-2">
                      {repo.name}
                    </span>
                    <ExternalLink size={14} className="text-slate-600 group-hover:text-indigo-400 transition-colors shrink-0 mt-0.5" />
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                    {repo.description || 'No description provided.'}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-500 mt-auto">
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ background: LANG_COLORS[repo.language] ?? '#6366f1' }}
                        />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star size={11} /> {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork size={11} /> {repo.forks}
                    </span>
                    <span className="ml-auto">{timeAgo(repo.pushedAt)}</span>
                  </div>
                </motion.a>
              ))}
        </div>
      </div>
    </section>
  )
}
