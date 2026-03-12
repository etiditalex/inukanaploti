'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Phone, MessageCircle, Home, CircleDollarSign, Heart, FileCheck, FileText, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ListingCard } from '@/components/ListingCard'
import { Card } from '@/components/ui/Card'
import { Listing } from '@/types/listing'
import { Testimonial } from '@/types/testimonial'
import { supabase } from '@/lib/supabase/client'
import { rowToListing, type ListingRow } from '@/lib/listings-data'
import { rowToTestimonial, type TestimonialRow } from '@/lib/testimonials-data'
import { Star } from 'lucide-react'

export function HomePageClient({ featuredListings }: { featuredListings: Listing[] }) {
  const [listings, setListings] = useState<Listing[]>(featuredListings)

  useEffect(() => {
    setListings(featuredListings)
  }, [featuredListings])

  // Fetch current listings on mount so deletes in admin are reflected
  useEffect(() => {
    const load = async () => {
      try {
        const { data, error } = await supabase
          .from('listings')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(4)
        if (error) return
        const next = (data ?? []) as ListingRow[]
        setListings(next.map(rowToListing).slice(0, 4))
      } catch (_) {}
    }
    load()
  }, [])

  const displayListings = listings.slice(0, 4)

  const [testimonials, setTestimonials] = useState<Testimonial[]>([])

  useEffect(() => {
    const load = async () => {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .order('display_order', { ascending: true })
          .order('created_at', { ascending: false })
        if (error) return
        setTestimonials(((data ?? []) as TestimonialRow[]).map(rowToTestimonial))
      } catch (_) {}
    }
    load()
  }, [])

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
            {displayListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Inuka na Ploti - feature grid */}
      <section className="bg-neutral-900 py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-white font-heading font-bold text-2xl sm:text-3xl lg:text-4xl mb-12 sm:mb-16">
            Why Inuka na Ploti
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-primary-500/30 divide-y md:divide-y-0 md:divide-x divide-primary-500/30">
            <div className="p-6 sm:p-8 lg:p-10">
              <Home className="w-10 h-10 text-primary-400 mb-4" strokeWidth={1.5} />
              <h3 className="text-primary-400 font-heading font-bold uppercase tracking-wide text-sm sm:text-base mb-3">
                Wide range of properties
              </h3>
              <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                We offer a wide variety of property investment opportunities across the coast and beyond.
              </p>
            </div>
            <div className="p-6 sm:p-8 lg:p-10">
              <CircleDollarSign className="w-10 h-10 text-primary-400 mb-4" strokeWidth={1.5} />
              <h3 className="text-primary-400 font-heading font-bold uppercase tracking-wide text-sm sm:text-base mb-3">
                Financing made easy
              </h3>
              <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                Flexible payment plans and support to help you invest safely and with confidence.
              </p>
            </div>
            <div className="p-6 sm:p-8 lg:p-10">
              <Heart className="w-10 h-10 text-primary-400 mb-4" strokeWidth={1.5} />
              <h3 className="text-primary-400 font-heading font-bold uppercase tracking-wide text-sm sm:text-base mb-3">
                Trusted by hundreds
              </h3>
              <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                Trusted by clients across the coast. Delivered projects and lasting partnerships.
              </p>
            </div>
            <div className="p-6 sm:p-8 lg:p-10 border-t md:border-t-0 border-primary-500/30">
              <FileCheck className="w-10 h-10 text-primary-400 mb-4" strokeWidth={1.5} />
              <h3 className="text-primary-400 font-heading font-bold uppercase tracking-wide text-sm sm:text-base mb-3">
                Invest in a partnership
              </h3>
              <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                With Inuka na Ploti you get land, clear process, and ongoing support as your partner.
              </p>
            </div>
            <div className="p-6 sm:p-8 lg:p-10 border-t md:border-t-0 md:border-l-0 border-primary-500/30">
              <FileText className="w-10 h-10 text-primary-400 mb-4" strokeWidth={1.5} />
              <h3 className="text-primary-400 font-heading font-bold uppercase tracking-wide text-sm sm:text-base mb-3">
                Transparency
              </h3>
              <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                Stay informed about your investment and your property at every step.
              </p>
            </div>
            <div className="p-6 sm:p-8 lg:p-10 border-t md:border-t-0 md:border-l-0 border-primary-500/30">
              <MapPin className="w-10 h-10 text-primary-400 mb-4" strokeWidth={1.5} />
              <h3 className="text-primary-400 font-heading font-bold uppercase tracking-wide text-sm sm:text-base mb-3">
                Prime locations
              </h3>
              <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                Every project is hand-picked in promising locations near amenities and growth areas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="section-padding bg-neutral-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="heading-lg mb-4">Trusted by Investors</h2>
              <p className="text-body max-w-2xl mx-auto text-neutral-600">
                Join hundreds of satisfied customers who have made successful land investments with us.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((t) => (
                <Card key={t.id} className="text-center p-6">
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-primary-500 fill-primary-500/30" />
                    ))}
                  </div>
                  <blockquote className="text-neutral-600 mb-4">&quot;{t.quote}&quot;</blockquote>
                  <div className="font-semibold text-neutral-900">{t.authorName}</div>
                  {t.authorRole && (
                    <div className="text-sm text-neutral-500">{t.authorRole}</div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

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
