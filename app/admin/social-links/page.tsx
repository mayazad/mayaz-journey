import { createClient } from '@/lib/supabase/server'
import AdminSidebar from '@/components/admin/AdminSidebar'
import SocialLinksManager from '@/components/admin/SocialLinksManager'
import type { SocialLink } from '@/types'

export default async function AdminSocialLinksPage() {
  const supabase = await createClient()
  const { data } = await supabase.from('social_links').select('*').order('display_order', { ascending: true })

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <SocialLinksManager initialLinks={(data as SocialLink[]) || []} />
      </main>
    </div>
  )
}
