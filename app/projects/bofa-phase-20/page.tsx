import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, MapPin, Ruler, Phone, MessageCircle, Download, Share2, CheckCircle, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export const metadata: Metadata = {
  title: 'Bofa Phase 20 - Premium Land Investment in Kilifi | Only Ksh 1.95M',
  description: 'BOFA-WHERE DREAMS & INVESTMENTS MEET! Prime location with tarmacked roads, water & electricity. Land in Bofa is selling fast - secure your piece of paradise!',
  keywords: ['Bofa Phase 20', 'Kilifi land', 'land for sale Kenya', 'Bofa plots', 'Kilifi investment', 'coastal land Kenya'],
  openGraph: {
    title: 'Bofa Phase 20 - Premium Land Investment in Kilifi',
    description: 'BOFA-WHERE DREAMS & INVESTMENTS MEET! Prime location with tarmacked roads, water & electricity. Only Ksh 1.95M!',
    url: 'https://inukanaploti.co.ke/projects/bofa-phase-20',
    images: [
      {
        url: 'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758797825/Bofa_phase_20_3_lynzhw.jpg',
        width: 1200,
        height: 630,
        alt: 'Bofa Phase 20 - Premium Land Investment in Kilifi',
      },
    ],
  },
}

const projectImages = [
  'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758797825/Bofa_phase_20_3_lynzhw.jpg',
  'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758797826/Bofa_phase_20_4_lxgg40.jpg',
  'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758797825/Bofa_phase_20_6_uv65ig.jpg',
  'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758797825/Bofa_phase_20_1_ywo92o.jpg',
  'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758797825/Bofa_phase_20_2_b05ppv.jpg',
]

const features = [
  'Tarmacked roads for smooth access',
  'Water & electricity already in place',
  'Prime location perfect for homes or rentals',
  'Fast-selling investment opportunity',
  'Guaranteed title deeds',
  'Flexible payment plans available'
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateListing',
  name: 'Bofa Phase 20 - Premium Land Investment',
  description: 'BOFA-WHERE DREAMS & INVESTMENTS MEET! Prime location with tarmacked roads, water & electricity. Land in Bofa is selling fast!',
  url: 'https://inukanaploti.co.ke/projects/bofa-phase-20',
  image: projectImages,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bofa, Kilifi',
    addressCountry: 'KE'
  },
  offers: {
    '@type': 'Offer',
    price: 1950000,
    priceCurrency: 'KES',
    availability: 'https://schema.org/InStock',
    validFrom: new Date().toISOString(),
    priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
  },
  propertyType: 'Land',
  listingStatus: 'Active'
}

export default function BofaPhase20Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-neutral-50">
        {/* Header */}
        <div className="bg-white border-b border-neutral-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <Link href="/listings" className="flex items-center text-primary-600 hover:text-primary-700 transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Listings
              </Link>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="touch-manipulation">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="touch-manipulation">
                  <Download className="w-4 h-4 mr-2" />
                  Brochure
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-br from-primary-50 to-primary-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="success" className="mb-4">
                  <Star className="w-4 h-4 mr-2" />
                  Hot Investment Opportunity
                </Badge>
                <h1 className="text-4xl sm:text-5xl font-display font-bold text-neutral-900 mb-6">
                  Bofa Phase 20
                  <span className="block text-primary-600">Where Dreams & Investments Meet!</span>
                </h1>
                <p className="text-xl text-neutral-700 mb-8 leading-relaxed">
                  Bofa has quickly become the top hotspot for smart investors and it's easy to see why! 
                  Land in Bofa is selling fast, and this is your chance to secure your piece of paradise before prices rise!
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <div className="flex items-center text-lg font-semibold text-primary-600">
                    <span className="text-3xl font-bold">Ksh 1.95M</span>
                    <span className="ml-2 text-neutral-600">Only!</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="group touch-manipulation" style={{ minHeight: '48px' }}>
                    <Phone className="w-5 h-5 mr-2" />
                    Call +254 724 027747
                  </Button>
                  <Button variant="outline" size="lg" className="touch-manipulation" style={{ minHeight: '48px' }}>
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={projectImages[0]}
                    alt="Bofa Phase 20 - Premium Land Investment in Kilifi"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={90}
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600">Ksh 1.95M</div>
                    <div className="text-sm text-neutral-600">Starting Price</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
                Why Choose Bofa Phase 20?
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                This prime location offers everything you need for a successful investment
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-neutral-900 mb-2">{feature}</h3>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Image Gallery */}
        <section className="py-16 bg-neutral-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
                Project Gallery
              </h2>
              <p className="text-lg text-neutral-600">
                Explore the beauty and potential of Bofa Phase 20
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectImages.map((image, index) => (
                <div key={index} className="relative h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src={image}
                    alt={`Bofa Phase 20 - Project Image ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={85}
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location & Details */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-display font-bold text-neutral-900 mb-6">
                  Project Details
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-primary-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">Location</h3>
                      <p className="text-neutral-600">Bofa, Kilifi County, Kenya</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Ruler className="w-6 h-6 text-primary-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">Plot Sizes</h3>
                      <p className="text-neutral-600">Various sizes available</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <CheckCircle className="w-6 h-6 text-primary-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">Infrastructure</h3>
                      <p className="text-neutral-600">Tarmacked roads, water & electricity in place</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary-50 rounded-2xl p-8">
                <h3 className="text-2xl font-display font-bold text-neutral-900 mb-4">
                  Investment Opportunity
                </h3>
                <p className="text-neutral-700 mb-6">
                  Bofa has quickly become the top hotspot for smart investors. With infrastructure already in place 
                  and prices still affordable, this is your chance to secure your piece of paradise before prices rise!
                </p>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-primary-200">
                    <span className="font-medium text-neutral-700">Starting Price</span>
                    <span className="text-xl font-bold text-primary-600">Ksh 1.95M</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-primary-200">
                    <span className="font-medium text-neutral-700">Payment Plans</span>
                    <span className="text-primary-600 font-medium">Available</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="font-medium text-neutral-700">Title Deeds</span>
                    <span className="text-green-600 font-medium">Guaranteed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-primary-700 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-display font-bold mb-4">
              Don't Miss This Opportunity!
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Land in Bofa is selling fast. Secure your piece of paradise today before prices rise!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary-700 hover:bg-primary-50 touch-manipulation" style={{ minHeight: '48px' }}>
                <Phone className="w-5 h-5 mr-2" />
                Call +254 724 027747
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-700 touch-manipulation" style={{ minHeight: '48px' }}>
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp Now
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
