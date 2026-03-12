'use client'

import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect, useRef, useState } from 'react'
import { Listing } from '@/types/listing'
import { MapPin } from 'lucide-react'

const DEFAULT_CENTER: [number, number] = [39.9093, -3.5107]
const DEFAULT_ZOOM = 12

function escapeHtml(s: string) {
  if (typeof document === 'undefined') return s
  const div = document.createElement('div')
  div.textContent = s
  return div.innerHTML
}

export function ListingDetailMap({ listing }: { listing: Listing }) {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const [containerReady, setContainerReady] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const setMapContainerRef = (el: HTMLDivElement | null) => {
    mapRef.current = el
    setContainerReady(!!el)
  }

  useEffect(() => {
    if (!containerReady || typeof window === 'undefined') return

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    if (!token || !token.startsWith('pk.')) {
      setError('Map is not configured.')
      return
    }

    const container = mapRef.current
    if (!container) return

    const points: { lng: number; lat: number; label: string }[] = []

    if (listing.mapLocations && listing.mapLocations.length > 0) {
      listing.mapLocations.forEach((loc) => {
        points.push({ lng: loc.lng, lat: loc.lat, label: loc.label || listing.location })
      })
    }
    if (points.length === 0) {
      points.push({
        lng: listing.coords.lng,
        lat: listing.coords.lat,
        label: listing.location,
      })
    }

    let cancelled = false
    const t = setTimeout(() => {
      if (cancelled) return
      import('mapbox-gl')
        .then((mod) => {
          if (cancelled) return
          const mapboxgl = mod.default
          mapboxgl.accessToken = token
          const map = new mapboxgl.Map({
            container,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: points.length ? [points[0].lng, points[0].lat] : DEFAULT_CENTER,
            zoom: DEFAULT_ZOOM,
          })
          map.addControl(new mapboxgl.NavigationControl(), 'top-right')
          mapInstanceRef.current = map

          map.on('load', () => {
            if (cancelled) return
            try {
              map.resize()
            } catch (_) {}
            points.forEach(({ lng, lat, label }) => {
              const el = document.createElement('div')
              el.className = 'cursor-default'
              el.innerHTML = `
                <div class="w-8 h-8 bg-primary-500 rounded-full border-2 border-white shadow flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                  </svg>
                </div>
              `
              const popupHtml = `
                <div class="p-3 max-w-xs">
                  <p class="text-sm font-medium text-neutral-900">${escapeHtml(listing.title)}</p>
                  <p class="text-sm text-neutral-600 mt-0.5">${escapeHtml(label)}</p>
                </div>
              `
              const marker = new mapboxgl.Marker(el)
                .setLngLat([lng, lat])
                .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(popupHtml))
                .addTo(map)
              markersRef.current.push(marker)
            })
            if (points.length > 1) {
              const lngs = points.map((p) => p.lng)
              const lats = points.map((p) => p.lat)
              const bounds = [
                [Math.min(...lngs), Math.min(...lats)],
                [Math.max(...lngs), Math.max(...lats)],
              ] as [[number, number], [number, number]]
              map.fitBounds(bounds, { padding: 50, maxZoom: 14 })
            }
          })

          map.on('error', (e: { error?: { message?: string } }) => {
            if (cancelled) return
            setError(e?.error?.message || 'Map failed to load')
          })
        })
        .catch((err) => {
          if (!cancelled) {
            setError('Failed to load map.')
            console.error(err)
          }
        })
    }, 150)

    return () => {
      cancelled = true
      clearTimeout(t)
      markersRef.current.forEach((m) => {
        try {
          m.remove?.()
        } catch (_) {}
      })
      markersRef.current = []
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove()
        } catch (_) {}
        mapInstanceRef.current = null
      }
    }
  }, [containerReady, listing])

  if (error) {
    return (
      <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 text-center">
        <MapPin className="w-10 h-10 mx-auto text-neutral-400 mb-2" />
        <p className="text-sm text-neutral-600">{error}</p>
      </div>
    )
  }

  return (
    <div className="relative w-full h-72 sm:h-80 rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100" style={{ minHeight: 288 }}>
      <div ref={setMapContainerRef} className="absolute inset-0 w-full h-full" />
    </div>
  )
}
