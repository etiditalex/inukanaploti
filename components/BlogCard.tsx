import Image from 'next/image'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Blog } from '@/types/blog'

const FALLBACK_IMAGE = 'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758705419/inukanaploti_logo_v7btur.jpg'

export function BlogCard({ blog }: { blog: Blog }) {
  const imageUrl = blog.coverImage || FALLBACK_IMAGE
  const date = blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString('en-KE', { dateStyle: 'long' }) : ''

  return (
    <Card className="overflow-hidden group">
      <Link href={`/blog/${encodeURIComponent(blog.slug)}`} className="block">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h2 className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors line-clamp-2">
            {blog.title}
          </h2>
          {date && <p className="text-sm text-neutral-500 mt-1">{date}</p>}
          {blog.excerpt && (
            <p className="text-sm text-neutral-600 mt-2 line-clamp-2">{blog.excerpt}</p>
          )}
        </div>
      </Link>
    </Card>
  )
}
