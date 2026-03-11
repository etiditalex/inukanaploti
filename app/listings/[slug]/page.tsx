import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getListings, getListingBySlug } from '@/lib/listings-data'
import { ListingDetailView } from '@/components/ListingDetailView'

interface ListingPageProps {
  params: {
    slug: string
  }
}

// Must return every listing slug so static export passes (sitemap + listing page reference these URLs).
// New listings added after deploy have no static page → 404 → not-found.tsx fetches by slug and shows them.
export async function generateStaticParams() {
  const listings = await getListings()
  return listings.map((listing) => ({
    slug: listing.slug,
  }))
}

const SITE_URL = 'https://inukanaploti.co.ke'
const LOGO_URL = 'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758705419/inukanaploti_logo_v7btur.jpg'

export async function generateMetadata({ params }: ListingPageProps) {
  const listing = await getListingBySlug(params.slug)
  if (!listing) {
    return { title: 'Property Not Found' }
  }
  const imageUrl = listing.images?.[0] || LOGO_URL
  const pageUrl = `${SITE_URL}/listings/${listing.slug}`
  return {
    title: listing.title,
    description: listing.shortDescription,
    alternates: { canonical: pageUrl },
    openGraph: {
      type: 'website',
      url: pageUrl,
      title: listing.title,
      description: listing.shortDescription,
      siteName: 'Inuka na Ploti',
      images: [{ url: imageUrl, width: 1200, height: 630, alt: listing.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: listing.title,
      description: listing.shortDescription,
      images: [imageUrl],
    },
  }
}

export default async function ListingPage({ params }: ListingPageProps) {
  const listing = await getListingBySlug(params.slug)
  if (!listing) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: listing.title,
    description: listing.longDescription,
    url: `https://inukanaploti.co.ke/listings/${listing.slug}`,
    image: listing.images,
    address: {
      '@type': 'PostalAddress',
      addressLocality: listing.location,
      addressCountry: 'KE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: listing.coords.lat,
      longitude: listing.coords.lng,
    },
    offers: {
      '@type': 'Offer',
      price: listing.priceKES,
      priceCurrency: 'KES',
      availability: listing.status === 'available' ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ListingDetailView listing={listing} />
    </>
  )
}
