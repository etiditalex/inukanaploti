'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Card } from '@/components/ui/Card'
import { ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'

export default function NewTestimonialPage() {
  const router = useRouter()
  const [quote, setQuote] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [authorRole, setAuthorRole] = useState('')
  const [displayOrder, setDisplayOrder] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) router.replace('/admin/login')
    }
    check()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const now = new Date().toISOString()
    const row = {
      quote: quote.trim(),
      author_name: authorName.trim(),
      author_role: authorRole.trim() || null,
      display_order: displayOrder,
      created_at: now,
      updated_at: now,
    }
    setLoading(true)
    const { error } = await supabase.from('testimonials').insert(row)
    setLoading(false)
    if (error) {
      toast.error(error.message)
      return
    }
    toast.success('Testimonial added')
    router.replace('/admin/testimonials')
  }

  return (
    <div>
      <Link href="/admin/testimonials" className="inline-flex items-center text-neutral-600 hover:text-primary-600 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to testimonials
      </Link>
      <h1 className="text-2xl font-semibold text-neutral-900 mb-6">Add testimonial</h1>
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Quote *</label>
            <Textarea
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              placeholder="Customer testimonial text..."
              rows={4}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Author name *</label>
            <Input
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="e.g. John Mwangi"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Author role / location</label>
            <Input
              value={authorRole}
              onChange={(e) => setAuthorRole(e.target.value)}
              placeholder="e.g. Kilifi Investor"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Display order</label>
            <Input
              type="number"
              value={displayOrder}
              onChange={(e) => setDisplayOrder(parseInt(e.target.value, 10) || 0)}
              min={0}
            />
            <p className="text-xs text-neutral-500 mt-1">Lower numbers appear first.</p>
          </div>
          <div className="flex gap-3">
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Add testimonial'}
            </Button>
            <Link href="/admin/testimonials">
              <Button type="button" variant="outline">Cancel</Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  )
}
