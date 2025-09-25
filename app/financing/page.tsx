import { Calculator, Shield, Clock, CheckCircle, ArrowRight, Phone, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export const metadata = {
  title: 'Financing Options - Inuka na Ploti',
  description: 'Learn about our flexible payment plans and financing options for land investment. No interest, guaranteed title deeds, and affordable monthly payments.',
}

export default function FinancingPage() {
  const paymentPlans = [
    {
      name: 'Standard Plan',
      duration: '12-24 months',
      deposit: '20%',
      features: [
        'No interest charges',
        'Flexible monthly payments',
        'Title deed upon completion',
        'Early payment discounts'
      ],
      example: {
        propertyPrice: 2000000,
        deposit: 400000,
        monthlyPayment: 80000,
        duration: 20
      }
    },
    {
      name: 'Extended Plan',
      duration: '24-36 months',
      deposit: '15%',
      features: [
        'Lower monthly payments',
        'No interest charges',
        'Title deed upon completion',
        'Payment flexibility'
      ],
      example: {
        propertyPrice: 2000000,
        deposit: 300000,
        monthlyPayment: 56667,
        duration: 30
      }
    },
    {
      name: 'Premium Plan',
      duration: '36-48 months',
      deposit: '10%',
      features: [
        'Minimal monthly payments',
        'No interest charges',
        'Title deed upon completion',
        'Maximum flexibility'
      ],
      example: {
        propertyPrice: 2000000,
        deposit: 200000,
        monthlyPayment: 50000,
        duration: 36
      }
    }
  ]

  const benefits = [
    {
      icon: Shield,
      title: 'No Interest',
      description: 'All our payment plans are interest-free, saving you thousands in additional costs.'
    },
    {
      icon: Clock,
      title: 'Flexible Terms',
      description: 'Choose payment terms that work with your budget and financial situation.'
    },
    {
      icon: CheckCircle,
      title: 'Guaranteed Title',
      description: 'Receive your title deed immediately upon completion of payments.'
    }
  ]

  const process = [
    {
      step: '1',
      title: 'Choose Your Plan',
      description: 'Select a payment plan that fits your budget and timeline.'
    },
    {
      step: '2',
      title: 'Make Initial Deposit',
      description: 'Secure your property with a small initial deposit.'
    },
    {
      step: '3',
      title: 'Start Monthly Payments',
      description: 'Begin making affordable monthly payments.'
    },
    {
      step: '4',
      title: 'Receive Title Deed',
      description: 'Get your title deed upon completion of payments.'
    }
  ]

  const faqs = [
    {
      question: 'What is the minimum deposit required?',
      answer: 'Our minimum deposit is 10% of the property value, making it accessible for most investors.'
    },
    {
      question: 'Are there any hidden fees?',
      answer: 'No hidden fees. The only additional costs are standard legal fees for title transfer, which we handle transparently.'
    },
    {
      question: 'Can I pay off my property early?',
      answer: 'Yes! We offer early payment discounts and you can pay off your property at any time without penalties.'
    },
    {
      question: 'What happens if I miss a payment?',
      answer: 'We understand financial challenges. Contact us to discuss flexible payment arrangements and avoid any issues.'
    },
    {
      question: 'When do I get my title deed?',
      answer: 'Your title deed is processed and transferred to you immediately upon completion of all payments.'
    },
    {
      question: 'Can I change my payment plan?',
      answer: 'Yes, you can upgrade or modify your payment plan at any time by contacting our team.'
    }
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="heading-lg mb-6">Flexible Financing Options</h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto">
              Make your land investment dreams a reality with our flexible, interest-free payment plans. 
              No hidden fees, guaranteed title deeds, and payment terms that work for your budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                <Calculator className="w-5 h-5 mr-2" />
                Calculate Payments
              </Button>
              <Button variant="outline" size="lg">
                View Properties
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Why Choose Our Financing?</h2>
            <p className="text-body max-w-2xl mx-auto">
              We make land investment accessible through transparent, flexible payment plans 
              designed to help you achieve your property ownership goals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <Card key={index} hover className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="heading-sm mb-4">{benefit.title}</h3>
                  <p className="text-neutral-600">{benefit.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Payment Plans */}
      <section className="section-padding bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Choose Your Payment Plan</h2>
            <p className="text-body max-w-2xl mx-auto">
              Select the payment plan that best fits your budget and timeline. 
              All plans are interest-free with guaranteed title deeds.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {paymentPlans.map((plan, index) => (
              <Card key={index} hover className="relative">
                {index === 1 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge variant="secondary" className="px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-primary-600 mb-2">
                    {plan.deposit}
                  </div>
                  <div className="text-neutral-600">Initial Deposit</div>
                  <div className="text-sm text-neutral-500 mt-1">{plan.duration}</div>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-neutral-600">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Example Calculation */}
                <div className="bg-neutral-50 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold mb-3">Example Calculation</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Property Price:</span>
                      <span className="font-semibold">{formatPrice(plan.example.propertyPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Initial Deposit:</span>
                      <span className="font-semibold text-primary-600">{formatPrice(plan.example.deposit)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly Payment:</span>
                      <span className="font-semibold text-green-600">{formatPrice(plan.example.monthlyPayment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-semibold">{plan.example.duration} months</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full" variant={index === 1 ? 'primary' : 'outline'}>
                  Choose This Plan
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">How It Works</h2>
            <p className="text-body max-w-2xl mx-auto">
              Our simple, transparent process makes it easy to secure your land investment 
              and start building your property portfolio.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-neutral-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="section-padding bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Frequently Asked Questions</h2>
            <p className="text-body max-w-2xl mx-auto">
              Get answers to common questions about our financing options and payment plans.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  <p className="text-neutral-600">{faq.answer}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="heading-lg mb-4">Ready to Start Your Investment?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Contact our team today to discuss your financing options and find the perfect payment plan for your needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              <Phone className="w-5 h-5 mr-2" />
              Call Now
            </Button>
            <Button variant="success" size="lg">
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-600">
              View Properties
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
