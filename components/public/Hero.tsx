'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import { Download, ArrowRight, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/icons/SocialIcons'
import type { Profile } from '@/types'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' as const },
  }),
}


export default function Hero({ profile }: { profile: Profile }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full bg-violet-600/8 blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_60%,#0a0a0f)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text content */}
          <div className="order-2 lg:order-1">
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              Available for opportunities
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="font-outfit text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4"
            >
              Hi, I&apos;m{' '}
              <span className="gradient-text">{profile.full_name}</span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-xl sm:text-2xl font-outfit font-medium text-indigo-300 mb-6"
            >
              {profile.tagline}
            </motion.p>

            <motion.p
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-lg mb-8"
            >
              {profile.bio_short}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-3 mb-10"
            >
              {profile.resume_url && (
                <a
                  href={profile.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5 min-h-[44px]"
                >
                  <Download size={16} />
                  Download Resume
                </a>
              )}
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10 hover:text-white font-medium transition-all duration-200 hover:-translate-y-0.5 min-h-[44px]"
              >
                View Projects
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 hover:text-white font-medium transition-all duration-200 hover:-translate-y-0.5 min-h-[44px]"
              >
                <Mail size={16} />
                Contact Me
              </Link>
            </motion.div>

            {/* Social links */}
            <motion.div
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-5"
            >
              <span className="text-xs text-slate-500 uppercase tracking-widest">Find me on</span>
              <a
                href="https://github.com/mayazad"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-sm"
              >
                <GithubIcon size={16} /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/md-mayaz-ad/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-sm"
              >
                <LinkedinIcon size={16} /> LinkedIn
              </a>
            </motion.div>
          </div>

          {/* Profile photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-indigo-500/30 via-violet-500/20 to-transparent blur-xl" />
              <div className="relative w-64 h-80 sm:w-72 sm:h-96 lg:w-[340px] lg:h-[420px] rounded-[2rem] overflow-hidden border border-white/10 bg-white/5 shadow-2xl shadow-indigo-500/20 backdrop-blur-sm transition-all duration-500 group">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/80 via-transparent to-transparent z-10" />
                {profile.profile_photo_url ? (
                  <Image
                    src={profile.profile_photo_url}
                    alt={`${profile.full_name} profile photo`}
                    fill
                    sizes="(max-width: 640px) 256px, (max-width: 1024px) 288px, 340px"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-violet-700 flex items-center justify-center">
                    <span className="text-6xl font-outfit font-bold text-white/90">M</span>
                  </div>
                )}
              </div>
              {/* Decorative dots */}
              <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2280%22%20height%3D%2280%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpattern%20id%3D%22dots%22%20patternUnits%3D%22userSpaceOnUse%22%20width%3D%2210%22%20height%3D%2210%22%3E%3Ccircle%20cx%3D%225%22%20cy%3D%225%22%20r%3D%221%22%20fill%3D%22%236366f1%22%20opacity%3D%220.4%22/%3E%3C/pattern%3E%3Crect%20width%3D%2280%22%20height%3D%2280%22%20fill%3D%22url(%23dots)%22/%3E%3C/svg%3E')]" />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        >
          <span className="text-xs text-slate-600">scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-indigo-500/40 to-transparent animate-pulse" />
        </motion.div>
      </div>
    </section>
  )
}
