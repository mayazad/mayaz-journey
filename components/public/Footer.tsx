import Link from 'next/link'
import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/icons/SocialIcons'

const navLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Contact', href: '/#contact' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <Link href="/" className="font-outfit text-xl font-bold text-white">
              Mayaz<span className="text-indigo-500">.</span>
            </Link>
            <p className="mt-3 text-sm text-slate-500 leading-relaxed max-w-xs">
              AI Engineer building intelligent models and data-driven solutions. Open to
              collaborations and new opportunities.
            </p>
          </div>

          {/* Quick nav */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
              Connect
            </h3>
            <div className="space-y-2.5">
              <a
                href="mailto:officialmayazad@gmail.com"
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors group"
              >
                <Mail size={14} className="text-indigo-500 group-hover:text-indigo-400" />
                officialmayazad@gmail.com
              </a>
              <a
                href="https://github.com/mayazad"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors group"
              >
              <GithubIcon size={14} className="text-indigo-500 group-hover:text-indigo-400" />
                github.com/mayazad
              </a>
              <a
                href="https://www.linkedin.com/in/md-mayaz-ad/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors group"
              >
              <LinkedinIcon size={14} className="text-indigo-500 group-hover:text-indigo-400" />
                LinkedIn Profile
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Md Adnan Hossain Mayaz. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/mayazad"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-slate-600 hover:text-indigo-400 transition-colors"
            >
            <GithubIcon size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/md-mayaz-ad/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-slate-600 hover:text-indigo-400 transition-colors"
            >
            <LinkedinIcon size={16} />
            </a>
            <a
              href="mailto:officialmayazad@gmail.com"
              aria-label="Email"
              className="text-slate-600 hover:text-indigo-400 transition-colors"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
