'use client'

import { motion } from 'framer-motion'
import type { Profile } from '@/types'

const skills = [
  'Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL',
  'Supabase', 'Tailwind CSS', 'Python', 'Git', 'REST APIs',
]

export default function AboutSection({ profile }: { profile: Profile }) {
  return (
    <section id="about" className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-violet-600/6 blur-[100px]" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-indigo-400 text-sm font-medium uppercase tracking-widest mb-3">Get to know me</p>
          <h2 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Bio text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="prose prose-lg prose-invert max-w-none">
              {profile.bio_long.split('\n\n').map((para, i) => (
                <p key={i} className="text-slate-300 leading-relaxed mb-5 text-base sm:text-lg">
                  {para}
                </p>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              <a
                href="https://github.com/mayazad"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/25 min-h-[44px] flex items-center"
              >
                View GitHub →
              </a>
              <a
                href="https://www.linkedin.com/in/md-mayaz-ad/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 min-h-[44px] flex items-center"
              >
                Connect on LinkedIn →
              </a>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="glass rounded-2xl p-6 sm:p-8 glow">
              <h3 className="font-outfit text-lg font-semibold text-white mb-5">
                Tech I work with
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="px-3 py-1.5 rounded-full bg-indigo-600/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium hover:bg-indigo-600/20 transition-colors"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>

              {/* Quick stats */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { label: 'Projects Built', value: '10+' },
                  { label: 'Technologies', value: '15+' },
                  { label: 'GitHub Repos', value: '20+' },
                  { label: 'Coffee/day', value: '3☕' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-3 rounded-xl bg-white/5">
                    <div className="font-outfit text-2xl font-bold text-indigo-400">{stat.value}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
