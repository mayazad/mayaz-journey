import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import ContactSection from '@/components/public/ContactSection'
import type { Profile } from '@/types'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Md Adnan Hossain Mayaz — open to new projects and opportunities.',
}

export default async function ContactPage() {
  const supabase = await createClient()
  const { data: profile } = await supabase.from('profile').select('*').single()

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen">
        <ContactSection profile={profile as Profile} />
      </main>
      <Footer />
    </>
  )
}
