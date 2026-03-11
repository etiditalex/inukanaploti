const path = require('path')
const fs = require('fs')

// Force-load .env.local from same directory as this config file
const envPath = path.join(__dirname, '.env.local')
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8').replace(/^\uFEFF/, '')
  content.split(/\r?\n/).forEach((line) => {
    const t = line.trim()
    if (!t || t.startsWith('#')) return
    const eq = t.indexOf('=')
    if (eq > 0) {
      const key = t.slice(0, eq).trim()
      const value = t.slice(eq + 1).trim().replace(/^["']|["']$/g, '')
      if (key.startsWith('NEXT_PUBLIC_')) process.env[key] = value
    }
  })
}

// Fallback when .env.local doesn't load. For production use Vercel env vars (no need to remove fallbacks; anon key is public).
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yjnpklcujukqqogsqjqx.supabase.co'
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_mZPUlhFbhwIBf9KXrVT5Hg_s0Ce009T'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_SUPABASE_URL: SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: SUPABASE_ANON_KEY,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dyfnobo9r/image/upload/**',
      },
      {
        protocol: 'https',
        hostname: 'yjnpklcujukqqogsqjqx.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}

module.exports = nextConfig
