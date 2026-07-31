'use client'

import { motion } from 'framer-motion'

const education = [
  {
    period: '2022 - 2026',
    degree: 'BSc in Software Engineering',
    institution: 'Daffodil International University',
  },
  {
    period: '2020',
    degree: 'Higher Secondary Certificate',
    institution: 'Govt. Rajendra College, Faridpur',
  },
]

export default function EducationSection() {
  return (
    <section id="education" className="py-24 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-indigo-600/5 blur-[100px]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-indigo-400 text-sm font-medium uppercase tracking-widest mb-3">Academic Background</p>
          <h2 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            My <span className="gradient-text">Education</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {education.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-2xl p-8 border border-white/5 glow group hover:border-indigo-500/30 transition-all duration-300"
            >
              <div className="text-indigo-400 text-sm font-semibold tracking-wider mb-2 font-outfit">
                {item.period}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-outfit group-hover:text-indigo-300 transition-colors">
                {item.degree}
              </h3>
              <p className="text-slate-400 text-lg">
                {item.institution}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
