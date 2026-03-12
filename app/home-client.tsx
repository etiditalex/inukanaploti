'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Star, Phone, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ListingCard } from '@/components/ListingCard'
import { Listing } from '@/types/listing'

export function HomePageClient({ featuredListings }: { featuredListings: Listing[] }) {
  return (
    <div className="min-h-screen">
      {/* Hero Section - screenshot style, Inuka na Ploti colors */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/dyfnobo9r/image/upload/v1773038630/Mariakani_-Kaloleni_dadglm.jpg"
            alt="Premium land and property investments in Kenya"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={85}
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <div className="w-full">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading leading-tight mb-6 animate-fade-in whitespace-nowrap">
              <span className="text-white">Gateway to </span>
              <span className="text-primary-300">Land & Property</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-white/95 mb-10 w-full leading-relaxed animate-slide-up">
              We connect investors to Kenya&apos;s property market through trust, innovation, and personalized service & partnership,
              <br />
              Delivering land, homes, and long-term value across the coast and beyond.
            </p>

            <div className="flex justify-center animate-slide-up">
              <Link
                href="/listings"
                className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors touch-manipulation"
              >
                Discover More
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:hidden">
              <a
                href="tel:+254724027747"
                className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors touch-manipulation"
              >
                <Phone className="w-5 h-5" />
                <span>Call +254 724 027747</span>
              </a>
              <a
                href="https://wa.me/254783027747"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors touch-manipulation"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <ArrowRight className="w-6 h-6 text-white rotate-90" />
          </div>
        </div>
      </section>

      {/* Join the Family banner - full width left to right */}
      <section className="w-full bg-neutral-50 pt-12 pb-6">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <h2 className="heading-lg mb-3">Join the Family</h2>
          <p className="text-body text-neutral-700">
            Our portfolio of properties is as diverse as your dreams. Explore the following categories to find
            the perfect property that resonates with your vision of home or investment.
          </p>
        </div>
      </section>

      <section className="pt-6 pb-16 sm:pb-20 lg:pb-24 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>

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
                &quot;Excellent service and transparent process. Got my title deed within the promised timeframe.&quot;
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
                &quot;Flexible payment plans made it possible for me to invest in my dream property.&quot;
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
                &quot;Professional team and great locations. Highly recommend for land investment.&quot;
              </blockquote>
              <div className="font-semibold text-neutral-900">David Kimani</div>
              <div className="text-sm text-neutral-500">Malindi Developer</div>
            </Card>
          </div>
        </div>
      </section>

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
