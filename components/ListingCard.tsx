import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Ruler, Calendar, Phone, MessageCircle } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Listing } from '@/types/listing'

interface ListingCardProps {
  listing: Listing
  onMarkerHover?: () => void
  onMarkerLeave?: () => void
}

export function ListingCard({ listing, onMarkerHover, onMarkerLeave }: ListingCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const formatDeposit = (deposit: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(deposit)
  }

  return (
        <Card 
          className="group cursor-pointer touch-manipulation property-card-android"
          onMouseEnter={onMarkerHover}
          onMouseLeave={onMarkerLeave}
        >
      <Link href={`/listings/${listing.slug}`} className="block">
        <div className="space-y-4">
          {/* Image */}
          <div className="relative h-48 sm:h-56 w-full overflow-hidden rounded-xl">
            <Image
              src={listing.images[0]}
              alt={`${listing.title} - Premium land investment in ${listing.location} - ${listing.sizeAcres} acres available`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={80}
              loading="lazy"
            />
            <div className="absolute top-4 right-4">
              <Badge 
                variant={listing.status === 'available' ? 'success' : 'neutral'}
              >
                {listing.status === 'available' ? 'Available' : 'Sold'}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-3">
            <div>
              <h3 className="heading-sm text-neutral-900 group-hover:text-primary-600 transition-colors text-modern">
                {listing.title}
              </h3>
              <div className="flex items-center text-neutral-600 mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">{listing.location}</span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="price-display-sm text-primary-600">
                {formatPrice(listing.priceKES)}
              </div>
              <div className="flex items-center justify-between text-sm text-neutral-600">
                <div className="flex items-center">
                  <Ruler className="w-4 h-4 mr-1" />
                  <span>{listing.sizeAcres} acres</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{listing.paymentPlan.months} months</span>
                </div>
              </div>
            </div>

            {/* Payment Plan */}
            <div className="bg-neutral-50 rounded-lg p-3">
              <div className="text-sm text-neutral-600 mb-1">Payment Plan</div>
              <div className="text-lg font-semibold text-neutral-900">
                {formatDeposit(listing.paymentPlan.depositKES)} deposit
              </div>
              <div className="text-sm text-neutral-600">
                {formatPrice((listing.priceKES - listing.paymentPlan.depositKES) / listing.paymentPlan.months)}/month
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-2">
              {listing.features.slice(0, 3).map((feature, index) => (
                <Badge key={index} variant="primary" size="sm">
                  {feature}
                </Badge>
              ))}
              {listing.features.length > 3 && (
                <Badge variant="neutral" size="sm">
                  +{listing.features.length - 3} more
                </Badge>
              )}
            </div>

            {/* Description */}
            <p className="text-neutral-600 text-sm line-clamp-2">
              {listing.shortDescription}
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <Button 
                    variant="primary" 
                    size="sm" 
                    className="flex-1 touch-manipulation android-button"
                    style={{ minHeight: '48px' }}
                    asChild
                  >
                    <Link href={`/listings/${listing.slug}`}>
                      View Details
                    </Link>
                  </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="flex-1 touch-manipulation android-button"
                style={{ minHeight: '48px' }}
                asChild
              >
                <a href="tel:+254724027747">
                  <Phone className="w-4 h-4" />
                </a>
              </Button>
              <Button 
                variant="success" 
                size="sm"
                className="flex-1 touch-manipulation android-button"
                style={{ minHeight: '48px' }}
                asChild
              >
                <a href={`https://wa.me/254783027747?text=Hi, I'm interested in ${listing.title}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  )
}
