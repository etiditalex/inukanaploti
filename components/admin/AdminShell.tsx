'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import {
  LayoutDashboard,
  Home,
  FileText,
  BookOpen,
  MessageSquare,
  LogOut,
  ChevronRight,
  ExternalLink,
} from 'lucide-react'

export const adminNavItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Listings', href: '/admin/listings', icon: FileText },
  { label: 'Blogs', href: '/admin/blogs', icon: BookOpen },
  { label: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
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

  const logoUrl = 'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758705419/inukanaploti_logo_v7btur.jpg'

  return (
    <div className="min-h-screen bg-neutral-100 flex">
      {/* Sidebar */}
      <aside className="w-56 lg:w-64 flex-shrink-0 border-r border-primary-700/50 bg-primary-600 fixed left-0 top-0 bottom-0 z-30 flex flex-col shadow-sm">
        <div className="flex-shrink-0 p-3 border-b border-primary-500/50">
          <Link href="/admin" className="flex items-center gap-2 w-full" aria-label="Inuka na Ploti - Admin">
            <img
              src={logoUrl}
              alt=""
              className="h-10 w-auto object-contain flex-shrink-0"
            />
            <span className="text-white font-semibold text-sm leading-tight">Inuka na Ploti dashboard</span>
          </Link>
        </div>
        <div className="p-4 border-b border-primary-500/50">
          <Link href="/admin" className="flex items-center gap-2 text-white font-semibold">
            <LayoutDashboard className="w-5 h-5 text-primary-200" />
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
                    ? 'bg-primary-500 text-white'
                    : 'text-primary-100 hover:bg-primary-500/50 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="flex-1">{item.label}</span>
                <ChevronRight className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-primary-300'}`} />
              </Link>
            )
          })}
        </nav>
        <div className="p-3 border-t border-primary-500/50 space-y-0.5">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-primary-100 hover:bg-primary-500/50 hover:text-white"
          >
            <Home className="w-5 h-5" />
            View site
            <ExternalLink className="w-4 h-4 ml-auto" />
          </a>
          <button
            type="button"
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-primary-100 hover:bg-primary-500/50 hover:text-red-200"
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
