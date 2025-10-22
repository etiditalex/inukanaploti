import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Process', href: '/about#process' },
      { name: 'Gallery', href: '/gallery' },
      { name: 'Contact', href: '/contact' },
    ],
    services: [
      { name: 'Land Listings', href: '/listings' },
      { name: 'Financing Options', href: '/financing' },
      { name: 'Site Visits', href: '/contact#site-visit' },
      { name: 'Title Deeds', href: '/faqs#title-deeds' },
    ],
    support: [
      { name: 'FAQs', href: '/faqs' },
      { name: 'Payment Plans', href: '/financing' },
      { name: 'Legal Process', href: '/about#legal' },
      { name: 'Support', href: '/contact' },
    ],
  }

  const socialLinks = [
    { name: 'Facebook', href: 'https://facebook.com/inukanaploti', icon: Facebook },
    { name: 'Instagram', href: 'https://instagram.com/inukanaploti', icon: Instagram },
    { name: 'Twitter', href: 'https://twitter.com/inukanaploti', icon: Twitter },
  ]

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <div className="relative w-12 h-12">
                <Image
                  src="https://res.cloudinary.com/dyfnobo9r/image/upload/v1758705419/inukanaploti_logo_v7btur.jpg"
                  alt="Inuka na Ploti Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold">Inuka na Ploti</h3>
                <p className="text-sm text-neutral-400">Premium Land Investments</p>
              </div>
            </Link>
            <p className="text-neutral-300 mb-6 leading-relaxed">
              Your trusted partner for premium land investments in Kenya. 
              Flexible payment plans, guaranteed title deeds, and prime locations.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-neutral-800 rounded-lg hover:bg-primary-500 transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-300 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-300 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-3 mb-6">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-300 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary-400" />
                <a
                  href="tel:+254-XXX-XXXXXX"
                  className="text-neutral-300 hover:text-primary-400 transition-colors"
                >
                  +254 XXX XXXXXX
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary-400" />
                <a
                  href="mailto:info@inukanaploti.com"
                  className="text-neutral-300 hover:text-primary-400 transition-colors"
                >
                  info@inukanaploti.com
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-primary-400 mt-0.5" />
                <span className="text-neutral-300 text-sm">
                  Kilifi County, Kenya
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="py-8 border-t border-neutral-800">
          <div className="max-w-md">
            <h4 className="text-lg font-semibold mb-2">Stay Updated</h4>
            <p className="text-neutral-400 mb-4">
              Get the latest updates on new listings and investment opportunities.
            </p>
            <form 
              action={process.env.NEXT_PUBLIC_FORMSPREE_NEWSLETTER || '#'}
              method="POST"
              className="flex space-x-2"
            >
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-neutral-400 text-sm">
            © {currentYear} Inuka na Ploti. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="text-neutral-400 hover:text-primary-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-neutral-400 hover:text-primary-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="/sitemap.xml" className="text-neutral-400 hover:text-primary-400 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
