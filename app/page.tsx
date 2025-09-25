'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin, Shield, CreditCard, Star, Phone, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ListingCard } from '@/components/ListingCard'
import { Listing } from '@/types/listing'
import listingsData from '@/data/listings.json'

export default function HomePage() {
  const featuredListings = (listingsData as Listing[]).slice(0, 3)

  const highlights = [
    {
      icon: MapPin,
      title: 'Prime Locations',
      description: 'Strategic plots in Kilifi, Mtwapa, and Malindi with excellent growth potential and infrastructure.',
    },
    {
      icon: CreditCard,
      title: 'Flexible Payment Plans',
      description: 'Affordable payment plans with low deposits and flexible monthly installments to suit your budget.',
    },
    {
      icon: Shield,
      title: 'Title Deeds Guaranteed',
      description: 'All our properties come with clear title deeds and full legal documentation for your peace of mind.',
    },
  ]

  const stats = [
    { label: 'Properties Sold', value: '200+' },
    { label: 'Happy Customers', value: '200+' },
    { label: 'Years Experience', value: '7+' },
    { label: 'Locations', value: '15+' },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/dyfnobo9r/image/upload/v1758696813/Inuka_na_ploti_4_c9jcj4.jpg"
            alt="Premium land investments in Kenya - Beautiful coastal landscape with modern development potential"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={85}
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white pt-20 pb-8">
          <div className="max-w-4xl mx-auto">
                <h1 className="heading-xl text-white mb-6 animate-fade-in">
                  Your Dream Land Investment
                  <span className="block text-primary-300 font-luxury text-elegant">Starts Here</span>
                </h1>
            <p className="text-body-lg text-neutral-200 mb-8 max-w-2xl mx-auto animate-slide-up px-2 text-clean">
              Discover premium land investments in Kenya with flexible payment plans, 
              guaranteed title deeds, and prime locations.
            </p>
            
                <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up px-4">
                  <Button size="lg" className="group w-full sm:w-auto touch-manipulation android-button active:scale-95 transition-transform" style={{ minHeight: '56px' }} asChild>
                    <Link href="/listings">
                      View Listings
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-primary-600 active:scale-95 transition-all duration-200 w-full sm:w-auto touch-manipulation android-button" style={{ minHeight: '56px' }} asChild>
                    <Link href="/contact">
                      Book Site Visit
                    </Link>
                  </Button>
                </div>
            
            {/* Mobile-specific quick actions */}
            <div className="mt-8 flex flex-col sm:hidden gap-3 animate-slide-up">
              <a
                href="tel:+254724027747"
                className="flex items-center justify-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 active:bg-primary-800 transition-all duration-200 touch-manipulation call-button-android"
                style={{ minHeight: '56px' }}
              >
                <Phone className="w-5 h-5" />
                <span>Call +254 724 027747</span>
              </a>
              <a
                href="https://wa.me/254783027747"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 active:bg-green-800 transition-all duration-200 touch-manipulation contact-button-android"
                style={{ minHeight: '56px' }}
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <ArrowRight className="w-6 h-6 text-white rotate-90" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-neutral-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Why Choose Inuka na Ploti?</h2>
            <p className="text-body max-w-2xl mx-auto">
              We make land investment simple, secure, and accessible with our proven track record 
              and customer-focused approach.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon
              return (
                <Card key={index} hover className="text-center p-6 touch-manipulation">
                  <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-4">{highlight.title}</h3>
                  <p className="text-neutral-600 text-sm sm:text-base">{highlight.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Bofa Phase 20 */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="success" className="mb-4">
                <Star className="w-4 h-4 mr-2" />
                Hot Investment Opportunity
              </Badge>
              <h2 className="heading-lg text-neutral-900 mb-4">
                Bofa Phase 20
                <span className="block text-primary-600 font-luxury text-elegant">Where Dreams & Investments Meet!</span>
              </h2>
              <p className="text-body text-neutral-700 mb-6 text-modern">
                Bofa has quickly become the top hotspot for smart investors! Tarmacked roads, water & electricity already in place. 
                Land in Bofa is selling fast - secure your piece of paradise before prices rise!
              </p>
              <div className="flex items-center mb-6">
                <span className="price-display text-primary-600">Ksh 1.95M</span>
                <span className="ml-2 text-lg text-neutral-600">Only!</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="touch-manipulation android-button">
                  <Link href="/projects/bofa-phase-20">
                    View Project Details
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
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
                  src="https://res.cloudinary.com/dyfnobo9r/image/upload/v1758797825/Bofa_phase_20_3_lynzhw.jpg"
                  alt="Bofa Phase 20 - Premium Land Investment in Kilifi"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={90}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="section-padding bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Featured Properties</h2>
            <p className="text-body max-w-2xl mx-auto">
              Discover our handpicked selection of premium land investments in Kenya's most 
              promising locations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" asChild>
              <Link href="/listings">
                View All Properties
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Trusted by Investors</h2>
            <p className="text-body max-w-2xl mx-auto">
              Join hundreds of satisfied customers who have made successful land investments with us.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-neutral-600 mb-4">
                "Excellent service and transparent process. Got my title deed within the promised timeframe."
              </blockquote>
              <div className="font-semibold text-neutral-900">John Mwangi</div>
              <div className="text-sm text-neutral-500">Kilifi Investor</div>
            </Card>

            <Card className="text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-neutral-600 mb-4">
                "Flexible payment plans made it possible for me to invest in my dream property."
              </blockquote>
              <div className="font-semibold text-neutral-900">Sarah Wanjiku</div>
              <div className="text-sm text-neutral-500">Mtwapa Homeowner</div>
            </Card>

            <Card className="text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-neutral-600 mb-4">
                "Professional team and great locations. Highly recommend for land investment."
              </blockquote>
              <div className="font-semibold text-neutral-900">David Kimani</div>
              <div className="text-sm text-neutral-500">Malindi Developer</div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="heading-lg mb-4">Ready to Start Your Investment Journey?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Contact us today to learn more about our available properties and flexible payment plans.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" asChild className="android-button">
              <Link href="/contact">
                Get Started Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-600 call-button-android" asChild>
              <a href="tel:+254724027747">
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </a>
            </Button>
            <Button variant="success" size="lg" className="contact-button-android" asChild>
              <a href="https://wa.me/254783027747" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
