import { getBlogs } from '@/lib/blogs-data'
import { BlogPageClient } from './blog-client'

const SITE_URL = 'https://inukanaploti.co.ke'
const LOGO_URL = 'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758705419/inukanaploti_logo_v7btur.jpg'

export const metadata = {
  title: 'Blog',
  description: 'Articles and updates from Inuka na Ploti on property, land, and investing in Kenya.',
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: 'Blog | Inuka na Ploti',
    description: 'Articles and updates on property and land in Kenya.',
    url: `${SITE_URL}/blog`,
    siteName: 'Inuka na Ploti',
    images: [{ url: LOGO_URL, width: 1200, height: 630, alt: 'Inuka na Ploti' }],
  },
  twitter: { card: 'summary_large_image', title: 'Blog | Inuka na Ploti', images: [LOGO_URL] },
}

export default async function BlogPage() {
  const initialBlogs = await getBlogs()
  return <BlogPageClient initialBlogs={initialBlogs} />
}
