import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, MapPin, Ruler, Phone, MessageCircle, Download, Share2, CheckCircle, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export const metadata: Metadata = {
  title: 'Bofa Phase 21 - Coastal Paradise | Only Ksh 1.695M | 1KM from Beach',
  description: 'Just 100m off B69 road and only 1KM from Bofa Beach! Perfect blend of convenience, serenity, and coastal charm. Massive discount from 1.85M to 1.695M!',
  keywords: ['Bofa Phase 21', 'Kilifi land', 'beach proximity', 'coastal property', 'Bofa Beach', 'land for sale Kenya', 'coastal investment'],
  openGraph: {
    title: 'Bofa Phase 21 - Coastal Paradise | Only Ksh 1.695M',
    description: 'Just 100m off B69 road and only 1KM from Bofa Beach! Perfect blend of convenience, serenity, and coastal charm.',
    url: 'https://inukanaploti.co.ke/projects/bofa-phase-21',
    images: [
      {
        url: 'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758821399/Bofa_phase_21_6_y46ggc.jpg',
        width: 1200,
        height: 630,
        alt: 'Bofa Phase 21 - Coastal Paradise near Bofa Beach',
      },
    ],
  },
}

const projectImages = [
  'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758821399/Bofa_phase_21_6_y46ggc.jpg',
  'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758821399/Bofa_phase_21_5_uuf1yq.jpg',
  'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758821399/Bofa_phase_21_1_g34gck.jpg',
  'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758821400/Bofa_phase_21_8_qw4czx.jpg',
  'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758821398/Bofa_phase_21_7_pmvxtt.jpg',
]

const features = [
  'Just 100m off B69 road',
  '1KM from Bofa Beach',
  'Coastal charm & serenity',
  'Massive discount from 1.85M',
  'Flexible payment plans',
  'Investment opportunity'
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateListing',
  name: 'Bofa Phase 21 - Coastal Paradise',
  description: 'Just 100m off the B69 road and only 1KM from the breathtaking Bofa Beach! A perfect blend of convenience, serenity, and coastal charm.',
  url: 'https://inukanaploti.co.ke/projects/bofa-phase-21',
  image: projectImages,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bofa, Kilifi',
    addressCountry: 'KE'
  },
  offers: {
    '@type': 'Offer',
    price: 1695000,
    priceCurrency: 'KES',
    availability: 'https://schema.org/InStock',
    validFrom: new Date().toISOString(),
    priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
  },
  propertyType: 'Land',
  listingStatus: 'Active'
}

