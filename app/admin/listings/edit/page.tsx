'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { EditListingForm } from '../[id]/edit/edit-form'
import { Button } from '@/components/ui/Button'

export default function AdminEditListingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  useEffect(() => {
    if (!id) {
      router.replace('/admin/listings')
    }
  }, [id, router])

  if (!id) {
    return (
      <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4">
        <p className="text-neutral-600">No listing selected.</p>
        <Button asChild variant="outline">
          <Link href="/admin/listings">Back to listings</Link>
        </Button>
      </div>
    )
  }

  return <EditListingForm id={id} />
}
