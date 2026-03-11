import { getListings } from '@/lib/listings-data'
import { MapPageClient } from './map-client'

const SITE_URL = 'https://inukanaploti.co.ke'
const LOGO_URL = 'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758705419/inukanaploti_logo_v7btur.jpg'

export const metadata = {
  title: 'Map',
  description: 'View all Inuka na Ploti listing locations on the map. Land and plots in Kilifi, Mtwapa, Malindi, Diani.',
  alternates: { canonical: `${SITE_URL}/map` },
  openGraph: {
    title: 'Map | Inuka na Ploti - Land Listings Kenya',
    description: 'View all listing locations on the map.',
    url: `${SITE_URL}/map`,
    siteName: 'Inuka na Ploti',
    images: [{ url: LOGO_URL, width: 1200, height: 630, alt: 'Inuka na Ploti' }],
  },
  twitter: { card: 'summary_large_image', title: 'Map | Inuka na Ploti', images: [LOGO_URL] },
}

export default async function MapPage() {
  const listings = await getListings()
  return <MapPageClient listings={listings} />
}
