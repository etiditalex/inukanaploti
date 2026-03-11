import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

function loadEnvLocal(): void {
  const candidates = [
    path.join(process.cwd(), '.env.local'),
    path.join(process.cwd(), '..', '.env.local'),
  ]
  for (const envPath of candidates) {
    if (!fs.existsSync(envPath)) continue
    let content = fs.readFileSync(envPath, 'utf8')
    content = content.replace(/^\uFEFF/, '') // strip BOM
    content.split(/\r?\n/).forEach((line) => {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) return
      const eq = trimmed.indexOf('=')
      if (eq <= 0) return
      const key = trimmed.slice(0, eq).trim().replace(/^\uFEFF/, '')
      const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '')
      if (key) process.env[key] = value
    })
    return
  }
}

const FALLBACK_URL = 'https://yjnpklcujukqqogsqjqx.supabase.co'
const FALLBACK_ANON_KEY = 'sb_publishable_mZPUlhFbhwIBf9KXrVT5Hg_s0Ce009T'

export async function GET() {
  loadEnvLocal()
  const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_URL).trim()
  const SUPABASE_ANON_KEY = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || FALLBACK_ANON_KEY).trim()

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    const cwd = process.cwd()
    const envPath = path.join(cwd, '.env.local')
    const exists = fs.existsSync(envPath)
    return NextResponse.json(
      {
        ok: false,
        error: 'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY',
        debug: { cwd, envPath, fileExists: exists },
      },
      { status: 500 }
    )
  }

  try {
    // Test table access (anon key). Do not use /rest/v1/ root — that requires service role.
    const res = await fetch(`${SUPABASE_URL}/rest/v1/listings?select=id&limit=1`, {
      method: 'GET',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
    })

    if (res.ok) {
      return NextResponse.json({ ok: true, message: 'Connection OK — Supabase reachable and listings table accessible.' })
    }

    const text = await res.text()
    if (res.status === 401 && text.includes('schema is forbidden')) {
      return NextResponse.json({
        ok: false,
        status: 401,
        message: 'Table access denied. Run the RLS policies in supabase/listings-schema.sql (see file comments).',
      })
    }
    return NextResponse.json({
      ok: false,
      status: res.status,
      statusText: res.statusText,
      message: `${res.status} ${res.statusText} — ${text.slice(0, 120)}`,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json(
      { ok: false, error: 'Failed to fetch', message },
      { status: 502 }
    )
  }
}
