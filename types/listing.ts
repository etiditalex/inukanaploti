export interface MapLocation {
  lat: number
  lng: number
  label?: string
}

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
  /** Pins to show on the project map (in addition to main coords). */
  mapLocations?: MapLocation[]
  paymentPlan: {
    depositKES: number
    months: number
  }
  features: string[]
  shortDescription: string
  longDescription: string
  amenities: string[]
}
