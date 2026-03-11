'use client'

import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect, useRef, useState } from 'react'
import { Listing } from '@/types/listing'
import { MapPin, Search } from 'lucide-react'
import { Input } from '@/components/ui/Input'

const DEFAULT_CENTER: [number, number] = [39.9093, -3.5107]
const DEFAULT_ZOOM = 10

function escapeHtml(s: string) {
  if (typeof document === 'undefined') return s
  const div = document.createElement('div')
  div.textContent = s
  return div.innerHTML
}

export function ListingsMap({ listings }: { listings: Listing[] }) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<{ place_name: string; center: [number, number] }[]>([])
  const [searching, setSearching] = useState(false)

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    if (!token) {
      setError('Map is not configured.')
      return
    }
    if (!mapRef.current) return

    const points: { lng: number; lat: number; listing: Listing; label?: string }[] = []
    listings.forEach((listing) => {
      const mapLocs = listing.mapLocations && listing.mapLocations.length > 0
      if (mapLocs) {
        listing.mapLocations!.forEach((loc) => {
          points.push({ lng: loc.lng, lat: loc.lat, listing, label: loc.label })
        })
      } else {
        points.push({
          lng: listing.coords.lng,
          lat: listing.coords.lat,
          listing,
          label: listing.location,
        })
      }
    })

    let mapboxgl: any
    const init = async () => {
      try {
        mapboxgl = (await import('mapbox-gl')).default
        mapboxgl.accessToken = token
        const map = new mapboxgl.Map({
          container: mapRef.current!,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: DEFAULT_CENTER,
          zoom: DEFAULT_ZOOM,
        })
        map.addControl(new mapboxgl.NavigationControl(), 'top-right')
        mapInstanceRef.current = map

        map.on('load', () => {
          points.forEach(({ lng, lat, listing, label }) => {
            const el = document.createElement('div')
            el.className = 'cursor-pointer'
            el.innerHTML = `
              <div class="w-8 h-8 bg-primary-500 rounded-full border-2 border-white shadow flex items-center justify-center hover:scale-110 transition-transform">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                </svg>
              </div>
            `
            const popupHtml = `
              <div class="p-3 max-w-xs">
                <h3 class="font-semibold text-neutral-900">${escapeHtml(listing.title)}</h3>
                ${label ? `<p class="text-sm text-neutral-600 mt-0.5">${escapeHtml(label)}</p>` : ''}
                <p class="text-sm text-neutral-500 mt-1">${escapeHtml(listing.shortDescription || '')}</p>
                <p class="text-lg font-bold text-primary-600 mt-1">KES ${listing.priceKES.toLocaleString()}</p>
                <a href="/listings/${listing.slug}" class="block w-full text-center bg-primary-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-primary-600 mt-2">View listing</a>
              </div>
            `
            const marker = new mapboxgl.Marker(el)
              .setLngLat([lng, lat])
              .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(popupHtml))
              .addTo(map)
            markersRef.current.push(marker)
          })
        })
      } catch (err) {
        setError('Failed to load map.')
        console.error(err)
      }
    }
    init()
    return () => {
      mapInstanceRef.current = null
      markersRef.current.forEach((m) => m.remove())
      markersRef.current = []
    }
  }, [listings])

  const handleSearch = async () => {
    const q = searchQuery.trim()
    if (!q) return
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    if (!token) return
    setSearching(true)
    try {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(q)}.json?access_token=${token}&limit=5&country=KE`
      )
      const data = await res.json()
      setSearchResults((data.features || []).map((f: any) => ({
        place_name: f.place_name,
        center: f.center as [number, number],
      })))
    } catch {
      setSearchResults([])
    } finally {
      setSearching(false)
    }
  }

  const flyToResult = (center: [number, number]) => {
    const map = mapInstanceRef.current
    if (!map) return
    map.flyTo({ center, zoom: 14, duration: 1500 })
    setSearchResults([])
    setSearchQuery('')
  }

  const totalPins = listings.reduce((sum, l) => {
    const locs = l.mapLocations && l.mapLocations.length > 0 ? l.mapLocations.length : 1
    return sum + locs
  }, 0)

  return (
    <div className="space-y-4">
      {/* Map container: map fills the box, search bar overlaid on top */}
      <div className="relative w-full h-[480px] rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100">
        {/* Map (always rendered so it can load when token is available) */}
        <div
          ref={mapRef}
          className="absolute inset-0 w-full h-full"
        />
        {/* Error message only when map failed */}
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-100 p-6 text-center">
            <MapPin className="w-12 h-12 text-neutral-400 mb-2" />
            <p className="text-neutral-600">{error}</p>
            <p className="text-sm text-neutral-500 mt-1">Add NEXT_PUBLIC_MAPBOX_TOKEN to .env.local</p>
          </div>
        )}
        {/* Search bar overlay on top of map */}
        <div className="absolute top-3 left-3 right-3 z-10 flex gap-2">
          <div className="flex-1 relative bg-white rounded-lg shadow-md border border-neutral-200">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleSearch())}
              placeholder="Search location (e.g. Kilifi, Diani, Mombasa)..."
              className="pl-9 border-0 focus-visible:ring-0"
            />
          </div>
          <button
            type="button"
            onClick={handleSearch}
            disabled={searching}
            className="px-4 py-2 rounded-lg bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 disabled:opacity-50 shadow-md whitespace-nowrap"
          >
            {searching ? '...' : 'Search'}
          </button>
        </div>
        {/* Search results dropdown below search bar */}
        {searchResults.length > 0 && (
          <ul className="absolute top-[52px] left-3 right-3 z-10 rounded-lg border border-neutral-200 bg-white divide-y divide-neutral-100 max-h-48 overflow-y-auto shadow-lg">
            {searchResults.map((r, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => flyToResult(r.center)}
                  className="w-full text-left px-3 py-2.5 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-800"
                >
                  {r.place_name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <p className="text-sm text-neutral-500">
        {listings.length} listing{listings.length !== 1 ? 's' : ''} · {totalPins} location{totalPins !== 1 ? 's' : ''} on map
      </p>
    </div>
  )
}
