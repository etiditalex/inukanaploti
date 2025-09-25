import { Listing } from '@/types/listing'

interface ListingJsonLdProps {
  listing: Listing
}

export function ListingJsonLd({ listing }: ListingJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: listing.title,
    description: listing.shortDescription,
        url: `https://inukanaploti.co.ke/listings/${listing.slug}`,
    image: listing.images,
    address: {
      '@type': 'PostalAddress',
      addressLocality: listing.location,
      addressCountry: 'KE'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: listing.coords.lat,
      longitude: listing.coords.lng
    },
    offers: {
      '@type': 'Offer',
      price: listing.priceKES,
      priceCurrency: 'KES',
      availability: listing.status === 'available' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      validFrom: new Date().toISOString(),
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
    },
    floorSize: {
      '@type': 'QuantitativeValue',
      value: listing.sizeAcres,
      unitCode: 'ACR'
    },
    numberOfRooms: 0, // Land plots don't have rooms
    propertyType: 'Land',
    listingStatus: listing.status === 'available' ? 'Active' : 'Sold'
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
