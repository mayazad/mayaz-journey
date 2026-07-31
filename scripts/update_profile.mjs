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

const updatedProfile = {
  tagline: 'AI Engineer building intelligent models and machine learning systems',
  bio_short: 'Computer Science student and AI Engineer passionate about machine learning, deep learning, and building data-driven intelligent solutions.',
  bio_long: `I'm Md Adnan Hossain Mayaz, an AI Engineer based in Bangladesh. I specialize in Artificial Intelligence, Machine Learning, and Deep Learning.

I have strong hands-on expertise with Python and core data science libraries like NumPy and Pandas. My technical focus revolves around building and training advanced models using TensorFlow, and developing computer vision solutions such as the YOLO object detection model.

I love diving deep into data, training complex neural networks, and creating AI-driven applications that solve real-world problems. When I'm not training models, I'm keeping up with the latest AI research, contributing to projects, and constantly pushing myself to learn new techniques in this rapidly evolving field.`
}

async function updateLiveProfile() {
  console.log('Updating profile in live Supabase database...')
  
  const res = await fetch(`${SUPABASE_URL}/rest/v1/profile?full_name=not.is.null`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`
    },
    body: JSON.stringify(updatedProfile)
  })

  if (res.ok) {
    console.log('✅ Successfully updated live profile data!')
  } else {
    const error = await res.text()
    console.error('❌ Failed to update profile:', error)
  }
}

updateLiveProfile()
