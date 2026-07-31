import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const envPath = path.join(__dirname, '..', '.env.local')
const envContent = fs.readFileSync(envPath, 'utf-8')
const env = Object.fromEntries(
  envContent.split('\n')
    .filter(l => l.includes('=') && !l.startsWith('#'))
    .map(l => l.split('=').map(s => s.trim()))
    .map(([k, ...v]) => [k, v.join('=')])
)

const SUPABASE_URL = env['NEXT_PUBLIC_SUPABASE_URL']
const SERVICE_ROLE_KEY = env['SUPABASE_SERVICE_ROLE_KEY']

const projects = [
  {
    title: 'GuildBoard',
    slug: 'guildboard',
    short_description: 'RPG-Themed Multi-Tenant Task Management Platform.',
    long_description: 'Transform your team into a guild. Complete quests. Earn XP. Rise through the ranks.\n\n### Features\n- **Guild System:** Create or join a guild using invite codes. Full multi-tenant data isolation.\n- **RPG Mechanics:** Earn experience and level up by completing real-world tasks.\n- **Role-Based Access:** Built with secure RLS policies in Supabase.',
    cover_image_url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop',
    tech_stack: ['React 19', 'Supabase', 'Express.js', 'Node.js', 'Vercel'],
    github_url: 'https://github.com/mayazad/guildboard-final',
    live_url: 'https://guildboard-final.vercel.app',
    is_featured: true,
    display_order: 1
  },
  {
    title: 'FloatBook AI',
    slug: 'floatbook-ai',
    short_description: 'A modern, transparent, always-on-top AI notebook for study assistance.',
    long_description: 'FloatBook is a modern, transparent, always-on-top AI notebook designed for seamless study assistance and note-taking. \n\nIt features a unique "Floating Orb" interface that stays out of your way until you need it.\n\n### Architecture\nThis project uses a secure dual-process architecture:\n1. **The Brain (Proxy Server):** Runs an Express server to handle Google Gemini API calls securely.\n2. **The Body (Electron App):** The visual window that you interact with.\n\n### Features\n- AI Tutor (Gemini Flash)\n- Contextual Awareness\n- Markdown Support\n- Screen Capture',
    cover_image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop',
    tech_stack: ['Electron', 'Express', 'JavaScript', 'Google Gemini AI', 'Markdown'],
    github_url: 'https://github.com/mayazad/floatBOOK',
    live_url: null,
    is_featured: true,
    display_order: 2
  },
  {
    title: 'Pomodoro Timer',
    slug: 'pomodoro-timer',
    short_description: 'A beautiful Pomodoro timer built with Python and Tkinter.',
    long_description: 'A productivity tracker built in Python. Designed to keep focus during long deep-learning training sessions or heavy coding blocks.\n\n### Features\n- Dark mode / Light mode toggle\n- Custom session names\n- Daily progress tracking via CSV data logging\n- Weekly productivity charts plotted with Matplotlib',
    cover_image_url: 'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?q=80&w=2076&auto=format&fit=crop',
    tech_stack: ['Python', 'Tkinter', 'Matplotlib', 'CSV'],
    github_url: 'https://github.com/mayazad/pomodoro-python-ad',
    live_url: null,
    is_featured: true,
    display_order: 3
  }
]

async function updateProjects() {
  console.log('Deleting old projects...')
  await fetch(`${SUPABASE_URL}/rest/v1/projects?id=not.is.null`, {
    method: 'DELETE',
    headers: {
      'apikey': SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`
    }
  })

  console.log('Inserting new projects...')
  
  const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`
    },
    body: JSON.stringify(projects)
  })

  if (insertRes.ok) {
    console.log('✅ Successfully updated live projects!')
  } else {
    const error = await insertRes.text()
    console.error('❌ Failed to update projects:', error)
  }
}

updateProjects()
