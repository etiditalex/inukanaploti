'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle, Phone, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export default function FAQsPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  const faqCategories = [
    {
      title: 'General Questions',
      faqs: [
        {
          question: 'What is Inuka na Ploti?',
          answer: 'Inuka na Ploti is a leading land investment company in Kenya that specializes in providing premium land investments with flexible payment plans and guaranteed title deeds. We make land ownership accessible to all Kenyans through our innovative financing solutions.'
        },
        {
          question: 'Where are your properties located?',
          answer: 'Our properties are strategically located in Kenya\'s most promising areas including Kilifi, Mtwapa, Malindi, Vipingo, and Watamu. These locations offer excellent growth potential, beautiful landscapes, and strong infrastructure development.'
        },
        {
          question: 'How long has Inuka na Ploti been in business?',
          answer: 'We have been operating for over 10 years, successfully helping hundreds of clients achieve their land investment goals. Our experience and track record speak to our commitment to excellence and client satisfaction.'
        }
      ]
    },
    {
      title: 'Property & Investment',
      faqs: [
        {
          question: 'What types of properties do you offer?',
          answer: 'We offer a diverse range of land investments including beachfront plots, hillside developments, golf course view properties, town center plots, and coastal properties. Each property is carefully selected for its investment potential and strategic location.'
        },
        {
          question: 'Are your properties legally verified?',
          answer: 'Yes, all our properties undergo rigorous legal verification. We ensure clear title deeds, proper documentation, and full legal compliance. Our legal team handles all the necessary checks and processes to guarantee your investment is secure.'
        },
        {
          question: 'Can I visit the properties before purchasing?',
          answer: 'Absolutely! We encourage site visits and provide complimentary guided tours of our properties. This allows you to see the land firsthand, understand the location, and ask any questions you may have before making your investment decision.'
        },
        {
          question: 'What is the minimum investment amount?',
          answer: 'Our properties start from as low as KES 1,200,000, making land investment accessible to a wide range of investors. We offer various price points to suit different budgets and investment goals.'
        }
      ]
    },
    {
      title: 'Payment Plans & Financing',
      faqs: [
        {
          question: 'What payment plans do you offer?',
          answer: 'We offer flexible payment plans ranging from 12 to 48 months with initial deposits as low as 10% of the property value. All our plans are interest-free, with no hidden fees or charges.'
        },
        {
          question: 'Is there any interest on the payment plans?',
          answer: 'No, all our payment plans are completely interest-free. You only pay the property price with no additional interest charges, making your investment more affordable and transparent.'
        },
        {
          question: 'Can I pay off my property early?',
          answer: 'Yes! We encourage early payments and offer discounts for early completion. You can pay off your property at any time without penalties, and you\'ll receive your title deed immediately upon full payment.'
        },
        {
          question: 'What happens if I miss a payment?',
          answer: 'We understand that financial situations can change. If you anticipate missing a payment, please contact us immediately to discuss flexible payment arrangements. We work with our clients to find solutions that work for everyone.'
        }
      ]
    },
    {
      title: 'Title Deeds & Legal',
      faqs: [
        {
          question: 'When do I receive my title deed?',
          answer: 'Your title deed is processed and transferred to you immediately upon completion of all payments. We handle all the legal documentation and ensure a smooth transfer process.'
        },
        {
          question: 'Are title deeds guaranteed?',
          answer: 'Yes, we guarantee title deeds for all our properties. This is a core promise of our service, and we have a 100% success rate in title deed delivery to our clients.'
        },
        {
          question: 'What legal fees are involved?',
          answer: 'The only additional costs are standard legal fees for title transfer, which are transparently disclosed upfront. We handle all legal processes and ensure you understand all costs before you commit.'
        },
        {
          question: 'Can I transfer the property to someone else?',
          answer: 'Yes, once you receive your title deed, the property is yours to do with as you wish. You can sell it, transfer it to family members, or develop it according to your plans.'
        }
      ]
    },
    {
      title: 'Site Visits & Support',
      faqs: [
        {
          question: 'How do I schedule a site visit?',
          answer: 'You can schedule a site visit by calling us, sending a WhatsApp message, or filling out our contact form. We\'ll arrange a convenient time and provide you with a guided tour of the property.'
        },
        {
          question: 'Do you provide transportation for site visits?',
          answer: 'Yes, we provide complimentary transportation for site visits from our office locations. This ensures you can see the properties comfortably and ask questions during the journey.'
        },
        {
          question: 'What support do you provide after purchase?',
          answer: 'We provide ongoing support throughout your payment period and beyond. Our team is available to answer questions, provide updates on your property, and assist with any concerns you may have.'
        },
        {
          question: 'Can I get a refund if I change my mind?',
          answer: 'We offer a cooling-off period during which you can cancel your investment and receive a full refund. Please contact us to discuss our refund policy and terms.'
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="heading-lg mb-4">Frequently Asked Questions</h1>
            <p className="text-body max-w-2xl mx-auto">
              Find answers to common questions about our land investment process, 
              payment plans, and property ownership. Can't find what you're looking for? 
              Contact us directly.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-center">{category.title}</h2>
              <div className="space-y-4">
                {category.faqs.map((faq, faqIndex) => {
                  const index = categoryIndex * 100 + faqIndex
                  const isOpen = openFAQ === index
                  
                  return (
                    <Card key={faqIndex} className="overflow-hidden">
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-primary-600 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-neutral-400 flex-shrink-0" />
                          )}
                        </div>
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-6">
                          <div className="border-t border-neutral-200 pt-4">
                            <p className="text-neutral-600 leading-relaxed">{faq.answer}</p>
                          </div>
                        </div>
                      )}
                    </Card>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16">
          <Card className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Still Have Questions?</h3>
            <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
              Our team is here to help! Contact us directly for personalized assistance 
              with your land investment questions and concerns.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                <Phone className="w-5 h-5 mr-2" />
                Call Us
              </Button>
              <Button variant="success" size="lg">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp
              </Button>
              <Button variant="outline" size="lg">
                Contact Form
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
