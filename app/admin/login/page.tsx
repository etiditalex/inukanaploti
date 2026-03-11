'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase, supabaseUrl, hasRealSupabaseConfig } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { Shield, ArrowLeft, Wifi } from 'lucide-react'
import toast from 'react-hot-toast'

const anonKey = typeof process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === 'string' ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY : ''

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [testResult, setTestResult] = useState<string | null>(null)
  const [testing, setTesting] = useState(false)

  const handleTestConnection = async () => {
    setTesting(true)
    setTestResult(null)
    toast.loading('Testing connection…', { id: 'test-conn' })
    try {
      const url = `${supabaseUrl}/rest/v1/`
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          apikey: anonKey || 'placeholder',
          Authorization: `Bearer ${anonKey || 'placeholder'}`,
        },
      })
      let result: string
      if (res.ok) {
        result = 'Connection OK — Supabase reachable.'
        toast.success(result, { id: 'test-conn' })
      } else {
        const text = await res.text()
        result = `${res.status} ${res.statusText} — ${text.slice(0, 80)}`
        toast.error(result, { id: 'test-conn' })
      }
      setTestResult(result)
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      const result = `Failed: ${msg}`
      setTestResult(result)
      toast.error(result, { id: 'test-conn' })
    } finally {
      setTesting(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Please enter email and password')
      return
    }
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        const msg = error.message.toLowerCase()
        if (msg.includes('email not confirmed') || msg.includes('confirm your mail')) {
          toast.error('Email not confirmed. In Supabase Dashboard → Authentication → Users, open your user and use ⋮ → Confirm email.')
        } else if (msg.includes('invalid login') || msg.includes('invalid_credentials')) {
          toast.error('Wrong email or password. Use the exact email and password from Supabase → Authentication → Users.')
        } else {
          toast.error(error.message)
        }
        setLoading(false)
        return
      }
      if (data.session) {
        toast.success('Signed in')
        router.replace('/admin/listings')
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      if (message === 'Failed to fetch' || message.includes('fetch')) {
        toast.error(
          'Cannot reach Supabase. Check NEXT_PUBLIC_SUPABASE_URL and anon key in .env.local, then restart the dev server (npm run dev).'
        )
      } else {
        toast.error(message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <Link
        href="/"
        className="inline-flex items-center text-neutral-600 hover:text-primary-600 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to site
      </Link>
      <Card className="p-8">
        <div className="flex items-center gap-2 mb-6">
          <Shield className="w-8 h-8 text-primary-500" />
          <h1 className="text-2xl font-semibold text-neutral-900">Admin sign in</h1>
        </div>
        <p className="text-neutral-600 mb-6">
          Sign in to manage property listings. Changes will appear on the site after the next deploy.
        </p>
        <p className="text-sm text-neutral-500 mb-4">
          Use the email and password of a user created in Supabase: Dashboard → Authentication → Users. If you see &quot;Email not confirmed&quot; or &quot;Invalid login credentials&quot;, in Supabase open that user and use the three dots (⋮) → &quot;Confirm email&quot; so they can sign in.
        </p>
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-4 space-y-3 p-3 bg-neutral-100 rounded-lg">
            <p className="text-xs text-neutral-600 font-mono break-all">
              Supabase URL: {supabaseUrl}
              {!hasRealSupabaseConfig && ' (env not loaded — restart dev server)'}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <Button type="button" variant="outline" size="sm" onClick={handleTestConnection} disabled={testing}>
                <Wifi className="w-4 h-4 mr-1" />
                {testing ? 'Testing…' : 'Test connection'}
              </Button>
            </div>
            {testResult && (
              <p className={`text-sm font-mono p-2 rounded ${testResult.startsWith('Connection OK') ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                {testResult}
              </p>
            )}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              autoComplete="email"
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              disabled={loading}
            />
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      </Card>
    </div>
  )
}
