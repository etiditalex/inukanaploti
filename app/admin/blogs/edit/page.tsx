'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Card } from '@/components/ui/Card'
import { Blog } from '@/types/blog'
import { BlogRow, rowToBlog } from '@/lib/blogs-data'
import { ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'

export default function EditBlogPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.replace('/admin/login')
        return
      }
      if (!id) {
        router.replace('/admin/blogs')
        return
      }
      const { data, error } = await supabase.from('blogs').select('*').eq('id', id).single()
      if (error || !data) {
        toast.error('Blog not found')
        router.replace('/admin/blogs')
        return
      }
      setBlog(rowToBlog(data as BlogRow))
    }
    check()
  }, [id, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!blog) return
    const now = new Date().toISOString()
    const dbRow = {
      title: blog.title.trim(),
      slug: blog.slug.trim(),
      excerpt: blog.excerpt?.trim() || null,
      content: blog.content.trim(),
      cover_image: blog.coverImage?.trim() || null,
      author: blog.author?.trim() || null,
      published: blog.published,
      published_at: blog.publishedAt,
      updated_at: now,
    }
    setSaving(true)
    const { error } = await supabase.from('blogs').update(dbRow).eq('id', blog.id)
    setSaving(false)
    if (error) {
      toast.error(error.message)
      return
    }
    toast.success('Blog updated')
    router.replace('/admin/blogs')
  }

  if (!blog) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <p className="text-neutral-600">Loading...</p>
      </div>
    )
  }

  return (
    <div>
      <Link href="/admin/blogs" className="inline-flex items-center text-neutral-600 hover:text-primary-600 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to blogs
      </Link>
      <h1 className="text-2xl font-semibold text-neutral-900 mb-6">Edit: {blog.title}</h1>
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Title *</label>
            <Input
              value={blog.title}
              onChange={(e) => setBlog((b) => b ? { ...b, title: e.target.value } : null)}
              placeholder="Post title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Slug (URL)</label>
            <Input
              value={blog.slug}
              onChange={(e) => setBlog((b) => b ? { ...b, slug: e.target.value } : null)}
              placeholder="url-slug"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Excerpt</label>
            <Textarea
              value={blog.excerpt ?? ''}
              onChange={(e) => setBlog((b) => b ? { ...b, excerpt: e.target.value } : null)}
              placeholder="Short summary"
              rows={2}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Content *</label>
            <Textarea
              value={blog.content}
              onChange={(e) => setBlog((b) => b ? { ...b, content: e.target.value } : null)}
              placeholder="Full article content"
              rows={12}
              required
              className="min-h-[200px]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Cover image URL</label>
            <Input
              value={blog.coverImage ?? ''}
              onChange={(e) => setBlog((b) => b ? { ...b, coverImage: e.target.value } : null)}
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Author</label>
            <Input
              value={blog.author ?? ''}
              onChange={(e) => setBlog((b) => b ? { ...b, author: e.target.value } : null)}
              placeholder="Author name"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="published"
              checked={blog.published}
              onChange={(e) => setBlog((b) => b ? { ...b, published: e.target.checked } : null)}
              className="rounded border-neutral-300"
            />
            <label htmlFor="published" className="text-sm font-medium text-neutral-700">Published</label>
          </div>
          <div className="flex gap-3">
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving...' : 'Update post'}
            </Button>
            <Link href="/admin/blogs">
              <Button type="button" variant="outline">Cancel</Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  )
}
