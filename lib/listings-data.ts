import { Listing } from '@/types/listing'

/**
 * Supabase row shape (snake_case). Map to Listing when needed.
 */
export type ListingRow = {
  id: string
  title: string
  slug: string
  price_kes: number
  size_acres: string
  location: string
  coords: { lat: number; lng: number }
  status: 'available' | 'sold'
  images: string[]
  payment_plan: { deposit_kes: number; months: number }
  features: string[]
  short_description: string
  long_description: string
  amenities: string[]
  map_locations?: { lat: number; lng: number; label?: string }[]
  created_at?: string
  updated_at?: string
}

export function rowToListing(row: ListingRow): Listing {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    priceKES: row.price_kes,
    sizeAcres: row.size_acres,
    location: row.location,
    coords: row.coords,
    status: row.status,
    images: row.images ?? [],
    paymentPlan: {
      depositKES: row.payment_plan?.deposit_kes ?? 0,
      months: row.payment_plan?.months ?? 12,
    },
    features: row.features ?? [],
    shortDescription: row.short_description,
    longDescription: row.long_description,
    amenities: row.amenities ?? [],
    mapLocations: row.map_locations ?? [],
  }
}

/**
 * Fetch all listings. At build time (Vercel) this runs in Node and uses Supabase if env is set; otherwise falls back to JSON.
 * Used by the public site so the frontend reflects what’s in the database after each deploy.
 */
export async function getListings(): Promise<Listing[]> {
  if (
    typeof process !== 'undefined' &&
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    try {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      )
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      if (data && data.length > 0) {
        return (data as ListingRow[]).map(rowToListing)
      }
    } catch (_) {
      // Fall through to JSON fallback
    }
  }
  const listingsJson = await import('@/data/listings.json')
  return listingsJson.default as Listing[]
}

/**
 * Fetch one listing by slug. Same as getListings: Supabase at build time or JSON fallback.
 */
export async function getListingBySlug(slug: string): Promise<Listing | null> {
  const listings = await getListings()
  return listings.find((l) => l.slug === slug) ?? null
}

/**
 * Convert a Listing (camelCase) to Supabase row (snake_case) for admin create/update.
 */
export function listingToRow(listing: Partial<Listing>): Partial<ListingRow> {
  const row: Partial<ListingRow> = {}
  if (listing.id != null) row.id = listing.id
  if (listing.title != null) row.title = listing.title
  if (listing.slug != null) row.slug = listing.slug
  if (listing.priceKES != null) row.price_kes = listing.priceKES
  if (listing.sizeAcres != null) row.size_acres = listing.sizeAcres
  if (listing.location != null) row.location = listing.location
  if (listing.coords != null) row.coords = listing.coords
  if (listing.status != null) row.status = listing.status
  if (listing.images != null) row.images = listing.images
  if (listing.paymentPlan != null)
    row.payment_plan = {
      deposit_kes: listing.paymentPlan.depositKES,
      months: listing.paymentPlan.months,
    }
  if (listing.features != null) row.features = listing.features
  if (listing.shortDescription != null) row.short_description = listing.shortDescription
  if (listing.longDescription != null) row.long_description = listing.longDescription
  if (listing.amenities != null) row.amenities = listing.amenities
  if (listing.mapLocations != null) row.map_locations = listing.mapLocations
  return row
}
