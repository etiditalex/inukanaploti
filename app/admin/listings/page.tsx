'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Listing } from '@/types/listing'
import { ListingRow, rowToListing } from '@/lib/listings-data'
import { Plus, Pencil, Trash2, ExternalLink } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminListingsPage() {
  const router = useRouter()
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    const checkAndFetch = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.replace('/admin/login')
        return
      }
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) {
        toast.error('Failed to load listings. Is Supabase configured?')
        setListings([])
      } else {
        setListings((data as ListingRow[]).map(rowToListing))
      }
      setLoading(false)
    }
    checkAndFetch()
  }, [router])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this listing? This cannot be undone.')) return
    setDeletingId(id)
    const { error } = await supabase.from('listings').delete().eq('id', id)
    setDeletingId(null)
    if (error) {
      toast.error(error.message)
      return
    }
    setListings((prev) => prev.filter((l) => l.id !== id))
    toast.success('Listing deleted')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <p className="text-neutral-600">Loading listings...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-4 mb-6">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-semibold text-neutral-900">Property listings</h1>
          <p className="text-neutral-600 mt-1 text-sm sm:text-base">
            Changes are saved to the database. The public site updates on the next deploy.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/listings" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="min-h-[44px] touch-manipulation">
              <ExternalLink className="w-4 h-4 mr-2" />
              View public listings
            </Button>
          </Link>
          <Link href="/admin/listings/new">
            <Button size="sm" className="min-h-[44px] touch-manipulation">
              <Plus className="w-4 h-4 mr-2" />
              Add listing
            </Button>
          </Link>
        </div>
      </div>
      {listings.length === 0 ? (
        <Card className="py-12 text-center">
          <p className="text-neutral-600 mb-4">No listings yet.</p>
          <Link href="/admin/listings/new">
            <Button><Plus className="w-4 h-4 mr-2" /> Add your first listing</Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-4">
          {listings.map((listing) => (
            <Card key={listing.id} className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-4 p-4 sm:p-6">
              <div className="min-w-0 flex-1">
                <h2 className="font-semibold text-neutral-900 truncate">{listing.title}</h2>
                <p className="text-sm text-neutral-600 truncate">{listing.location}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={listing.status === 'available' ? 'success' : 'neutral'}>
                    {listing.status}
                  </Badge>
                  <span className="text-sm text-neutral-500">
                    KES {listing.priceKES.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 min-h-[44px]">
                <Link href={`/listings/${listing.slug}`} target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="sm" className="min-h-[44px] min-w-[44px] touch-manipulation p-0">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href={`/admin/listings/edit?id=${encodeURIComponent(listing.id)}`}>
                  <Button variant="outline" size="sm" className="min-h-[44px] touch-manipulation">
                    <Pencil className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  className="min-h-[44px] touch-manipulation"
                  onClick={() => handleDelete(listing.id)}
                  disabled={deletingId === listing.id}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  {deletingId === listing.id ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
