'use client'

import { useState, useEffect } from 'react'
import { Share2, Facebook, MessageCircle, Mail, Twitter, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

interface ShareButtonProps {
  url?: string
  title?: string
  description?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'outline' | 'ghost'
}

export function ShareButton({ 
  url = '',
  title = 'Inuka na Ploti - Premium Land Investments',
  description = 'Discover premium land investments in Kenya with flexible payment plans and guaranteed title deeds.',
  className = '',
  size = 'md',
  variant = 'outline'
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [currentUrl, setCurrentUrl] = useState(url)

  useEffect(() => {
    if (!url && typeof window !== 'undefined') {
      setCurrentUrl(window.location.href)
    }
  }, [url])

  const shareUrl = encodeURIComponent(currentUrl)
  const shareTitle = encodeURIComponent(title)
  const shareDescription = encodeURIComponent(description)

  const shareOptions = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => {
        if (typeof window !== 'undefined') {
          const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`
          window.open(facebookUrl, '_blank', 'width=600,height=400')
        }
        setIsOpen(false)
      }
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-600 hover:bg-green-700',
      action: () => {
        if (typeof window !== 'undefined') {
          const whatsappUrl = `https://wa.me/?text=${shareTitle}%20${shareUrl}`
          window.open(whatsappUrl, '_blank')
        }
        setIsOpen(false)
      }
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'bg-gray-600 hover:bg-gray-700',
      action: () => {
        if (typeof window !== 'undefined') {
          const emailUrl = `mailto:?subject=${shareTitle}&body=${shareDescription}%0A%0A${currentUrl}`
          window.location.href = emailUrl
        }
        setIsOpen(false)
      }
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-blue-400 hover:bg-blue-500',
      action: () => {
        if (typeof window !== 'undefined') {
          const twitterUrl = `https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`
          window.open(twitterUrl, '_blank', 'width=600,height=400')
        }
        setIsOpen(false)
      }
    },
    {
      name: 'Copy Link',
      icon: copied ? Check : Copy,
      color: copied ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700',
      action: async () => {
        if (typeof window !== 'undefined') {
          try {
            await navigator.clipboard.writeText(currentUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
            setIsOpen(false)
          } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea')
            textArea.value = currentUrl
            document.body.appendChild(textArea)
            textArea.select()
            document.execCommand('copy')
            document.body.removeChild(textArea)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
            setIsOpen(false)
          }
        }
      }
    }
  ]

  return (
    <div className="relative">
      <Button
        variant={variant}
        size={size}
        onClick={() => setIsOpen(!isOpen)}
        className={`${className} touch-manipulation android-button`}
      >
        <Share2 className="w-4 h-4 mr-2" />
        Share
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Share Options */}
          <Card className="absolute top-full right-0 mt-2 z-50 min-w-48 shadow-xl border border-neutral-200">
            <div className="p-4">
              <h3 className="text-sm font-semibold text-neutral-700 mb-3">Share this page</h3>
              <div className="space-y-2">
                {shareOptions.map((option, index) => {
                  const Icon = option.icon
                  return (
                    <button
                      key={index}
                      onClick={option.action}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-white text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${option.color}`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{option.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  )
}

// Simplified share buttons for specific platforms
export function FacebookShareButton({ url, title }: { url?: string, title?: string }) {
  const shareUrl = encodeURIComponent(url || '')
  const shareTitle = encodeURIComponent(title || 'Inuka na Ploti - Premium Land Investments')

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        if (typeof window !== 'undefined') {
          const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`
          window.open(facebookUrl, '_blank', 'width=600,height=400')
        }
      }}
      className="touch-manipulation android-button"
    >
      <Facebook className="w-4 h-4 mr-2" />
      Facebook
    </Button>
  )
}

export function WhatsAppShareButton({ url, title }: { url?: string, title?: string }) {
  const shareUrl = encodeURIComponent(url || '')
  const shareTitle = encodeURIComponent(title || 'Inuka na Ploti - Premium Land Investments')

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        if (typeof window !== 'undefined') {
          const whatsappUrl = `https://wa.me/?text=${shareTitle}%20${shareUrl}`
          window.open(whatsappUrl, '_blank')
        }
      }}
      className="touch-manipulation android-button"
    >
      <MessageCircle className="w-4 h-4 mr-2" />
      WhatsApp
    </Button>
  )
}

export function EmailShareButton({ url, title, description }: { url?: string, title?: string, description?: string }) {
  const shareUrl = url || ''
  const shareTitle = title || 'Inuka na Ploti - Premium Land Investments'
  const shareDescription = description || 'Discover premium land investments in Kenya with flexible payment plans and guaranteed title deeds.'

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        if (typeof window !== 'undefined') {
          const emailUrl = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareDescription + '\n\n' + shareUrl)}`
          window.location.href = emailUrl
        }
      }}
      className="touch-manipulation android-button"
    >
      <Mail className="w-4 h-4 mr-2" />
      Email
    </Button>
  )
}
