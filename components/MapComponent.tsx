'use client'

import { useEffect, useRef, useState } from 'react'
import { MapPin } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

interface MapComponentProps {
  listings: any[]
  hoveredListing?: string | null
  onListingHover?: (listingId: string) => void
  onListingLeave?: () => void
}

export function MapComponent({ 
  listings, 
  hoveredListing, 
  onListingHover, 
  onListingLeave 
}: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)
  const [markers, setMarkers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current) return

      try {
        const mapProvider = process.env.NEXT_PUBLIC_MAP_PROVIDER || 'mapbox'
        
        if (mapProvider === 'mapbox') {
          await initMapbox()
        } else if (mapProvider === 'google') {
          await initGoogleMaps()
        } else {
          throw new Error('No map provider configured')
        }
      } catch (err) {
        console.error('Map initialization failed:', err)
        setError('Map could not be loaded. Please check your configuration.')
        setIsLoading(false)
      }
    }

    const initMapbox = async () => {
      const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
      
      if (!mapboxToken) {
        throw new Error('Mapbox token not found')
      }

      // Dynamic import for Mapbox GL JS
      const mapboxgl = (await import('mapbox-gl')).default
      mapboxgl.accessToken = mapboxToken

      const mapInstance = new mapboxgl.Map({
        container: mapRef.current!,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-3.5107, 39.9093], // Kilifi coordinates
        zoom: 10,
        attributionControl: false
      })

      mapInstance.on('load', () => {
        setIsLoading(false)
        setMap(mapInstance)
        addMapboxMarkers(mapInstance)
      })
    }

    const initGoogleMaps = async () => {
      const googleMapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      
      if (!googleMapsKey) {
        throw new Error('Google Maps API key not found')
      }

      // Load Google Maps script
      if (!window.google) {
        const script = document.createElement('script')
        script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsKey}&libraries=places`
        script.async = true
        script.defer = true
        document.head.appendChild(script)
        
        script.onload = () => {
          initGoogleMap()
        }
      } else {
        initGoogleMap()
      }
    }

    const initGoogleMap = () => {
      const mapInstance = new window.google.maps.Map(mapRef.current!, {
        center: { lat: -3.5107, lng: 39.9093 },
        zoom: 10,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      })

      setIsLoading(false)
      setMap(mapInstance)
      addGoogleMarkers(mapInstance)
    }

    const addMapboxMarkers = (mapInstance: any) => {
      const newMarkers: any[] = []
      
      listings.forEach((listing) => {
        const el = document.createElement('div')
        el.className = 'map-marker'
        el.innerHTML = `
          <div class="w-8 h-8 bg-primary-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
            </svg>
          </div>
        `

        const marker = new (window as any).mapboxgl.Marker(el)
          .setLngLat([listing.coords.lng, listing.coords.lat])
          .setPopup(
            new (window as any).mapboxgl.Popup({ offset: 25 })
              .setHTML(createPopupContent(listing))
          )
          .addTo(mapInstance)

        // Add hover effects
        el.addEventListener('mouseenter', () => {
          onListingHover?.(listing.id)
        })
        el.addEventListener('mouseleave', () => {
          onListingLeave?.()
        })

        newMarkers.push(marker)
      })

      setMarkers(newMarkers)
    }

    const addGoogleMarkers = (mapInstance: any) => {
      const newMarkers: any[] = []
      
      listings.forEach((listing) => {
        const marker = new window.google.maps.Marker({
          position: { lat: listing.coords.lat, lng: listing.coords.lng },
          map: mapInstance,
          title: listing.title,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#2dabe1',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2
          }
        })

        const infoWindow = new window.google.maps.InfoWindow({
          content: createPopupContent(listing)
        })

        marker.addListener('click', () => {
          infoWindow.open(mapInstance, marker)
        })

        marker.addListener('mouseover', () => {
          onListingHover?.(listing.id)
        })

        marker.addListener('mouseout', () => {
          onListingLeave?.()
        })

        newMarkers.push(marker)
      })

      setMarkers(newMarkers)
    }

    const createPopupContent = (listing: any) => {
      return `
        <div class="p-4 max-w-xs">
          <div class="space-y-2">
            <h3 class="font-semibold text-neutral-900">${listing.title}</h3>
            <p class="text-sm text-neutral-600">${listing.location}</p>
            <p class="text-lg font-bold text-primary-600">${new Intl.NumberFormat('en-KE', {
              style: 'currency',
              currency: 'KES',
              minimumFractionDigits: 0,
            }).format(listing.priceKES)}</p>
            <div class="flex items-center space-x-2">
              <span class="text-sm text-neutral-500">${listing.sizeAcres} acres</span>
              <span class="px-2 py-1 text-xs rounded-full ${listing.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-700'}">
                ${listing.status}
              </span>
            </div>
            <a href="/listings/${listing.slug}" class="block w-full text-center bg-primary-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-600 transition-colors">
              View Details
            </a>
          </div>
        </div>
      `
    }

    initMap()
  }, [listings, onListingHover, onListingLeave])

  // Update marker styles based on hover state
  useEffect(() => {
    if (!map || !markers.length) return

    markers.forEach((marker, index) => {
      const listing = listings[index]
      if (!listing) return

      const isHovered = hoveredListing === listing.id
      
      if (process.env.NEXT_PUBLIC_MAP_PROVIDER === 'mapbox') {
        // Update Mapbox marker style
        const el = marker.getElement()
        if (el) {
          el.style.transform = isHovered ? 'scale(1.2)' : 'scale(1)'
          el.style.zIndex = isHovered ? '1000' : '1'
        }
      } else if (process.env.NEXT_PUBLIC_MAP_PROVIDER === 'google') {
        // Update Google Maps marker style
        marker.setIcon({
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: isHovered ? 10 : 8,
          fillColor: isHovered ? '#ec1c26' : '#2dabe1',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2
        })
      }
    })
  }, [hoveredListing, markers, listings, map])

  if (error) {
    return (
      <Card className="p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MapPin className="w-8 h-8 text-red-500" />
        </div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-2">
          Map Unavailable
        </h3>
        <p className="text-neutral-600 mb-4">{error}</p>
        <p className="text-sm text-neutral-500">
          Please check your map configuration or contact support.
        </p>
      </Card>
    )
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 bg-neutral-100 rounded-xl flex items-center justify-center z-10">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-sm text-neutral-600">Loading map...</p>
          </div>
        </div>
      )}
      
      <div 
        ref={mapRef} 
        className="w-full h-96 rounded-xl overflow-hidden"
        style={{ minHeight: '400px' }}
      />
      
      {!isLoading && (
        <div className="mt-4 flex items-center justify-between text-sm text-neutral-600">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-neutral-400 rounded-full"></div>
              <span>Sold</span>
            </div>
          </div>
          <p className="text-xs">
            {listings.length} properties shown
          </p>
        </div>
      )}
    </div>
  )
}
