export interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  coverImage: string | null
  author: string | null
  published: boolean
  publishedAt: string
  createdAt: string
  updatedAt: string
}
