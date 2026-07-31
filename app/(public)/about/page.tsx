import type { Metadata } from 'next'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import type { Profile } from '@/types'

export const metadata: Metadata = {
  title: 'About Me',
  description: 'Learn more about Md Adnan Hossain Mayaz — full-stack developer, his background, skills, and what drives him.',
}

const skills = [
  { category: 'Frontend', items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
  { category: 'Backend', items: ['Node.js', 'Express', 'PostgreSQL', 'Supabase', 'REST APIs'] },
  { category: 'Tools', items: ['Git', 'GitHub', 'VS Code', 'Figma', 'Vercel'] },
  { category: 'Learning', items: ['Python', 'Docker', 'AWS', 'GraphQL'] },
]

export default async function AboutPage() {
  const supabase = await createClient()
  const { data: profile } = await supabase.from('profile').select('*').single()
  const p = profile as Profile | null

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="mb-16">
            <p className="text-indigo-400 text-sm font-medium uppercase tracking-widest mb-3">About me</p>
            <h1 className="font-outfit text-4xl sm:text-5xl font-bold text-white mb-8">
              The person behind the <span className="gradient-text">code</span>
            </h1>

            <div className="grid md:grid-cols-3 gap-10 items-start">
              {/* Photo */}
              <div className="flex justify-center md:justify-start">
                <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border border-indigo-500/20 shadow-xl shadow-indigo-500/10">
                  {p?.profile_photo_url ? (
                    <Image
                      src={p.profile_photo_url}
                      alt={`${p.full_name} profile photo`}
                      fill
                      sizes="224px"
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-violet-700 flex items-center justify-center">
                      <span className="text-5xl font-outfit font-bold text-white/90">M</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bio */}
              <div className="md:col-span-2">
                <div className="space-y-4">
                  {(p?.bio_long || '').split('\n\n').map((para, i) => (
                    <p key={i} className="text-slate-300 leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <section>
            <h2 className="font-outfit text-2xl font-bold text-white mb-8">
              Skills &amp; Technologies
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {skills.map((group) => (
                <div key={group.category} className="glass rounded-2xl p-5">
                  <h3 className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">
                    {group.category}
                  </h3>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
