import { createClient } from '@/lib/supabase/server'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { FolderKanban, Star, MessageSquare } from 'lucide-react'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [
    { count: totalProjects },
    { count: featuredCount },
    { count: unreadCount },
  ] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('projects').select('*', { count: 'exact', head: true }).eq('is_featured', true),
    supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('is_read', false),
  ])

  const stats = [
    {
      label: 'Total Projects',
      value: totalProjects ?? 0,
      icon: FolderKanban,
      color: 'text-indigo-400',
      bg: 'bg-indigo-600/15',
    },
    {
      label: 'Featured Projects',
      value: featuredCount ?? 0,
      icon: Star,
      color: 'text-amber-400',
      bg: 'bg-amber-600/15',
    },
    {
      label: 'Unread Messages',
      value: unreadCount ?? 0,
      icon: MessageSquare,
      color: 'text-emerald-400',
      bg: 'bg-emerald-600/15',
    },
  ]

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="font-outfit text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-slate-400 text-sm mt-1">Overview of your portfolio content</p>
          </div>

          {/* Summary cards */}
          <div className="grid sm:grid-cols-3 gap-5 mb-10">
            {stats.map(({ label, value, icon: Icon, color, bg }) => (
              <div key={label} className="glass rounded-2xl p-6 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={22} className={color} />
                </div>
                <div>
                  <div className={`font-outfit text-3xl font-bold ${color}`}>{value}</div>
                  <div className="text-sm text-slate-400 mt-0.5">{label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick links */}
          <div className="glass rounded-2xl p-6">
            <h2 className="font-outfit font-semibold text-white mb-4">Quick Actions</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: 'Edit Profile', href: '/admin/profile' },
                { label: 'Add Project', href: '/admin/projects' },
                { label: 'View Messages', href: '/admin/messages' },
                { label: 'Manage Social Links', href: '/admin/social-links' },
              ].map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className="px-4 py-3 rounded-xl bg-white/5 hover:bg-indigo-600/15 border border-white/5 hover:border-indigo-500/20 text-sm text-slate-300 hover:text-white transition-all text-center font-medium"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Warning */}
          {(featuredCount ?? 0) > 6 && (
            <div className="mt-5 px-5 py-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm">
              ⚠️ You have <strong>{featuredCount}</strong> featured projects. The public site only shows 3–6. Consider unfeaturing some.
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
