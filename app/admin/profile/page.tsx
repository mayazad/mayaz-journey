import { createClient } from '@/lib/supabase/server'
import AdminSidebar from '@/components/admin/AdminSidebar'
import ProfileEditor from '@/components/admin/ProfileEditor'
import type { Profile } from '@/types'

export default async function AdminProfilePage() {
  const supabase = await createClient()
  const { data: profile } = await supabase.from('profile').select('*').single()

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="font-outfit text-2xl font-bold text-white">Profile Editor</h1>
            <p className="text-slate-400 text-sm mt-1">Update your bio, contact info, photo, and resume</p>
          </div>
          {profile ? (
            <div className="glass rounded-2xl p-6 sm:p-8">
              <ProfileEditor profile={profile as Profile} />
            </div>
          ) : (
            <p className="text-slate-500">No profile data found. Run the SQL migration first.</p>
          )}
        </div>
      </main>
    </div>
  )
}
