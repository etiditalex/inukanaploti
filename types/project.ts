export interface ProjectLocation {
  lat: number
  lng: number
  label?: string
}

export interface Project {
  id: string
  name: string
  slug: string
  short_description: string
  locations: ProjectLocation[]
  created_at?: string
  updated_at?: string
}
