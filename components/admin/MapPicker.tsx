'use client'

import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect, useRef, useState } from 'react'
import { ProjectLocation } from '@/types/project'
import { MapPin, X } from 'lucide-react'
import toast from 'react-hot-toast'

const DEFAULT_CENTER: [number, number] = [39.9093, -3.5107] // [lng, lat] Kilifi
const DEFAULT_ZOOM = 10

export interface MapPickerProps {
  value: ProjectLocation[]
  onChange: (locations: ProjectLocation[]) => void
  disabled?: boolean
}

export function MapPicker({ value, onChange, disabled }: MapPickerProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const valueRef = useRef<ProjectLocation[]>(value)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string | null>(null)
  valueRef.current = value

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    if (!token) {
      setError('Add NEXT_PUBLIC_MAPBOX_TOKEN to .env.local to use the map.')
      return
    }
    if (!mapRef.current) return

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

        map.on('load', () => {
          mapInstanceRef.current = { map, mapboxgl }
          setReady(true)
          addMarkersFromValue()
        })

        if (!disabled) {
          map.on('click', (e: { lngLat: { lng: number; lat: number } }) => {
            const { lng, lat } = e.lngLat
            const current = valueRef.current
            onChange([...current, { lat, lng, label: `Location ${current.length + 1}` }])
          })
        }
      } catch (err) {
        setError('Failed to load map.')
        console.error(err)
      }
    }
    init()
    return () => {
      if (mapInstanceRef.current?.map) {
        mapInstanceRef.current.map.remove()
        mapInstanceRef.current = null
      }
      markersRef.current = []
    }
  }, [])

  const addMarkersFromValue = () => {
    const { map, mapboxgl } = mapInstanceRef.current || {}
    if (!map || !mapboxgl) return
    markersRef.current.forEach((m) => m.remove())
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
      <div
        ref={mapRef}
        className="w-full h-72 rounded-xl overflow-hidden border border-neutral-300"
        style={{ pointerEvents: disabled ? 'none' : 'auto' }}
      />
      {!disabled && (
        <p className="text-sm text-neutral-600">Click on the map to add a location pin.</p>
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
