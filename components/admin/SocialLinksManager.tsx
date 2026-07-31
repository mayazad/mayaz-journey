'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Trash2, ChevronUp, ChevronDown, CheckCircle } from 'lucide-react'
import type { SocialLink } from '@/types'

const PLATFORM_ICONS: Record<string, string> = {
  github: 'GitHub',
  linkedin: 'LinkedIn',
  twitter: 'Twitter / X',
  instagram: 'Instagram',
  youtube: 'YouTube',
  website: 'Website',
  email: 'Email',
}

export default function SocialLinksManager({ initialLinks }: { initialLinks: SocialLink[] }) {
  const [links, setLinks] = useState(initialLinks)
  const [adding, setAdding] = useState(false)
  const [newPlatform, setNewPlatform] = useState('github')
  const [newUrl, setNewUrl] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const supabase = createClient()

  async function refresh() {
    const { data } = await supabase.from('social_links').select('*').order('display_order', { ascending: true })
    setLinks((data as SocialLink[]) || [])
  }

  async function addLink() {
    if (!newUrl.trim()) return
    setSaving(true)
    const maxOrder = links.reduce((m, l) => Math.max(m, l.display_order), 0)
    await supabase.from('social_links').insert({ platform: newPlatform, url: newUrl.trim(), display_order: maxOrder + 1 })
    setNewPlatform('github')
    setNewUrl('')
    setAdding(false)
    setSaving(false)
    await refresh()
  }

  async function deleteLink(id: string) {
    await supabase.from('social_links').delete().eq('id', id)
    await refresh()
  }

  async function updateUrl(id: string, url: string) {
    await supabase.from('social_links').update({ url }).eq('id', id)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  async function move(id: string, dir: 'up' | 'down') {
    const idx = links.findIndex(l => l.id === id)
    const swapIdx = dir === 'up' ? idx - 1 : idx + 1
    if (swapIdx < 0 || swapIdx >= links.length) return
    const a = links[idx]; const b = links[swapIdx]
    await Promise.all([
      supabase.from('social_links').update({ display_order: b.display_order }).eq('id', a.id),
      supabase.from('social_links').update({ display_order: a.display_order }).eq('id', b.id),
    ])
    await refresh()
  }

  const inputCls = 'w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm'

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-outfit text-2xl font-bold text-white">Social Links</h1>
          <p className="text-slate-400 text-sm mt-1">Manage links shown in navbar and footer</p>
        </div>
        {saved && (
          <span className="flex items-center gap-1.5 text-emerald-400 text-sm">
            <CheckCircle size={15} /> Saved
          </span>
        )}
      </div>

      {/* Existing links */}
      <div className="space-y-3">
        {links.length === 0 && !adding && (
          <div className="glass rounded-2xl py-12 text-center text-slate-500 text-sm">
            No social links yet.
          </div>
        )}
        {links.map((link, idx) => (
          <div key={link.id} className="glass rounded-xl px-4 py-3 flex items-center gap-3">
            <div className="flex flex-col gap-1">
              <button onClick={() => move(link.id, 'up')} disabled={idx === 0} className="text-slate-600 hover:text-white disabled:opacity-20 transition-colors"><ChevronUp size={14} /></button>
              <button onClick={() => move(link.id, 'down')} disabled={idx === links.length - 1} className="text-slate-600 hover:text-white disabled:opacity-20 transition-colors"><ChevronDown size={14} /></button>
            </div>
            <span className="w-24 text-xs text-slate-400 capitalize flex-shrink-0">{PLATFORM_ICONS[link.platform] || link.platform}</span>
            <input
              defaultValue={link.url}
              onBlur={(e) => updateUrl(link.id, e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <button onClick={() => deleteLink(link.id)} className="text-slate-500 hover:text-red-400 transition-colors p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Add new */}
      {adding ? (
        <div className="glass rounded-2xl p-5 border border-indigo-500/20 space-y-4">
          <h3 className="text-sm font-medium text-white">Add New Link</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1.5">Platform</label>
              <select
                value={newPlatform}
                onChange={(e) => setNewPlatform(e.target.value)}
                className={inputCls}
              >
                {Object.entries(PLATFORM_ICONS).map(([k, v]) => (
                  <option key={k} value={k} className="bg-[#13131a]">{v}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5">URL</label>
              <input value={newUrl} onChange={(e) => setNewUrl(e.target.value)} className={inputCls} placeholder="https://..." />
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={addLink} disabled={saving} className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-all disabled:opacity-60 min-h-[44px]">
              {saving ? 'Adding...' : 'Add Link'}
            </button>
            <button onClick={() => setAdding(false)} className="px-5 py-2.5 rounded-xl border border-white/10 text-slate-400 hover:text-white text-sm transition-colors min-h-[44px]">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-xl border border-dashed border-white/15 hover:border-indigo-500/40 text-slate-400 hover:text-white text-sm transition-all min-h-[44px]"
        >
          <Plus size={15} /> Add Social Link
        </button>
      )}
    </div>
  )
}
