'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { LayoutDashboard, FileText, ArrowRight } from 'lucide-react'

export default function AdminPage() {
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.replace('/admin/login')
        return
      }
      setChecking(false)
    }
    check()
  }, [router])

  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <p className="text-neutral-600">Loading...</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-semibold text-neutral-900 mb-2">Dashboard</h1>
      <p className="text-neutral-600 mb-6 sm:mb-8 text-sm sm:text-base">
        Welcome to the admin panel. Use the menu to manage content.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-4 sm:p-6 hover:border-primary-200 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-primary-600" />
            </div>
            <h2 className="font-semibold text-neutral-900">Listings</h2>
          </div>
          <p className="text-sm text-neutral-600 mb-4">
            Add, edit, or remove property listings. Changes appear on the site after the next deploy.
          </p>
          <Button variant="outline" size="sm" className="min-h-[44px] touch-manipulation" asChild>
            <Link href="/admin/listings">
              Manage listings
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </Card>
        {/* Add more feature cards here as you build them, e.g. Settings, Enquiries, etc. */}
      </div>
    </div>
  )
}
