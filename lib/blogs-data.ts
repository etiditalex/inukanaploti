import { Blog } from '@/types/blog'

export type BlogRow = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  cover_image: string | null
  author: string | null
  published: boolean
  published_at: string
  created_at: string
  updated_at: string
}

export function rowToBlog(row: BlogRow): Blog {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt ?? null,
    content: row.content ?? '',
    coverImage: row.cover_image ?? null,
    author: row.author ?? null,
    published: row.published ?? true,
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export function blogToRow(blog: Partial<Blog>): Partial<BlogRow> {
  const row: Partial<BlogRow> = {}
  if (blog.id != null) row.id = blog.id
  if (blog.title != null) row.title = blog.title
  if (blog.slug != null) row.slug = blog.slug
  if (blog.excerpt != null) row.excerpt = blog.excerpt
  if (blog.content != null) row.content = blog.content
  if (blog.coverImage != null) row.cover_image = blog.coverImage
  if (blog.author != null) row.author = blog.author
  if (blog.published != null) row.published = blog.published
  if (blog.publishedAt != null) row.published_at = blog.publishedAt
  if (blog.createdAt != null) row.created_at = blog.createdAt
  if (blog.updatedAt != null) row.updated_at = blog.updatedAt
  return row
}

export async function getBlogs(): Promise<Blog[]> {
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
        .from('blogs')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false })
      if (error) return []
      if (data && data.length > 0) {
        return (data as BlogRow[]).map(rowToBlog)
      }
    } catch (_) {
      // table may not exist yet
    }
  }
  return []
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const blogs = await getBlogs()
  const decoded = slug ? decodeURIComponent(slug) : ''
  return blogs.find((b) => b.slug === decoded) ?? null
}

/** Fetch all published blogs for admin (and for static params). */
export async function getAllBlogsForAdmin(): Promise<Blog[]> {
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
        .from('blogs')
        .select('*')
        .order('published_at', { ascending: false })
      if (error) throw error
      if (data && data.length > 0) {
        return (data as BlogRow[]).map(rowToBlog)
      }
    } catch (_) {
      // fall through
    }
  }
  return []
}
