'use client'

import { motion } from 'framer-motion'
import ContactForm from './ContactForm'
import { Mail, MapPin, Phone } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/icons/SocialIcons'
import type { Profile } from '@/types'

export default function ContactSection({ profile }: { profile: Profile }) {
  return (
    <section id="contact" className="pt-20 pb-24 lg:pb-32 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-60 bg-indigo-600/8 blur-[100px]" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-indigo-400 text-sm font-medium uppercase tracking-widest mb-3">Get in touch</p>
          <h2 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl">
            Whether you have a project in mind, a job opportunity, or just want to say hi — my inbox is
            always open.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-4 p-4 rounded-xl glass hover:border-indigo-500/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-indigo-600/20 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600/30 transition-colors">
                  <Mail size={18} className="text-indigo-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">Email</p>
                  <p className="text-sm text-white font-medium">{profile.email}</p>
                </div>
              </a>
            )}

            {profile.location && (
              <div className="flex items-center gap-4 p-4 rounded-xl glass">
                <div className="w-10 h-10 rounded-lg bg-indigo-600/20 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-indigo-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">Location</p>
                  <p className="text-sm text-white font-medium">{profile.location}</p>
                </div>
              </div>
            )}

            {profile.phone && (
              <a
                href={`tel:${profile.phone}`}
                className="flex items-center gap-4 p-4 rounded-xl glass hover:border-indigo-500/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-indigo-600/20 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600/30 transition-colors">
                  <Phone size={18} className="text-indigo-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">Phone</p>
                  <p className="text-sm text-white font-medium">{profile.phone}</p>
                </div>
              </a>
            )}

            {/* Social */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://github.com/mayazad"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-10 h-10 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/30 transition-all"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/md-mayaz-ad/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/30 transition-all"
              >
                <LinkedinIcon size={18} />
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
