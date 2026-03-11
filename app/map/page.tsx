import { getListings } from '@/lib/listings-data'
import { MapPageClient } from './map-client'

export const metadata = {
  title: 'Map | Inuka na Ploti',
  description: 'View all listing locations on the map.',
}

export default async function MapPage() {
  const listings = await getListings()
  return <MapPageClient listings={listings} />
}
