'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Blog } from '@/types/blog'
import { BlogRow, rowToBlog } from '@/lib/blogs-data'
import { BlogCard } from '@/components/BlogCard'

export function BlogPageClient({ initialBlogs }: { initialBlogs: Blog[] }) {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs)

  useEffect(() => {
    setBlogs(initialBlogs)
  }, [initialBlogs])

  const refetch = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false })
      if (!error && data && data.length >= 0) {
        setBlogs((data as BlogRow[]).map(rowToBlog))
      }
    } catch (_) {}
  }

  useEffect(() => {
    refetch()
  }, [])

  useEffect(() => {
    const channel = supabase
      .channel('blogs-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'blogs' }, () => {
        refetch()
      })
      .subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return (
    <div className="min-h-screen pt-20">
      <div className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="heading-lg mb-4">Blog</h1>
          <p className="text-body max-w-2xl">
            Articles and updates from Inuka na Ploti on property, land, and investing in Kenya.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {blogs.length === 0 ? (
          <div className="text-center py-16 text-neutral-600">
            <p>No posts yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
