import { getListings } from '@/lib/listings-data'
import { HomePageClient } from './home-client'

export default async function HomePage() {
  const listings = await getListings()
  const featuredListings = listings.slice(0, 3)
  return <HomePageClient featuredListings={featuredListings} />
}
