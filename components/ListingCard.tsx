import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Ruler, Calendar, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Listing } from '@/types/listing'

const FALLBACK_IMAGE = 'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758705419/inukanaploti_logo_v7btur.jpg'

interface ListingCardProps {
  listing: Listing
  onMarkerHover?: () => void
  onMarkerLeave?: () => void
}

export function ListingCard({ listing, onMarkerHover, onMarkerLeave }: ListingCardProps) {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price)

  const imageUrl = listing.images?.[0] || FALLBACK_IMAGE

  return (
    <Card
      className="group cursor-pointer touch-manipulation property-card-android overflow-hidden"
      onMouseEnter={onMarkerHover}
      onMouseLeave={onMarkerLeave}
    >
      <Link href={`/listings/${encodeURIComponent(listing.slug)}`} className="block">
        <div className="space-y-3">
          {/* Image */}
          <div className="relative h-44 sm:h-48 w-full overflow-hidden rounded-t-xl -mx-px -mt-px">
            <Image
              src={imageUrl}
              alt={listing.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={75}
              loading="lazy"
            />
            <div className="absolute top-3 right-3">
              <Badge variant={listing.status === 'available' ? 'success' : 'neutral'} className="text-xs">
                {listing.status === 'available' ? 'Available' : 'Sold'}
              </Badge>
            </div>
          </div>

          {/* Content — keep card light; full details on listing page */}
          <div className="space-y-2 px-1 pb-1">
            <h3 className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors line-clamp-2">
              {listing.title}
            </h3>
            <div className="flex items-center text-neutral-600 text-sm">
              <MapPin className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
              <span className="truncate">{listing.location}</span>
            </div>
            <div className="text-lg font-bold text-primary-600">
              {formatPrice(listing.priceKES)}
            </div>
            <div className="flex items-center gap-3 text-sm text-neutral-500">
              <span className="flex items-center">
                <Ruler className="w-3.5 h-3.5 mr-1" />
                {listing.sizeAcres} acres
              </span>
              <span className="flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1" />
                {listing.paymentPlan.months} months
              </span>
            </div>

            <Button
              variant="primary"
              size="sm"
              className="w-full mt-2 group-hover:bg-primary-600"
              style={{ minHeight: '44px' }}
              asChild
            >
              <span className="inline-flex items-center justify-center gap-1.5">
                View more
                <ArrowRight className="w-4 h-4" />
              </span>
            </Button>
          </div>
        </div>
      </Link>
    </Card>
  )
}
