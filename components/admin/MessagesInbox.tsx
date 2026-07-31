'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { MailOpen, Mail, Trash2 } from 'lucide-react'
import type { ContactMessage } from '@/types'

function timeAgo(date: string) {
  const secs = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
  if (secs < 60) return 'just now'
  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`
  if (secs < 86400) return `${Math.floor(secs / 3600)}h ago`
  return `${Math.floor(secs / 86400)}d ago`
}

export default function MessagesInbox({ initialMessages }: { initialMessages: ContactMessage[] }) {
  const [messages, setMessages] = useState(initialMessages)
  const [selected, setSelected] = useState<ContactMessage | null>(null)
  const supabase = createClient()

  async function markRead(id: string) {
    await supabase.from('contact_messages').update({ is_read: true }).eq('id', id)
    setMessages(prev => prev.map(m => m.id === id ? { ...m, is_read: true } : m))
  }

  async function deleteMsg(id: string) {
    if (!confirm('Delete this message?')) return
    await supabase.from('contact_messages').delete().eq('id', id)
    setMessages(prev => prev.filter(m => m.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  async function handleSelect(msg: ContactMessage) {
    setSelected(msg)
    if (!msg.is_read) markRead(msg.id)
  }

  const unreadCount = messages.filter(m => !m.is_read).length

  return (
    <div className="flex gap-6 h-[calc(100vh-4rem)]">
      {/* List */}
      <div className="w-80 flex-shrink-0 flex flex-col">
        <div className="mb-4">
          <h1 className="font-outfit text-2xl font-bold text-white">Messages</h1>
          <p className="text-slate-400 text-sm mt-1">
            {messages.length} total · {unreadCount} unread
          </p>
        </div>
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {messages.length === 0 ? (
            <div className="glass rounded-2xl py-16 text-center text-slate-500 text-sm">No messages yet.</div>
          ) : (
            messages.map(msg => (
              <button
                key={msg.id}
                onClick={() => handleSelect(msg)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  selected?.id === msg.id
                    ? 'glass border-indigo-500/40 bg-indigo-600/10'
                    : 'glass border-transparent hover:border-white/10'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className={`text-sm font-medium truncate ${msg.is_read ? 'text-slate-300' : 'text-white'}`}>
                    {msg.name}
                  </span>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {!msg.is_read && <span className="w-2 h-2 rounded-full bg-indigo-500" />}
                    <span className="text-xs text-slate-500">{timeAgo(msg.created_at)}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 truncate">{msg.message}</p>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Detail */}
      <div className="flex-1 min-w-0">
        {selected ? (
          <div className="glass rounded-2xl p-6 sm:p-8 h-full flex flex-col">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="font-outfit text-xl font-bold text-white">{selected.name}</h2>
                <a href={`mailto:${selected.email}`} className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                  {selected.email}
                </a>
                <p className="text-xs text-slate-500 mt-1">{new Date(selected.created_at).toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2">
                {!selected.is_read ? (
                  <button
                    onClick={() => markRead(selected.id)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/10 text-slate-400 hover:text-white text-xs transition-colors"
                  >
                    <MailOpen size={13} /> Mark read
                  </button>
                ) : (
                  <span className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Mail size={13} /> Read
                  </span>
                )}
                <button
                  onClick={() => deleteMsg(selected.id)}
                  className="p-2 rounded-lg border border-white/10 text-slate-500 hover:text-red-400 hover:border-red-500/20 transition-colors"
                  aria-label="Delete message"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <div className="flex-1 text-slate-300 text-sm leading-relaxed whitespace-pre-wrap border-t border-white/5 pt-6">
              {selected.message}
            </div>
            <div className="mt-4 pt-4 border-t border-white/5">
              <a
                href={`mailto:${selected.email}?subject=Re: Portfolio Contact`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-all hover:shadow-lg hover:shadow-indigo-500/25 min-h-[44px]"
              >
                Reply via Email →
              </a>
            </div>
          </div>
        ) : (
          <div className="glass rounded-2xl h-full flex items-center justify-center text-slate-500 text-sm">
            Select a message to read it
          </div>
        )}
      </div>
    </div>
  )
}
