'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Card } from '@/components/ui/Card'
import { Testimonial } from '@/types/testimonial'
import { TestimonialRow, rowToTestimonial } from '@/lib/testimonials-data'
import { ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'

export default function EditTestimonialPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [testimonial, setTestimonial] = useState<Testimonial | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.replace('/admin/login')
        return
      }
      if (!id) {
        router.replace('/admin/testimonials')
        return
      }
      const { data, error } = await supabase.from('testimonials').select('*').eq('id', id).single()
      if (error || !data) {
        toast.error('Testimonial not found')
        router.replace('/admin/testimonials')
        return
      }
      setTestimonial(rowToTestimonial(data as TestimonialRow))
    }
    load()
  }, [id, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!testimonial) return
    const now = new Date().toISOString()
    const row = {
      quote: testimonial.quote.trim(),
      author_name: testimonial.authorName.trim(),
      author_role: testimonial.authorRole?.trim() || null,
      display_order: testimonial.displayOrder,
      updated_at: now,
    }
    setSaving(true)
    const { error } = await supabase.from('testimonials').update(row).eq('id', testimonial.id)
    setSaving(false)
    if (error) {
      toast.error(error.message)
      return
    }
    toast.success('Testimonial updated')
    router.replace('/admin/testimonials')
  }

  if (!testimonial) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <p className="text-neutral-600">Loading...</p>
      </div>
    )
  }

  return (
    <div>
      <Link href="/admin/testimonials" className="inline-flex items-center text-neutral-600 hover:text-primary-600 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to testimonials
      </Link>
      <h1 className="text-2xl font-semibold text-neutral-900 mb-6">Edit testimonial</h1>
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Quote *</label>
            <Textarea
              value={testimonial.quote}
              onChange={(e) => setTestimonial((t) => t ? { ...t, quote: e.target.value } : null)}
              placeholder="Customer testimonial text..."
              rows={4}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Author name *</label>
            <Input
              value={testimonial.authorName}
              onChange={(e) => setTestimonial((t) => t ? { ...t, authorName: e.target.value } : null)}
              placeholder="e.g. John Mwangi"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Author role / location</label>
            <Input
              value={testimonial.authorRole ?? ''}
              onChange={(e) => setTestimonial((t) => t ? { ...t, authorRole: e.target.value } : null)}
              placeholder="e.g. Kilifi Investor"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Display order</label>
            <Input
              type="number"
              value={testimonial.displayOrder}
              onChange={(e) => setTestimonial((t) => t ? { ...t, displayOrder: parseInt(e.target.value, 10) || 0 } : null)}
              min={0}
            />
          </div>
          <div className="flex gap-3">
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving...' : 'Update testimonial'}
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
