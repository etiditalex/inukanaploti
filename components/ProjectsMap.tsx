'use client'

import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect, useRef, useState } from 'react'
import { Project } from '@/types/project'
import { MapPin } from 'lucide-react'

const DEFAULT_CENTER: [number, number] = [39.9093, -3.5107]
const DEFAULT_ZOOM = 10

export function ProjectsMap({ projects }: { projects: Project[] }) {
  const mapRef = useRef<HTMLDivElement>(null)
  const markersRef = useRef<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    if (!token) {
      setError('Map is not configured.')
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
          const allPoints: { lng: number; lat: number; project: Project; loc: { lat: number; lng: number; label?: string } }[] = []
          projects.forEach((project) => {
            (project.locations || []).forEach((loc) => {
              allPoints.push({ lng: loc.lng, lat: loc.lat, project, loc })
            })
          })
          allPoints.forEach(({ lng, lat, project, loc }) => {
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
                <h3 class="font-semibold text-neutral-900">${escapeHtml(project.name)}</h3>
                ${loc.label ? `<p class="text-sm text-neutral-600 mt-0.5">${escapeHtml(loc.label)}</p>` : ''}
                ${project.short_description ? `<p class="text-sm text-neutral-500 mt-1">${escapeHtml(project.short_description)}</p>` : ''}
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
      markersRef.current.forEach((m) => {
        try {
          m.remove?.()
        } catch (_) {}
      })
      markersRef.current = []
    }
  }, [projects])

  function escapeHtml(s: string) {
    const div = document.createElement('div')
    div.textContent = s
    return div.innerHTML
  }

  if (error) {
    return (
      <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-8 text-center">
        <MapPin className="w-12 h-12 mx-auto text-neutral-400 mb-2" />
        <p className="text-neutral-600">{error}</p>
      </div>
    )
  }

  const totalLocations = projects.reduce((sum, p) => sum + (p.locations?.length || 0), 0)

  return (
    <div className="space-y-4">
      <div
        ref={mapRef}
        className="w-full h-[420px] rounded-xl overflow-hidden border border-neutral-200"
      />
      <p className="text-sm text-neutral-500">
        {projects.length} project{projects.length !== 1 ? 's' : ''} · {totalLocations} location{totalLocations !== 1 ? 's' : ''} on map
      </p>
    </div>
  )
}
