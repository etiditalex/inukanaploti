export interface Listing {
  id: string
  title: string
  slug: string
  priceKES: number
  sizeAcres: string
  location: string
  coords: {
    lat: number
    lng: number
  }
  status: 'available' | 'sold'
  images: string[]
  paymentPlan: {
    depositKES: number
    months: number
  }
  features: string[]
  shortDescription: string
  longDescription: string
  amenities: string[]
}
