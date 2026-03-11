import { MetadataRoute } from 'next'
import { getListings } from '@/lib/listings-data'

const SITE_URL = 'https://inukanaploti.co.ke'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const listings = await getListings()
  const listingEntries: MetadataRoute.Sitemap = listings.map((listing) => ({
    url: `${SITE_URL}/listings/${listing.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    { url: `${SITE_URL}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/listings/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/map/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/about/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    ...listingEntries,
  ]
}
