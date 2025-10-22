'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Card } from '@/components/ui/Card'
import { MapComponent } from '@/components/MapComponent'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    propertyInterest: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_FORMSPREE_CONTACT || '/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success('Message sent successfully! We\'ll get back to you soon.')
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          propertyInterest: ''
        })
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+254 724 027747', '+254 783 027747'],
      action: 'tel:+254724027747'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@inukanaploti.com', 'sales@inukanaploti.com'],
      action: 'mailto:info@inukanaploti.com'
    },
    {
      icon: MapPin,
      title: 'Office',
      details: ['Kilifi County, Kenya', 'Near Kilifi Town Center'],
      action: '#'
    },
    {
      icon: Clock,
      title: 'Hours',
      details: ['Mon - Fri: 8:00 AM - 6:00 PM', 'Sat: 9:00 AM - 4:00 PM'],
      action: '#'
    }
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="heading-lg mb-4">Contact Us</h1>
            <p className="text-body max-w-2xl mx-auto">
              Get in touch with our team to learn more about our properties, 
              schedule a site visit, or discuss your investment goals.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card>
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">Send us a Message</h2>
                  <p className="text-neutral-600">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="mobile-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        className="mobile-input"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+254 783 027747"
                      />
                    </div>
                    <div>
                      <label htmlFor="propertyInterest" className="block text-sm font-medium text-neutral-700 mb-2">
                        Property Interest
                      </label>
                      <select
                        id="propertyInterest"
                        name="propertyInterest"
                        value={formData.propertyInterest}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="">Select a property</option>
                        <option value="kilifi-bofa">Kilifi - Bofa Beachfront</option>
                        <option value="chumani-beach">Chumani Beach View</option>
                        <option value="mtwapa-hills">Mtwapa Hills</option>
                        <option value="vipingo-golf">Vipingo Golf Course</option>
                        <option value="malindi-north">Malindi North</option>
                        <option value="watamu-beach">Watamu Beachside</option>
                        <option value="general">General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your investment goals, questions, or how we can help you..."
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                return (
                  <Card key={index} hover>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-neutral-600">
                            {detail}
                          </p>
                        ))}
                        {info.action !== '#' && (
                          <a
                            href={info.action}
                            className="inline-block mt-2 text-primary-600 hover:text-primary-700 font-medium"
                          >
                            Contact Now
                          </a>
                        )}
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>

            {/* Quick Actions */}
            <Card>
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="tel:+254724027747">
                    <Phone className="w-4 h-4 mr-2" />
                    Call +254 724 027747
                  </a>
                </Button>
                <Button variant="success" className="w-full justify-start" asChild>
                  <a href="https://wa.me/254783027747" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp +254 783 027747
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="mailto:info@inukanaploti.com">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Us
                  </a>
                </Button>
              </div>
            </Card>

            {/* Map */}
            <Card>
              <h3 className="text-lg font-semibold mb-4">Our Location</h3>
              <div className="h-64 rounded-lg overflow-hidden">
                <MapComponent 
                  listings={[]} 
                  hoveredListing={null}
                />
              </div>
              <p className="text-sm text-neutral-600 mt-2">
                Visit our office in Kilifi County for in-person consultations and property viewings.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
