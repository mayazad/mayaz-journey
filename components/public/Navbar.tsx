'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/icons/SocialIcons'

const navLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Contact', href: '/#contact' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0f]/90 backdrop-blur-md border-b border-[rgba(99,102,241,0.15)] shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
        >
          <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-indigo-500/30 group-hover:border-indigo-400 transition-colors">
            <Image 
              src="/logo.png" 
              alt="Mayaz Logo" 
              fill 
              className="object-cover"
            />
          </div>
          <span className="font-outfit text-xl font-bold tracking-wide text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-violet-400 transition-all duration-300">
            Mayaz
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-slate-300 hover:text-white transition-colors relative group"
                onClick={(e) => {
                  if (link.href.startsWith('/#') && window.location.pathname === '/') {
                    e.preventDefault()
                    const id = link.href.replace('/#', '')
                    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
                    // Also update the URL without triggering a page reload
                    window.history.pushState(null, '', `/#${id}`)
                  }
                }}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-indigo-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Social icons + CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://github.com/mayazad"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="text-slate-400 hover:text-white transition-colors"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/md-mayaz-ad/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="text-slate-400 hover:text-white transition-colors"
          >
            <LinkedinIcon size={18} />
          </a>
          <Link
            href="/#contact"
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault()
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                window.history.pushState(null, '', `/#contact`)
              }
            }}
            className="ml-2 px-4 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25"
          >
            Hire Me
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden text-slate-300 hover:text-white transition-colors p-2"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } bg-[#13131a]/95 backdrop-blur-md border-b border-[rgba(99,102,241,0.15)]`}
      >
        <ul className="flex flex-col px-6 py-4 gap-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={(e) => {
                  setMobileOpen(false)
                  if (link.href.startsWith('/#') && window.location.pathname === '/') {
                    e.preventDefault()
                    const id = link.href.replace('/#', '')
                    // Small delay to allow the mobile menu to close before scrolling
                    setTimeout(() => {
                      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
                      window.history.pushState(null, '', `/#${id}`)
                    }, 50)
                  }
                }}
                className="text-slate-300 hover:text-white text-base transition-colors block py-1"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="flex items-center gap-5 pt-2 border-t border-[rgba(99,102,241,0.15)]">
            <a
              href="https://github.com/mayazad"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <GithubIcon size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/md-mayaz-ad/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <LinkedinIcon size={20} />
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
