'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Phone, MessageCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    // Add passive listener for better mobile performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !(event.target as Element).closest('nav')) {
        setIsOpen(false)
      }
    }
    
    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Listings', href: '/listings' },
    { name: 'About', href: '/about' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Financing', href: '/financing' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQs', href: '/faqs' },
  ]

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 lg:h-22">
          {/* Logo */}
              <Link href="/" className="flex items-center group">
                <div className="relative w-14 h-14 lg:w-16 lg:h-16">
                  <Image
                    src="https://res.cloudinary.com/dyfnobo9r/image/upload/v1758705419/inukanaploti_logo_v7btur.jpg"
                    alt="Inuka na Ploti Logo"
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
              </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-neutral-700 hover:text-primary-600 font-medium transition-all duration-200 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-200 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="tel:+254-XXX-XXXXXX"
              className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call</span>
            </a>
                <a
                  href="https://wa.me/254783027747"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
          </div>

              {/* Mobile Menu Button - Android Optimized */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-3 rounded-lg text-neutral-700 hover:text-primary-500 hover:bg-neutral-100 transition-colors touch-manipulation android-button"
                aria-label="Toggle menu"
                style={{ minWidth: '48px', minHeight: '48px' }}
              >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-md"
            >
              <div className="py-4 space-y-1 border-t border-neutral-200">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-4 text-neutral-700 hover:text-primary-600 hover:bg-primary-50 active:bg-primary-100 rounded-lg transition-all duration-200 touch-manipulation android-button"
                        style={{ minHeight: '48px' }}
                  >
                    <span className="flex items-center justify-between">
                      {item.name}
                      <span className="text-primary-500 text-sm">→</span>
                    </span>
                  </Link>
                ))}
                <div className="px-4 py-4 space-y-3 border-t border-neutral-100">
                  <a
                    href="tel:+254-XXX-XXXXXX"
                    className="flex items-center justify-center space-x-2 text-primary-600 hover:text-primary-700 active:text-primary-800 font-medium transition-all duration-200 py-3 px-4 rounded-lg hover:bg-primary-50 active:bg-primary-100 touch-manipulation"
                    style={{ minHeight: '48px' }}
                  >
                    <Phone className="w-5 h-5" />
                    <span>Call Us</span>
                  </a>
                  <a
                    href="https://wa.me/254783027747"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 active:bg-green-800 transition-all duration-200 touch-manipulation shadow-lg hover:shadow-xl"
                    style={{ minHeight: '48px' }}
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
