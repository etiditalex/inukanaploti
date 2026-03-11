import { getListings } from '@/lib/listings-data'
import { ListingsPageClient } from './listings-client'

const SITE_URL = 'https://inukanaploti.co.ke'
const LOGO_URL = 'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758705419/inukanaploti_logo_v7btur.jpg'

export const metadata = {
  title: 'Listings',
  description: 'Browse premium land and plot listings in Kenya. Kilifi, Mtwapa, Malindi, Diani. Flexible payment plans and guaranteed title deeds.',
  alternates: { canonical: `${SITE_URL}/listings` },
  openGraph: {
    title: 'Land & Plot Listings | Inuka na Ploti',
    description: 'Browse premium land and plot listings in Kenya. Flexible payment plans.',
    url: `${SITE_URL}/listings`,
    siteName: 'Inuka na Ploti',
    images: [{ url: LOGO_URL, width: 1200, height: 630, alt: 'Inuka na Ploti' }],
  },
  twitter: { card: 'summary_large_image', title: 'Land & Plot Listings | Inuka na Ploti', images: [LOGO_URL] },
}

export default async function ListingsPage() {
  const initialListings = await getListings()
  return <ListingsPageClient initialListings={initialListings} />
}
