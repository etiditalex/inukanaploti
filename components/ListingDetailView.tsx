'use client'

import Link from 'next/link'
import { ArrowLeft, MapPin, Ruler, Calendar, Phone, MessageCircle, Download, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { GalleryGrid } from '@/components/GalleryGrid'
import { PaymentPlanModal } from '@/components/PaymentPlanModal'
import { ListingDetailMap } from '@/components/ListingDetailMap'
import { Listing } from '@/types/listing'

export function ListingDetailView({ listing }: { listing: Listing }) {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', minimumFractionDigits: 0 }).format(price)
  const formatDeposit = (deposit: number) =>
    new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', minimumFractionDigits: 0 }).format(deposit)
  const monthlyPayment = (listing.priceKES - listing.paymentPlan.depositKES) / listing.paymentPlan.months

  return (
    <div className="min-h-screen pt-20">
      <div className="bg-neutral-50 border-b border-neutral-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-neutral-600 hover:text-primary-600">Home</Link>
            <span className="text-neutral-400">/</span>
            <Link href="/listings" className="text-neutral-600 hover:text-primary-600">Listings</Link>
            <span className="text-neutral-400">/</span>
            <span className="text-neutral-900">{listing.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Button variant="ghost" asChild>
              <Link href="/listings">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Listings
              </Link>
            </Button>

            <GalleryGrid images={listing.images} title={listing.title} />

            <Card>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="heading-md">{listing.title}</h1>
                    <Badge variant={listing.status === 'available' ? 'success' : 'neutral'}>
                      {listing.status === 'available' ? 'Available' : 'Sold'}
                    </Badge>
                  </div>
                  <div className="flex items-center text-neutral-600 mb-4">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span className="text-lg">{listing.location}</span>
                  </div>
                  <div className="text-3xl font-bold text-primary-600 mb-4">
                    {formatPrice(listing.priceKES)}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-neutral-50 rounded-lg">
                    <Ruler className="w-6 h-6 text-primary-500 mx-auto mb-2" />
                    <div className="text-sm text-neutral-600">Size</div>
                    <div className="font-semibold">{listing.sizeAcres} acres</div>
                  </div>
                  <div className="text-center p-4 bg-neutral-50 rounded-lg">
                    <Calendar className="w-6 h-6 text-primary-500 mx-auto mb-2" />
                    <div className="text-sm text-neutral-600">Payment Plan</div>
                    <div className="font-semibold">{listing.paymentPlan.months} months</div>
                  </div>
                  <div className="text-center p-4 bg-neutral-50 rounded-lg">
                    <div className="text-sm text-neutral-600">Deposit</div>
                    <div className="font-semibold">{formatDeposit(listing.paymentPlan.depositKES)}</div>
                  </div>
                  <div className="text-center p-4 bg-neutral-50 rounded-lg">
                    <div className="text-sm text-neutral-600">Monthly</div>
                    <div className="font-semibold">{formatPrice(monthlyPayment)}</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Property Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {listing.features.map((feature, index) => (
                      <Badge key={index} variant="primary">{feature}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Description</h3>
                  <p className="text-neutral-600 leading-relaxed">{listing.longDescription}</p>
                </div>

                {listing.amenities && listing.amenities.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Amenities</h3>
                    <div className="grid md:grid-cols-2 gap-2">
                      {listing.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary-500 rounded-full" />
                          <span className="text-neutral-600">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold mb-4">Location</h3>
                  <ListingDetailMap listing={listing} />
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Interested in this property?</h3>
                <p className="text-neutral-600">Contact us to schedule a site visit or get more information.</p>
                <div className="space-y-3">
                  <Button size="lg" className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                  <Button variant="success" size="lg" className="w-full">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                  <PaymentPlanModal listing={listing} />
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold mb-4">Payment Plan</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Total Price:</span>
                  <span className="font-semibold">{formatPrice(listing.priceKES)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Deposit:</span>
                  <span className="font-semibold">{formatDeposit(listing.paymentPlan.depositKES)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Monthly Payment:</span>
                  <span className="font-semibold">{formatPrice(monthlyPayment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Duration:</span>
                  <span className="font-semibold">{listing.paymentPlan.months} months</span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Remaining Balance:</span>
                  <span>{formatPrice(listing.priceKES - listing.paymentPlan.depositKES)}</span>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold mb-4">Share this property</h3>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Brochure
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
