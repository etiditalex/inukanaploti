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
  Menu,
  X,
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
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const isLoginPage = pathname?.startsWith('/admin/login')

  // Close mobile sidebar when route changes
  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

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

  const navContent = (
    <>
      <div className="flex-shrink-0 p-3 border-b border-primary-500/50 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2 min-w-0" aria-label="Inuka na Ploti - Admin">
          <img src={logoUrl} alt="" className="h-10 w-auto object-contain flex-shrink-0" />
          <span className="text-white font-semibold text-sm leading-tight truncate">Inuka na Ploti dashboard</span>
        </Link>
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="md:hidden p-2 -mr-2 rounded-lg text-primary-100 hover:bg-primary-500/50 hover:text-white touch-manipulation"
          aria-label="Close menu"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className="p-4 border-b border-primary-500/50">
        <Link href="/admin" className="flex items-center gap-2 text-white font-semibold py-2">
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
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors min-h-[44px] touch-manipulation ${
                isActive ? 'bg-primary-500 text-white' : 'text-primary-100 hover:bg-primary-500/50 hover:text-white'
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
          className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-primary-100 hover:bg-primary-500/50 hover:text-white min-h-[44px] touch-manipulation"
        >
          <Home className="w-5 h-5" />
          View site
          <ExternalLink className="w-4 h-4 ml-auto" />
        </a>
        <button
          type="button"
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 px-3 py-3 rounded-lg text-sm text-primary-100 hover:bg-primary-500/50 hover:text-red-200 min-h-[44px] touch-manipulation text-left"
        >
          <LogOut className="w-5 h-5" />
          Sign out
        </button>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-neutral-100 flex">
      {/* Mobile overlay when sidebar open */}
      <button
        type="button"
        aria-label="Close menu"
        className={`fixed inset-0 z-30 bg-black/50 transition-opacity md:hidden ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar: drawer on mobile, fixed on desktop */}
      <aside
        className={`fixed left-0 top-0 bottom-0 z-40 w-72 max-w-[85vw] flex-shrink-0 border-r border-primary-700/50 bg-primary-600 flex flex-col shadow-lg transition-transform duration-200 ease-out md:translate-x-0 md:w-56 lg:w-64 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {navContent}
      </aside>

      {/* Mobile top bar */}
      <header className="fixed top-0 left-0 right-0 h-14 z-20 bg-primary-600 border-b border-primary-500/50 flex items-center gap-3 px-4 md:hidden">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="p-2 -ml-2 rounded-lg text-white hover:bg-primary-500/50 touch-manipulation"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        <span className="text-white font-semibold truncate">Admin</span>
      </header>

      {/* Main content */}
      <main className="flex-1 min-w-0 pl-0 pt-14 md:pl-56 md:pt-20 lg:pl-64 bg-neutral-100 admin-dark">
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
