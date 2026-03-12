'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Card } from '@/components/ui/Card'
import { ImageUpload } from '@/components/admin/ImageUpload'
import { ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'

function slugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

export default function NewBlogPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) router.replace('/admin/login')
    }
    check()
  }, [router])

  useEffect(() => {
    if (title && !slug) setSlug(slugFromTitle(title))
  }, [title])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const finalSlug = (slug || slugFromTitle(title)).trim() || 'post-' + Date.now()
    const now = new Date().toISOString()
    const dbRow = {
      title: title.trim(),
      slug: finalSlug,
      excerpt: excerpt.trim() || null,
      content: content.trim(),
      cover_image: coverImage.trim() || null,
      author: author.trim() || null,
      published,
      published_at: now,
      created_at: now,
      updated_at: now,
    }
    setLoading(true)
    const { error } = await supabase.from('blogs').insert(dbRow)
    setLoading(false)
    if (error) {
      toast.error(error.message)
      return
    }
    toast.success('Blog post created')
    router.replace('/admin/blogs')
  }

  return (
    <div>
      <Link href="/admin/blogs" className="inline-flex items-center text-neutral-600 hover:text-primary-600 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to blogs
      </Link>
      <h1 className="text-2xl font-semibold text-neutral-900 mb-6">New blog post</h1>
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Title *</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Slug (URL)</label>
            <Input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder={slugFromTitle(title) || 'url-slug'}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Excerpt</label>
            <Textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Short summary for listings"
              rows={2}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Content *</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Full article content (plain text or markdown)"
              rows={12}
              required
              className="min-h-[200px]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Cover image</label>
            <p className="text-sm text-neutral-500 mb-2">Upload from your device.</p>
            <ImageUpload
              value={coverImage ? [coverImage] : []}
              onChange={(urls) => setCoverImage(urls[0] ?? '')}
              maxFiles={1}
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Author</label>
            <Input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Author name"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="published"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="rounded border-neutral-300"
            />
            <label htmlFor="published" className="text-sm font-medium text-neutral-700">Published (visible on blog)</label>
          </div>
          <div className="flex gap-3">
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Create post'}
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
