import { createClient } from '@/lib/supabase/server'
import Navbar from '@/components/public/Navbar'
import Hero from '@/components/public/Hero'
import AboutSection from '@/components/public/AboutSection'
import FeaturedProjects from '@/components/public/FeaturedProjects'
import ContactSection from '@/components/public/ContactSection'
import Footer from '@/components/public/Footer'
import type { Profile, Project } from '@/types'

export default async function HomePage() {
  const supabase = await createClient()

  const [{ data: profileData }, { data: projectsData }] = await Promise.all([
    supabase.from('profile').select('*').single(),
    supabase
      .from('projects')
      .select('*')
      .eq('is_featured', true)
      .order('display_order', { ascending: true })
      .limit(6),
  ])

  const profile = profileData as Profile | null
  const projects = (projectsData as Project[]) || []

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        <p>Portfolio is being set up. Check back soon!</p>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero profile={profile} />
        <AboutSection profile={profile} />
        <FeaturedProjects projects={projects} />
        <ContactSection profile={profile} />
      </main>
      <Footer />
    </>
  )
}
