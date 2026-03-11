'use client'

import Link from 'next/link'
import { Listing } from '@/types/listing'
import { ListingsMap } from '@/components/ListingsMap'
import { ArrowLeft, MapPin } from 'lucide-react'

export function MapPageClient({ listings }: { listings: Listing[] }) {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/"
          className="inline-flex items-center text-neutral-600 hover:text-primary-600 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to home
        </Link>
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="w-6 h-6 text-primary-500" />
          <h1 className="text-2xl font-semibold text-neutral-900">Map</h1>
        </div>
        <p className="text-neutral-600 mb-8 max-w-2xl">
          View listing locations. Add or edit map pins when creating or editing a listing in the admin.
        </p>
        <ListingsMap listings={listings} />
      </div>
    </div>
  )
}
