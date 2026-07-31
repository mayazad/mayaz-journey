import { createClient } from '@/lib/supabase/server'
import AdminSidebar from '@/components/admin/AdminSidebar'
import MessagesInbox from '@/components/admin/MessagesInbox'
import type { ContactMessage } from '@/types'

export default async function AdminMessagesPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-hidden">
        <MessagesInbox initialMessages={(data as ContactMessage[]) || []} />
      </main>
    </div>
  )
}
