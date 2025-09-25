import type { Metadata } from 'next'
import { Montserrat, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Toaster } from 'react-hot-toast'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Inuka na Ploti - Premium Land Investments in Kenya',
    template: '%s | Inuka na Ploti'
  },
  description: 'Discover premium land investments in Kenya with flexible payment plans. Prime locations in Kilifi, Mtwapa, and Malindi. Title deeds guaranteed.',
  keywords: ['land for sale Kenya', 'Kilifi land', 'Mtwapa plots', 'Malindi property', 'land investment Kenya', 'flexible payment plans'],
  authors: [{ name: 'Inuka na Ploti' }],
  creator: 'Inuka na Ploti',
  publisher: 'Inuka na Ploti',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://etiditalex.github.io/inukanaploti'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: 'https://etiditalex.github.io/inukanaploti',
    title: 'Inuka na Ploti - Premium Land Investments in Kenya',
    description: 'Discover premium land investments in Kenya with flexible payment plans. Prime locations in Kilifi, Mtwapa, and Malindi. Title deeds guaranteed.',
    siteName: 'Inuka na Ploti',
    images: [
      {
        url: 'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758705419/inukanaploti_logo_v7btur.jpg',
        width: 1200,
        height: 630,
        alt: 'Inuka na Ploti Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inuka na Ploti - Premium Land Investments in Kenya',
    description: 'Discover premium land investments in Kenya with flexible payment plans. Prime locations in Kilifi, Mtwapa, and Malindi. Title deeds guaranteed.',
    images: ['https://res.cloudinary.com/dyfnobo9r/image/upload/v1758705419/inukanaploti_logo_v7btur.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Inuka na Ploti',
  url: 'https://etiditalex.github.io/inukanaploti',
  logo: 'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758705419/inukanaploti_logo_v7btur.jpg',
  description: 'Premium land investments in Kenya with flexible payment plans and guaranteed title deeds',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'KE',
    addressRegion: 'Coast',
    addressLocality: 'Kilifi'
  },
  areaServed: {
    '@type': 'Country',
    name: 'Kenya'
  },
  serviceType: 'Land Investment',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+254-XXX-XXXXXX',
    contactType: 'customer service',
    availableLanguage: ['English', 'Swahili'],
  },
  sameAs: [
    'https://facebook.com/inukanaploti',
    'https://instagram.com/inukanaploti',
    'https://twitter.com/inukanaploti',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#2dabe1',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  )
}
