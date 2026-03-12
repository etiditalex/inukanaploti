import { MetadataRoute } from 'next'
import { getListings } from '@/lib/listings-data'
import { getBlogs } from '@/lib/blogs-data'

const SITE_URL = 'https://inukanaploti.co.ke'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [listings, blogs] = await Promise.all([getListings(), getBlogs()])
  const listingEntries: MetadataRoute.Sitemap = listings.map((listing) => ({
    url: `${SITE_URL}/listings/${listing.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))
  const blogEntries: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${SITE_URL}/blog/${encodeURIComponent(blog.slug)}/`,
    lastModified: new Date(blog.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    { url: `${SITE_URL}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/listings/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/blog/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/map/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/about/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    ...listingEntries,
    ...blogEntries,
  ]
}
