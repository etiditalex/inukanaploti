import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Blog } from '@/types/blog'

const FALLBACK_IMAGE = 'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758705419/inukanaploti_logo_v7btur.jpg'

export function BlogPostView({ blog }: { blog: Blog }) {
  const date = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString('en-KE', { dateStyle: 'long' })
    : ''
  const imageUrl = blog.coverImage || FALLBACK_IMAGE

  return (
    <article className="min-h-screen pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center text-neutral-600 hover:text-primary-600 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to blog
        </Link>

        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
            {blog.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-500">
            {date && <time dateTime={blog.publishedAt}>{date}</time>}
            {blog.author && (
              <>
                <span>·</span>
                <span>{blog.author}</span>
              </>
            )}
          </div>
        </header>

        <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-8">
          <Image
            src={imageUrl}
            alt={blog.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 672px"
          />
        </div>

        <div className="prose prose-neutral max-w-none">
          <div className="whitespace-pre-wrap text-neutral-700 leading-relaxed">
            {blog.content}
          </div>
        </div>
      </div>
    </article>
  )
}
