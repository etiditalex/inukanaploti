import { getListings } from '@/lib/listings-data'
import { EditListingForm } from './edit-form'

type Props = { params: { id: string } }

export async function generateStaticParams() {
  const listings = await getListings()
  return listings.map((listing) => ({ id: listing.id }))
}

export default function EditListingPage({ params }: Props) {
  return <EditListingForm id={params.id} />
}
