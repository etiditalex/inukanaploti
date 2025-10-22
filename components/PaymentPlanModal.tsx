'use client'

import { useState } from 'react'
import { X, Calculator, Download, Phone } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { motion, AnimatePresence } from 'framer-motion'

interface PaymentPlanModalProps {
  listing: {
    title: string
    priceKES: number
    paymentPlan: {
      depositKES: number
      months: number
    }
  }
}

export function PaymentPlanModal({ listing }: PaymentPlanModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const monthlyPayment = (listing.priceKES - listing.paymentPlan.depositKES) / listing.paymentPlan.months
  const totalInterest = 0 // Assuming no interest for now
  const totalPayable = listing.priceKES + totalInterest

  return (
    <>
      <Button 
        variant="outline" 
        size="lg" 
        className="w-full"
        onClick={() => setIsOpen(true)}
      >
        <Calculator className="w-4 h-4 mr-2" />
        Payment Calculator
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="border-0 shadow-none">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold">Payment Plan Calculator</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Property Info */}
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-2">{listing.title}</h3>
                    <div className="text-2xl font-bold text-primary-600">
                      {formatPrice(listing.priceKES)}
                    </div>
                  </div>

                  {/* Payment Breakdown */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Payment Breakdown</h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-neutral-200">
                        <span className="text-neutral-600">Property Price:</span>
                        <span className="font-semibold">{formatPrice(listing.priceKES)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center py-2 border-b border-neutral-200">
                        <span className="text-neutral-600">Initial Deposit:</span>
                        <span className="font-semibold text-primary-600">{formatPrice(listing.paymentPlan.depositKES)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center py-2 border-b border-neutral-200">
                        <span className="text-neutral-600">Remaining Balance:</span>
                        <span className="font-semibold">{formatPrice(listing.priceKES - listing.paymentPlan.depositKES)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center py-2 border-b border-neutral-200">
                        <span className="text-neutral-600">Monthly Payment:</span>
                        <span className="font-semibold text-green-600">{formatPrice(monthlyPayment)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center py-2 border-b border-neutral-200">
                        <span className="text-neutral-600">Payment Duration:</span>
                        <span className="font-semibold">{listing.paymentPlan.months} months</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Schedule Preview */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Payment Schedule Preview</h3>
                    
                    <div className="bg-neutral-50 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-neutral-600 mb-1">First Payment</div>
                          <div className="font-semibold">{formatPrice(listing.paymentPlan.depositKES)}</div>
                          <div className="text-xs text-neutral-500">Upon reservation</div>
                        </div>
                        <div>
                          <div className="text-neutral-600 mb-1">Monthly Payments</div>
                          <div className="font-semibold">{formatPrice(monthlyPayment)}</div>
                          <div className="text-xs text-neutral-500">For {listing.paymentPlan.months} months</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Payment Plan Benefits</h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">No Interest</div>
                          <div className="text-sm text-neutral-600">Interest-free payment plan</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">Flexible Terms</div>
                          <div className="text-sm text-neutral-600">Customizable payment schedule</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">Title Deed Guaranteed</div>
                          <div className="text-sm text-neutral-600">Clear ownership documentation</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">Professional Support</div>
                          <div className="text-sm text-neutral-600">Dedicated customer service</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-neutral-200">
                    <Button className="flex-1">
                      <Phone className="w-4 h-4 mr-2" />
                      Contact Us
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Download Brochure
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
