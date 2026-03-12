import { Testimonial } from '@/types/testimonial'

export type TestimonialRow = {
  id: string
  quote: string
  author_name: string
  author_role: string | null
  display_order: number
  created_at: string
  updated_at: string
}

export function rowToTestimonial(row: TestimonialRow): Testimonial {
  return {
    id: row.id,
    quote: row.quote,
    authorName: row.author_name,
    authorRole: row.author_role ?? null,
    displayOrder: row.display_order ?? 0,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
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
        .from('testimonials')
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false })
      if (error) return []
      if (data?.length) {
        return (data as TestimonialRow[]).map(rowToTestimonial)
      }
    } catch (_) {}
  }
  return []
}