export default function BofaPhase21Page() {
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
        <section className="relative py-16 bg-gradient-to-br from-blue-50 to-green-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="success" className="mb-4">
                  <Star className="w-4 h-4 mr-2" />
                  Massive Discount Available!
                </Badge>
                <h1 className="heading-xl text-neutral-900 mb-6">
                  Bofa Phase 21
                  <span className="block text-blue-600 font-luxury text-elegant">Coastal Paradise</span>
                </h1>
                <p className="text-body-lg text-neutral-700 mb-8 text-clean">
                  Just 100m off the B69 road and only 1KM from the breathtaking Bofa Beach! 
                  A perfect blend of convenience, serenity, and coastal charm.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <div className="flex items-center text-lg font-semibold text-blue-600">
                    <span className="price-display">Ksh 1.695M</span>
                    <span className="ml-2 text-neutral-600">(Down from 1.85M!)</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="group touch-manipulation call-button-android" style={{ minHeight: '56px' }} asChild>
                    <a href="tel:+254724027747">
                      <Phone className="w-5 h-5 mr-2" />
                      Call +254 724 027747
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" className="touch-manipulation contact-button-android" style={{ minHeight: '56px' }} asChild>
                    <a href="https://wa.me/254783027747" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={projectImages[0]}
                    alt="Bofa Phase 21 - Coastal Paradise near Bofa Beach"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={90}
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">Ksh 1.695M</div>
                    <div className="text-sm text-neutral-600">Discounted Price</div>
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
                Why Choose Bofa Phase 21?
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Experience the perfect blend of convenience, serenity, and coastal charm
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
                Explore the beauty and potential of Bofa Phase 21
              </p>
            </div>

            <div className="gallery-android">
              {projectImages.map((image, index) => (
                <div key={index} className="gallery-item-android">
                  <Image
                    src={image}
                    alt={`Bofa Phase 21 - Project Image ${index + 1}`}
                    fill
                    className="object-cover android-image hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
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
                    <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">Location</h3>
                      <p className="text-neutral-600">Bofa, Kilifi County, Kenya</p>
                      <p className="text-sm text-neutral-500">Just 100m off B69 road, 1KM from Bofa Beach</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Ruler className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">Plot Size</h3>
                      <p className="text-neutral-600">1/8 acre plots available</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <CheckCircle className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">Access</h3>
                      <p className="text-neutral-600">Easy access via B69 road, close to Bofa Beach</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-2xl p-8">
                <h3 className="text-2xl font-display font-bold text-neutral-900 mb-4">
                  Investment Opportunity
                </h3>
                <p className="text-neutral-700 mb-6">
                  Own your 1/8 acre plot today at a massively discounted all-inclusive price of KES 1.695M 
                  (down from 1.85M). Flexible payment plan options available! Don't miss out—secure your piece of paradise today!
                </p>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-blue-200">
                    <span className="font-medium text-neutral-700">Original Price</span>
                    <span className="text-xl font-bold text-neutral-500 line-through">Ksh 1.85M</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-blue-200">
                    <span className="font-medium text-neutral-700">Discounted Price</span>
                    <span className="text-xl font-bold text-blue-600">Ksh 1.695M</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-blue-200">
                    <span className="font-medium text-neutral-700">Savings</span>
                    <span className="text-green-600 font-medium">Ksh 155,000</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="font-medium text-neutral-700">Payment Plans</span>
                    <span className="text-blue-600 font-medium">Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Plan Section */}
        <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
                Flexible Payment Plan
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Make your coastal paradise investment affordable with our flexible payment structure
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">Ksh 1.695M</div>
                <div className="text-neutral-600 font-medium">Total Price</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">Ksh 500K</div>
                <div className="text-neutral-600 font-medium">Initial Deposit</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">Ksh 1.195M</div>
                <div className="text-neutral-600 font-medium">Balance (12 months)</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">Ksh 99,583</div>
                <div className="text-neutral-600 font-medium">Monthly Payment</div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">Payment Breakdown</h3>
                <div className="space-y-3 text-left">
                  <div className="flex justify-between items-center py-2 border-b border-neutral-200">
                    <span className="font-medium text-neutral-700">Total Plot Price</span>
                    <span className="font-bold text-blue-600">Ksh 1,695,000</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-neutral-200">
                    <span className="font-medium text-neutral-700">Initial Deposit (29.5%)</span>
                    <span className="font-bold text-green-600">Ksh 500,000</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-neutral-200">
                    <span className="font-medium text-neutral-700">Remaining Balance</span>
                    <span className="font-bold text-purple-600">Ksh 1,195,000</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-neutral-200">
                    <span className="font-medium text-neutral-700">Monthly Installments (12 months)</span>
                    <span className="font-bold text-orange-600">Ksh 99,583</span>
                  </div>
                  <div className="flex justify-between items-center py-2 bg-blue-50 rounded-lg p-3">
                    <span className="font-bold text-neutral-900">Total Investment</span>
                    <span className="font-bold text-blue-600 text-xl">Ksh 1,695,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-blue-700 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-display font-bold mb-4">
              Don't Miss This Coastal Paradise!
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Just 1KM from Bofa Beach with massive savings! Secure your piece of coastal paradise today before prices rise!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 touch-manipulation call-button-android" style={{ minHeight: '56px' }} asChild>
                <a href="tel:+254724027747">
                  <Phone className="w-5 h-5 mr-2" />
                  Call +254 724 027747
                </a>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-700 touch-manipulation contact-button-android" style={{ minHeight: '56px' }} asChild>
                <a href="https://wa.me/254783027747" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp Now
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
