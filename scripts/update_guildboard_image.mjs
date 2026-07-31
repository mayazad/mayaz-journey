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

async function updateLiveImage() {
  console.log('Updating GuildBoard image...')
  
  const res = await fetch(`${SUPABASE_URL}/rest/v1/projects?slug=eq.guildboard`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`
    },
    body: JSON.stringify({
      cover_image_url: 'https://image.thum.io/get/width/1200/crop/800/https://guildboard-final.vercel.app'
    })
  })

  if (res.ok) {
    console.log('✅ Successfully updated live project image!')
  } else {
    const error = await res.text()
    console.error('❌ Failed to update project image:', error)
  }
}

updateLiveImage()
