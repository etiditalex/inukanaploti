'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Card } from '@/components/ui/Card'
import { Listing } from '@/types/listing'
import { ListingRow, rowToListing, listingToRow } from '@/lib/listings-data'
import { ImageUpload } from '@/components/admin/ImageUpload'
import { MapPicker } from '@/components/admin/MapPicker'
import { ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'

export function EditListingForm({ id }: { id: string }) {
  const router = useRouter()
  const [listing, setListing] = useState<Partial<Listing> | null>(null)
  const [featuresText, setFeaturesText] = useState('')
  const [amenitiesText, setAmenitiesText] = useState('')
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    const checkAndFetch = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.replace('/admin/login')
        return
      }
      if (!id) {
        setFetching(false)
        return
      }
      const { data, error } = await supabase.from('listings').select('*').eq('id', id).single()
      if (error || !data) {
        toast.error('Listing not found')
        setFetching(false)
        return
      }
      const l = rowToListing(data as ListingRow)
      setListing(l)
      setFeaturesText((l.features || []).join('\n'))
      setAmenitiesText((l.amenities || []).join('\n'))
      setImageUrls(l.images ?? [])
      setFetching(false)
    }
    checkAndFetch()
  }, [id, router])

  const update = (key: keyof Listing, value: unknown) => {
    setListing((prev) => (prev ? { ...prev, [key]: value } : null))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!listing?.id) return
    const slug = (listing.slug || listing.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || '').trim()
    const features = featuresText.split('\n').map((s) => s.trim()).filter(Boolean)
    const amenities = amenitiesText.split('\n').map((s) => s.trim()).filter(Boolean)
    const images = imageUrls
    const payload = { ...listing, slug, features, amenities, images, mapLocations: listing.mapLocations ?? [] }
    const row = listingToRow(payload)
    const dbRow = {
      ...row,
      updated_at: new Date().toISOString(),
    }
    setLoading(true)
    const { error } = await supabase.from('listings').update(dbRow).eq('id', listing.id)
    setLoading(false)
    if (error) {
      toast.error(error.message)
      return
    }
    toast.success('Listing updated')
    router.replace('/admin/listings')
  }

  if (fetching || !listing) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <p className="text-neutral-600">{fetching ? 'Loading...' : 'Listing not found.'}</p>
      </div>
    )
  }

  return (
    <div>
      <Link href="/admin/listings" className="inline-flex items-center text-neutral-600 hover:text-primary-600 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to listings
      </Link>
      <h1 className="text-2xl font-semibold text-neutral-900 mb-6">Edit listing</h1>
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Title *</label>
              <Input
                value={listing.title || ''}
                onChange={(e) => update('title', e.target.value)}
                placeholder="e.g. Diani Plots - Galu Area"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Slug (URL)</label>
              <Input
                value={listing.slug || ''}
                onChange={(e) => update('slug', e.target.value)}
                placeholder="diani-galu"
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Price (KES) *</label>
              <Input
                type="number"
                value={listing.priceKES ?? ''}
                onChange={(e) => update('priceKES', parseInt(e.target.value) || 0)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Size (e.g. 1/8)</label>
              <Input
                value={listing.sizeAcres || ''}
                onChange={(e) => update('sizeAcres', e.target.value)}
                placeholder="1/8"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Location *</label>
            <Input
              value={listing.location || ''}
              onChange={(e) => update('location', e.target.value)}
              placeholder="Galu, Diani"
              required
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Latitude</label>
              <Input
                type="number"
                step="any"
                value={listing.coords?.lat ?? ''}
                onChange={(e) => update('coords', { ...(listing.coords || { lat: 0, lng: 0 }), lat: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Longitude</label>
              <Input
                type="number"
                step="any"
                value={listing.coords?.lng ?? ''}
                onChange={(e) => update('coords', { ...(listing.coords || { lat: 0, lng: 0 }), lng: parseFloat(e.target.value) || 0 })}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Status</label>
            <select
              value={listing.status || 'available'}
              onChange={(e) => update('status', e.target.value as 'available' | 'sold')}
              className="w-full px-4 py-3 border border-neutral-300 rounded-xl"
            >
              <option value="available">Available</option>
              <option value="sold">Sold</option>
            </select>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Deposit (KES)</label>
              <Input
                type="number"
                value={listing.paymentPlan?.depositKES ?? ''}
                onChange={(e) => update('paymentPlan', { ...listing.paymentPlan, depositKES: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Payment months</label>
              <Input
                type="number"
                value={listing.paymentPlan?.months ?? ''}
                onChange={(e) => update('paymentPlan', { ...listing.paymentPlan, months: parseInt(e.target.value) || 12 })}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Short description</label>
            <Textarea
              value={listing.shortDescription || ''}
              onChange={(e) => update('shortDescription', e.target.value)}
              rows={2}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Long description</label>
            <Textarea
              value={listing.longDescription || ''}
              onChange={(e) => update('longDescription', e.target.value)}
              rows={4}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Features (one per line)</label>
            <Textarea
              value={featuresText}
              onChange={(e) => setFeaturesText(e.target.value)}
              rows={4}
              placeholder="Just 1.5KM to the Beach"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Amenities (one per line)</label>
            <Textarea
              value={amenitiesText}
              onChange={(e) => setAmenitiesText(e.target.value)}
              rows={3}
              placeholder="Beach proximity"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Map locations</label>
            <p className="text-sm text-neutral-500 mb-2">Add pins for this listing on the project map. Click the map to add a location.</p>
            <MapPicker value={listing.mapLocations ?? []} onChange={(mapLocations) => setListing((p) => (p ? { ...p, mapLocations } : null))} disabled={loading} />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Images (upload from device)</label>
            <ImageUpload value={imageUrls} onChange={setImageUrls} disabled={loading} />
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save changes'}
            </Button>
            <Link href="/admin/listings">
              <Button type="button" variant="outline">Cancel</Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  )
}
