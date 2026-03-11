import { getListings } from '@/lib/listings-data'
import { ListingsPageClient } from './listings-client'

export default async function ListingsPage() {
  const initialListings = await getListings()
  return <ListingsPageClient initialListings={initialListings} />
}
