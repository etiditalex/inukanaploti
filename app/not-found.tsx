'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { rowToListing, type ListingRow } from '@/lib/listings-data'
import { rowToBlog, type BlogRow } from '@/lib/blogs-data'
import { Listing } from '@/types/listing'
import { Blog } from '@/types/blog'
import { ListingDetailView } from '@/components/ListingDetailView'
import { BlogPostView } from '@/components/BlogPostView'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  const pathname = usePathname()
  const [listing, setListing] = useState<Listing | null | undefined>(undefined)
  const [blog, setBlog] = useState<Blog | null | undefined>(undefined)

  useEffect(() => {
    const blogMatch = pathname?.match(/^\/blog\/([^/]+)\/?$/)
    const listingMatch = pathname?.match(/^\/listings\/([^/]+)\/?$/)

    if (blogMatch) {
      const slug = decodeURIComponent(blogMatch[1])
      let cancelled = false
      supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle()
        .then(({ data, error }) => {
          if (cancelled) return
          setBlog(error || !data ? null : rowToBlog(data as BlogRow))
        })
      return () => { cancelled = true }
    }

    if (listingMatch) {
      const slug = decodeURIComponent(listingMatch[1])
      let cancelled = false
      supabase
        .from('listings')
        .select('*')
        .eq('slug', slug)
        .maybeSingle()
        .then(({ data, error }) => {
          if (cancelled) return
          setListing(error || !data ? null : rowToListing(data as ListingRow))
        })
      return () => { cancelled = true }
    }

    setListing(null)
    setBlog(null)
  }, [pathname])

  const loading = (pathname?.startsWith('/listings/') && listing === undefined) ||
    (pathname?.startsWith('/blog/') && blog === undefined)

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse rounded-full w-12 h-12 bg-primary-200 mx-auto mb-4" />
          <p className="text-neutral-600">Loading…</p>
        </div>
      </div>
    )
  }

  if (blog) return <BlogPostView blog={blog} />
  if (listing) return <ListingDetailView listing={listing} />

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Page not found</h1>
        <p className="text-neutral-600 mb-6">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Button asChild>
          <Link href="/">Go to home</Link>
        </Button>
      </div>
    </div>
  )
}
