'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import {
  LayoutDashboard,
  Home,
  FileText,
  LogOut,
  ChevronRight,
  ExternalLink,
} from 'lucide-react'

export const adminNavItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Listings', href: '/admin/listings', icon: FileText },
]

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [session, setSession] = useState<boolean | null>(null)

  const isLoginPage = pathname?.startsWith('/admin/login')

  useEffect(() => {
    if (isLoginPage) {
      setSession(null)
      return
    }
    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(!!session)
      if (!session) router.replace('/admin/login')
    }
    check()
  }, [isLoginPage, router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.replace('/admin/login')
  }

  if (isLoginPage) {
    return <div className="min-h-screen bg-neutral-100 pt-20 admin-dark">{children}</div>
  }

  if (session === null) {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
        <p className="text-neutral-600">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-100 flex">
      {/* Sidebar */}
      <aside className="w-56 lg:w-64 flex-shrink-0 border-r border-neutral-400/50 bg-neutral-300 fixed left-0 top-0 bottom-0 z-30 flex flex-col pt-20 shadow-sm">
        <div className="p-4 border-b border-neutral-400/50">
          <Link href="/admin" className="flex items-center gap-2 text-neutral-900 font-semibold">
            <LayoutDashboard className="w-5 h-5 text-primary-600" />
            Admin
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {adminNavItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href))
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-500/25 text-primary-800'
                    : 'text-neutral-700 hover:bg-neutral-400/50 hover:text-neutral-900'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="flex-1">{item.label}</span>
                <ChevronRight className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-primary-600' : 'text-neutral-500'}`} />
              </Link>
            )
          })}
        </nav>
        <div className="p-3 border-t border-neutral-400/50 space-y-0.5">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-neutral-700 hover:bg-neutral-400/50 hover:text-neutral-900"
          >
            <Home className="w-5 h-5" />
            View site
            <ExternalLink className="w-4 h-4 ml-auto" />
          </a>
          <button
            type="button"
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-neutral-700 hover:bg-neutral-400/50 hover:text-red-700"
          >
            <LogOut className="w-5 h-5" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 pl-56 lg:pl-64 pt-20 bg-neutral-100 admin-dark">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
