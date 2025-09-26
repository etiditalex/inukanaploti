import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, MapPin, Ruler, Phone, MessageCircle, CheckCircle, Star, Waves } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { MapComponent } from '@/components/MapComponent'
import { ListingJsonLd } from '@/components/ListingJsonLd'
import { Metadata } from 'next'

const projectImages = [
  "https://res.cloudinary.com/dyfnobo9r/image/upload/v1758858195/Chumani_Beach_view_3_4_o5viok.jpg",
  "https://res.cloudinary.com/dyfnobo9r/image/upload/v1758858194/Chumani_Beach_view_3_2_zfbnem.jpg",
  "https://res.cloudinary.com/dyfnobo9r/image/upload/v1758858194/Chumani_Beach_view_3_3_rlwbmb.jpg",
  "https://res.cloudinary.com/dyfnobo9r/image/upload/v1758858194/Chumani_Beach_view_3_6_bnzwti.jpg",
  "https://res.cloudinary.com/dyfnobo9r/image/upload/v1758858194/Chumani_Beach_view_3_7_kbriha.jpg",
  "https://res.cloudinary.com/dyfnobo9r/image/upload/v1758858194/Chumani_Beach_view_3_1_sttzkr.jpg",
  "https://res.cloudinary.com/dyfnobo9r/image/upload/v1758858194/Chumani_Beach_view_3_5_dkxhkl.jpg"
]

const listingData = {
  id: "chumani-beach-view",
  title: "Chumani Beach View - Oceanfront Investment",
  slug: "chumani-beach-view",
  priceKES: 650000,
  sizeAcres: "1/8",
  location: "Kilifi – Chumani Beach",
  coords: {
    lat: -3.4500,
    lng: 39.8500
  },
  status: "available" as const,
  images: projectImages,
  paymentPlan: {
    depositKES: 250000,
    months: 12
  },
  features: [
    "Walking distance to beach",
    "White sandy beach access",
    "Chain link perimeter fences",
    "9m access roads",
    "Water & electricity available"
  ],
  shortDescription: "Chumani Beach View plots - only 700m to white sandy beach! Perfect for holiday homes, Airbnb, and cottages with excellent infrastructure.",
  longDescription: "Chumani Beach View plots offer an incredible opportunity to own land just 700m from a pristine white sandy beach. These 1/8 acre plots (50x100 sqft) are perfect for building holiday homes, Airbnb rentals, or cottages. The development includes chain link perimeter fences, beacons, 9m access roads, water, and electricity. Some plots are just 600m from the ocean, while others are 500m to Chumani Mavuneni Beach. With a deposit of Ksh 250,000 and the balance payable in 12 months interest-free, this is an excellent investment opportunity in a prime coastal location.",
  amenities: [
    "Beach access",
    "Perimeter fencing",
    "Access roads",
    "Water supply",
    "Electricity connection"
  ]
}

export const metadata: Metadata = {
  title: 'Chumani Beach View - Oceanfront Investment | Inuka na Ploti',
  description: 'Chumani Beach View plots - only 700m to white sandy beach! Perfect for holiday homes, Airbnb, and cottages. Ksh 650,000 with flexible payment plans.',
  keywords: ['Chumani beach plots', 'Kilifi land for sale', 'beachfront property', 'holiday home investment', 'Airbnb property Kenya'],
  openGraph: {
    title: 'Chumani Beach View - Oceanfront Investment',
    description: 'Chumani Beach View plots - only 700m to white sandy beach! Perfect for holiday homes, Airbnb, and cottages.',
    images: [projectImages[0]],
  },
}

