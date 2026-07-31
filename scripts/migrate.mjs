#!/usr/bin/env node
// Run: node scripts/migrate.mjs
// Runs the DB migration against Supabase using the service role key

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Load env
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

// Split SQL into individual statements
const sql = fs.readFileSync(path.join(__dirname, '..', 'supabase/migrations/001_schema.sql'), 'utf-8')

// Execute each statement via the pg-meta internal API
async function runSQL(statement) {
  const trimmed = statement.trim()
  if (!trimmed || trimmed.startsWith('--')) return null

  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
    },
    body: JSON.stringify({ query: trimmed }),
  })
  return res
}

// Actually execute the SQL using the Supabase REST API (pgmeta endpoint)
async function migrate() {
  console.log('\n🚀 Mayaz Portfolio — Database Migration\n')
  console.log('Supabase URL:', SUPABASE_URL)
  console.log('Running SQL from supabase/migrations/001_schema.sql...')

  const res = await fetch(`${SUPABASE_URL}/rest/v1/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal',
        apikey: SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      },
      // Since it's a raw SQL script containing DDL, we use the postgres meta endpoint or just send it if the endpoint allows.
      // Wait, standard Supabase PostgREST doesn't allow raw SQL execution directly unless we have an RPC function set up.
      // But we can use the Supabase Postgres Meta API if we have the password, which we don't.
      // If we only have anon/service_role keys, we cannot execute arbitrary DDL queries through the REST API.
      // We must instruct the user to run it via the dashboard.
  });
}

console.log('\n🚀 Mayaz Portfolio — Database Migration\n')
console.log('Supabase URL:', SUPABASE_URL)
console.log('\n📋 SQL Migration file is ready at:')
console.log('   supabase/migrations/001_schema.sql\n')
console.log('To run the migration:')
console.log('1. Go to: https://supabase.com/dashboard/project/zubsvwcqekrizyqotkkg/sql/new')
console.log('2. Paste the contents of supabase/migrations/001_schema.sql')
console.log('3. Click "Run"\n')
console.log('The migration creates 4 tables: profile, projects, social_links, contact_messages')
console.log('It also sets up RLS policies and seeds your initial profile data.\n')

