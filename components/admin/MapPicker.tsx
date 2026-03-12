'use client'

import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect, useRef, useState } from 'react'
import { ProjectLocation } from '@/types/project'
import { MapPin, X, Search } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import toast from 'react-hot-toast'

const DEFAULT_CENTER: [number, number] = [39.9093, -3.5107] // [lng, lat] Kilifi
const DEFAULT_ZOOM = 10

export interface MapPickerProps {
  value: ProjectLocation[]
  onChange: (locations: ProjectLocation[]) => void
  disabled?: boolean
}

export function MapPicker({ value, onChange, disabled }: MapPickerProps) {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const valueRef = useRef<ProjectLocation[]>(value)
  const [containerReady, setContainerReady] = useState(false)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<{ place_name: string; center: [number, number] }[]>([])
  const [searching, setSearching] = useState(false)
  valueRef.current = value

  const setMapContainerRef = (el: HTMLDivElement | null) => {
    mapRef.current = el
    setContainerReady(!!el)
  }

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
      const features = (data.features || []).map((f: any) => ({
        place_name: f.place_name,
        center: f.center as [number, number],
      }))
      setSearchResults(features)
      if (features.length === 0) toast('No results found')
    } catch {
      toast.error('Search failed')
      setSearchResults([])
    } finally {
      setSearching(false)
    }
  }

  const addSearchResult = (center: [number, number], place_name: string) => {
    const [lng, lat] = center
    const current = valueRef.current
    onChange([...current, { lat, lng, label: place_name }])
    setSearchQuery('')
    setSearchResults([])
  }

  useEffect(() => {
    if (!containerReady || typeof window === 'undefined') return

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    if (!token || !token.startsWith('pk.')) {
      setError('Add NEXT_PUBLIC_MAPBOX_TOKEN (starts with pk.) to .env.local to use the map.')
      return
    }

    const container = mapRef.current
    if (!container) return

    let cancelled = false
    const init = () => {
      if (cancelled) return
      import('mapbox-gl')
        .then((mod) => {
          if (cancelled) return
          const mapboxgl = mod.default
          mapboxgl.accessToken = token
          const map = new mapboxgl.Map({
            container,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: DEFAULT_CENTER,
            zoom: DEFAULT_ZOOM,
          })
          map.addControl(new mapboxgl.NavigationControl(), 'top-right')

          map.on('load', () => {
            if (cancelled) return
            try {
              map.resize()
            } catch (_) {}
            mapInstanceRef.current = { map, mapboxgl }
            setReady(true)
            addMarkersFromValue()
          })

          map.on('error', (e: { error?: { message?: string } }) => {
            if (cancelled) return
            setError(e?.error?.message || 'Map failed to load')
          })

          if (!disabled) {
            map.on('click', (e: { lngLat: { lng: number; lat: number } }) => {
              const { lng, lat } = e.lngLat
              const current = valueRef.current
              onChange([...current, { lat, lng, label: `Location ${current.length + 1}` }])
            })
          }
        })
        .catch((err) => {
          if (!cancelled) {
            setError('Failed to load map.')
            console.error(err)
          }
        })
    }

    const t = setTimeout(init, 150)
    return () => {
      cancelled = true
      clearTimeout(t)
      markersRef.current.forEach((m) => {
        try {
          m.remove?.()
        } catch (_) {}
      })
      markersRef.current = []
      if (mapInstanceRef.current?.map) {
        try {
          mapInstanceRef.current.map.remove()
        } catch (_) {}
        mapInstanceRef.current = null
      }
    }
  }, [containerReady])

  const addMarkersFromValue = () => {
    const { map, mapboxgl } = mapInstanceRef.current || {}
    if (!map || !mapboxgl) return
    markersRef.current.forEach((m) => {
      try {
        m.remove?.()
      } catch (_) {}
    })
    markersRef.current = []
    value.forEach((loc, i) => {
      const el = document.createElement('div')
      el.className = 'cursor-pointer'
      el.innerHTML = `<div class="w-8 h-8 bg-primary-500 rounded-full border-2 border-white shadow flex items-center justify-center"><svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg></div>`
      const marker = new mapboxgl.Marker(el)
        .setLngLat([loc.lng, loc.lat])
        .addTo(map)
      markersRef.current.push(marker)
    })
  }

  useEffect(() => {
    if (ready && mapInstanceRef.current) addMarkersFromValue()
  }, [value, ready])

  const removeAt = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  if (error) {
    return (
      <div className="rounded-xl border border-neutral-300 bg-neutral-50 p-6 text-center">
        <MapPin className="w-10 h-10 mx-auto text-neutral-400 mb-2" />
        <p className="text-neutral-600 text-sm">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {!disabled && (
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleSearch())}
              placeholder="Search location (e.g. Kilifi, Diani)..."
              className="pl-9"
            />
          </div>
          <button
            type="button"
            onClick={handleSearch}
            disabled={searching}
            className="px-4 py-2 rounded-xl bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 disabled:opacity-50"
          >
            {searching ? 'Searching...' : 'Search'}
          </button>
        </div>
      )}
      {!disabled && searchResults.length > 0 && (
        <ul className="rounded-lg border border-neutral-200 bg-white divide-y divide-neutral-100 max-h-40 overflow-y-auto">
          {searchResults.map((r, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => addSearchResult(r.center, r.place_name)}
                className="w-full text-left px-3 py-2 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-800"
              >
                {r.place_name}
              </button>
            </li>
          ))}
        </ul>
      )}
      <div
        ref={setMapContainerRef}
        className="w-full h-72 rounded-xl overflow-hidden border border-neutral-300 bg-neutral-100"
        style={{ pointerEvents: disabled ? 'none' : 'auto', minHeight: 288 }}
      />
      {!disabled && (
        <p className="text-sm text-neutral-600">Search above or click on the map to add a location pin.</p>
      )}
      {value.length > 0 && (
        <ul className="space-y-2">
          {value.map((loc, i) => (
            <li
              key={`${loc.lat}-${loc.lng}-${i}`}
              className="flex items-center justify-between gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm"
            >
              <span className="text-neutral-700">
                {loc.label || `Pin ${i + 1}`} — {loc.lat.toFixed(5)}, {loc.lng.toFixed(5)}
              </span>
              {!disabled && (
                <button
                  type="button"
                  onClick={() => removeAt(i)}
                  className="p-1 rounded text-neutral-500 hover:bg-red-50 hover:text-red-600"
                  aria-label="Remove"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