export default function ChumaniBeachViewPage() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatDeposit = (deposit: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(deposit)
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <Link href="/listings" className="flex items-center text-primary-600 hover:text-primary-700 transition-colors">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Listings
                </Link>
              </div>
              
              <Badge variant="success" className="mb-4">
                <Waves className="w-4 h-4 mr-2" />
                Beachfront Investment
              </Badge>
              
              <h1 className="heading-xl text-neutral-900 mb-6">
                Chumani Beach View
                <span className="block text-blue-600 font-luxury text-elegant">Oceanfront Paradise</span>
              </h1>
              
              <p className="text-body-lg text-neutral-700 mb-8 text-clean">
                Chumani Beach View plots offer an incredible opportunity to own land just 700m from a pristine white sandy beach. 
                Perfect for holiday homes, Airbnb rentals, and cottages with excellent infrastructure.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center text-lg font-semibold text-blue-600">
                  <span className="price-display">Ksh 650,000</span>
                  <span className="ml-2 text-neutral-600">Only!</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="touch-manipulation android-button">
                  <a href="https://wa.me/254783027747?text=Hi, I'm interested in Chumani Beach View plots" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp Inquiry
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild className="touch-manipulation call-button-android">
                  <a href="tel:+254724027747">
                    <Phone className="w-5 h-5 mr-2" />
                    Call +254 724 027747
                  </a>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={projectImages[0]}
                  alt="Chumani Beach View - Oceanfront Investment in Kilifi"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={90}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Key Facts */}
            <Card>
              <h2 className="heading-md mb-6">Key Facts</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Ruler className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">Plot Size</p>
                    <p className="text-neutral-600">1/8 acre (50x100 sqft)</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">Location</p>
                    <p className="text-neutral-600">Chumani, Kilifi</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Waves className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">Beach Distance</p>
                    <p className="text-neutral-600">700m to white sandy beach</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">Infrastructure</p>
                    <p className="text-neutral-600">Water & electricity available</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Description */}
            <Card>
              <h2 className="heading-md mb-6">About Chumani Beach View</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-body text-neutral-700 mb-6">
                  Chumani Beach View plots offer an incredible opportunity to own land just 700m from a pristine white sandy beach. 
                  These 1/8 acre plots (50x100 sqft) are perfect for building holiday homes, Airbnb rentals, or cottages.
                </p>
                <p className="text-body text-neutral-700 mb-6">
                  The development includes chain link perimeter fences, beacons, 9m access roads, water, and electricity. 
                  Some plots are just 600m from the ocean, while others are 500m to Chumani Mavuneni Beach.
                </p>
                <p className="text-body text-neutral-700">
                  With a deposit of Ksh 250,000 and the balance payable in 12 months interest-free, this is an excellent 
                  investment opportunity in a prime coastal location.
                </p>
              </div>
            </Card>

            {/* Features */}
            <Card>
              <h2 className="heading-md mb-6">Features & Amenities</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {listingData.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-neutral-700">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Image Gallery */}
            <Card>
              <h2 className="heading-md mb-6">Project Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {projectImages.slice(1).map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`Chumani Beach View - Image ${index + 2}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 50vw, 33vw"
                      quality={80}
                    />
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Payment Plan */}
            <Card>
              <h3 className="heading-sm mb-4">Payment Plan</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600">Total Price</span>
                  <span className="font-semibold text-lg">{formatPrice(listingData.priceKES)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600">Deposit</span>
                  <span className="font-semibold text-primary-600">{formatDeposit(listingData.paymentPlan.depositKES)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600">Balance</span>
                  <span className="font-semibold">{formatPrice(listingData.priceKES - listingData.paymentPlan.depositKES)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600">Payment Period</span>
                  <span className="font-semibold">{listingData.paymentPlan.months} months</span>
                </div>
                <div className="pt-4 border-t border-neutral-200">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">Monthly Payment</span>
                    <span className="font-semibold text-green-600">
                      {formatPrice((listingData.priceKES - listingData.paymentPlan.depositKES) / listingData.paymentPlan.months)}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-500 mt-1">Interest-free</p>
                </div>
              </div>
            </Card>

            {/* Contact CTA */}
            <Card>
              <h3 className="heading-sm mb-4">Interested?</h3>
              <p className="text-neutral-600 mb-6">
                Contact us today to learn more about this amazing beachfront investment opportunity.
              </p>
              <div className="space-y-3">
                <Button asChild className="w-full contact-button-android">
                  <a href="https://wa.me/254783027747?text=Hi, I'm interested in Chumani Beach View plots" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp Inquiry
                  </a>
                </Button>
                <Button variant="outline" asChild className="w-full call-button-android">
                  <a href="tel:+254724027747">
                    <Phone className="w-4 h-4 mr-2" />
                    Call +254 724 027747
                  </a>
                </Button>
              </div>
            </Card>

            {/* Location Map */}
            <Card>
              <h3 className="heading-sm mb-4">Location</h3>
              <div className="h-64 rounded-lg overflow-hidden">
                <MapComponent 
                  listings={[listingData]} 
                  hoveredListing={null}
                />
              </div>
              <p className="text-sm text-neutral-600 mt-2">
                Chumani, Kilifi - Just 700m from the beach
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* JSON-LD */}
      <ListingJsonLd listing={listingData} />
    </div>
  )
}
