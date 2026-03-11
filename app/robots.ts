import { MetadataRoute } from 'next'

const SITE_URL = 'https://inukanaploti.co.ke'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/admin/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
