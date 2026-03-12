'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Blog } from '@/types/blog'
import { BlogRow, rowToBlog } from '@/lib/blogs-data'
import { Plus, Pencil, Trash2, ExternalLink } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminBlogsPage() {
  const router = useRouter()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchBlogs = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.replace('/admin/login')
      return
    }
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('published_at', { ascending: false })
    if (error) {
      toast.error('Failed to load blogs. Run supabase/blogs-schema.sql if you haven’t.')
      setBlogs([])
    } else {
      setBlogs((data as BlogRow[]).map(rowToBlog))
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchBlogs()
  }, [router])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this blog post? This cannot be undone.')) return
    setDeletingId(id)
    const { error } = await supabase.from('blogs').delete().eq('id', id)
    setDeletingId(null)
    if (error) {
      toast.error(error.message)
      return
    }
    setBlogs((prev) => prev.filter((b) => b.id !== id))
    toast.success('Blog deleted')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <p className="text-neutral-600">Loading blogs...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">Blogs</h1>
          <p className="text-neutral-600 mt-1">
            Write and manage articles. New posts appear on the public blog page.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/blog" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm">
              <ExternalLink className="w-4 h-4 mr-2" />
              View blog
            </Button>
          </Link>
          <Link href="/admin/blogs/new">
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              New post
            </Button>
          </Link>
        </div>
      </div>
      {blogs.length === 0 ? (
        <Card className="py-12 text-center">
          <p className="text-neutral-600 mb-4">No blog posts yet.</p>
          <Link href="/admin/blogs/new">
            <Button><Plus className="w-4 h-4 mr-2" /> Write your first post</Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <Card key={blog.id} className="flex flex-wrap items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h2 className="font-semibold text-neutral-900 truncate">{blog.title}</h2>
                <p className="text-sm text-neutral-600 line-clamp-1">{blog.excerpt || blog.content?.slice(0, 80) || '—'}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={blog.published ? 'success' : 'neutral'}>
                    {blog.published ? 'Published' : 'Draft'}
                  </Badge>
                  {blog.author && (
                    <span className="text-sm text-neutral-500">{blog.author}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {blog.published && (
                  <Link href={`/blog/${encodeURIComponent(blog.slug)}`} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </Link>
                )}
                <Link href={`/admin/blogs/edit?id=${blog.id}`}>
                  <Button variant="outline" size="sm">
                    <Pencil className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(blog.id)}
                  disabled={deletingId === blog.id}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  {deletingId === blog.id ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
