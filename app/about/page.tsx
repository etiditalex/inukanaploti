import Image from 'next/image'
import { Shield, Users, Award, Clock, CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export const metadata = {
  title: 'About Us - Inuka na Ploti',
  description: 'Learn about Inuka na Ploti\'s mission to make land investment accessible and secure for all Kenyans. Discover our process, values, and commitment to excellence.',
}

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: 'Trust & Transparency',
      description: 'We believe in complete transparency in all our dealings, ensuring our clients have full visibility into every step of their investment journey.',
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Our clients are at the heart of everything we do. We prioritize their needs and work tirelessly to exceed their expectations.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We maintain the highest standards in property selection, legal processes, and customer service to deliver exceptional value.',
    },
  ]

  const processSteps = [
    {
      step: '01',
      title: 'Property Selection',
      description: 'Browse our carefully curated selection of prime land investments across Kenya\'s most promising locations.',
      icon: '🔍',
    },
    {
      step: '02',
      title: 'Site Visit',
      description: 'Schedule a complimentary site visit to see the property firsthand and ask any questions you may have.',
      icon: '📍',
    },
    {
      step: '03',
      title: 'Reservation',
      description: 'Secure your chosen property with a small reservation fee and begin the legal documentation process.',
      icon: '📋',
    },
    {
      step: '04',
      title: 'Payment Plan',
      description: 'Choose a flexible payment plan that suits your budget and start making monthly installments.',
      icon: '💳',
    },
    {
      step: '05',
      title: 'Title Transfer',
      description: 'Receive your title deed and full ownership documentation upon completion of payments.',
      icon: '🏆',
    },
  ]


  const achievements = [
    { number: '500+', label: 'Properties Sold' },
    { number: '300+', label: 'Happy Customers' },
    { number: '10+', label: 'Years Experience' },
    { number: '100%', label: 'Title Deed Success' },
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-lg mb-6">About Inuka na Ploti</h1>
            <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
              We are Kenya's leading land investment company, dedicated to making property ownership 
              accessible and secure for all Kenyans through flexible payment plans and guaranteed title deeds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                Our Properties
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-md mb-6">Our Mission</h2>
              <p className="text-body mb-6">
                To democratize land ownership in Kenya by providing accessible, secure, and transparent 
                land investment opportunities that enable every Kenyan to own a piece of their country.
              </p>
              <p className="text-body mb-8">
                We believe that land ownership should not be a privilege for the few, but a right 
                accessible to all. Through innovative payment plans, rigorous legal processes, and 
                unwavering commitment to our clients, we make this vision a reality.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-neutral-700">Guaranteed title deeds for all properties</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-neutral-700">Flexible payment plans to suit every budget</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-neutral-700">Transparent processes with no hidden fees</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <Image
                  src="https://res.cloudinary.com/dyfnobo9r/image/upload/v1758696813/Inuka_na_ploti_4_c9jcj4.jpg"
                  alt="Our mission in action"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-500 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Our Values</h2>
            <p className="text-body max-w-2xl mx-auto">
              These core values guide everything we do and shape our relationships with clients, 
              partners, and the communities we serve.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card key={index} hover className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="heading-sm mb-4">{value.title}</h3>
                  <p className="text-neutral-600">{value.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Our Process</h2>
            <p className="text-body max-w-2xl mx-auto">
              We've streamlined the land investment process to make it simple, transparent, and stress-free. 
              Here's how we guide you from property selection to title deed ownership.
            </p>
          </div>

          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-primary-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                    {step.step}
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-neutral-600 text-lg">{step.description}</p>
                </div>
                <div className="text-4xl">{step.icon}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Achievements Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Our Achievements</h2>
            <p className="text-body max-w-2xl mx-auto">
              Numbers that speak to our commitment to excellence and client satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-primary-600 mb-2">
                  {achievement.number}
                </div>
                <div className="text-neutral-600 font-medium">
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="heading-lg mb-4">Ready to Start Your Investment Journey?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied customers who have successfully invested in land with Inuka na Ploti.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              View Properties
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-600">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
