import { Project, ProjectLocation } from '@/types/project'

export type ProjectRow = {
  id: string
  name: string
  slug: string
  short_description: string
  locations: ProjectLocation[]
  created_at?: string
  updated_at?: string
}

export function rowToProject(row: ProjectRow): Project {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    short_description: row.short_description ?? '',
    locations: Array.isArray(row.locations) ? row.locations : [],
    created_at: row.created_at,
    updated_at: row.updated_at,
  }
}

export function projectToRow(p: Partial<Project>): ProjectRow {
  return {
    id: p.id ?? '',
    name: p.name ?? '',
    slug: p.slug ?? '',
    short_description: p.short_description ?? '',
    locations: p.locations ?? [],
  }
}

export async function getProjects(): Promise<Project[]> {
  if (
    typeof process !== 'undefined' &&
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    try {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      )
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      if (data?.length) return (data as ProjectRow[]).map(rowToProject)
    } catch (_) {
      // fall through
    }
  }
  return []
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects()
  return projects.find((p) => p.slug === slug) ?? null
}
