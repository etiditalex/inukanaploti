'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Testimonial } from '@/types/testimonial'
import { TestimonialRow, rowToTestimonial } from '@/lib/testimonials-data'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminTestimonialsPage() {
  const router = useRouter()
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchTestimonials = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.replace('/admin/login')
      return
    }
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false })
    if (error) {
      toast.error('Failed to load testimonials. Run supabase/testimonials-schema.sql if you haven’t.')
      setTestimonials([])
    } else {
      setTestimonials((data as TestimonialRow[]).map(rowToTestimonial))
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchTestimonials()
  }, [router])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return
    setDeletingId(id)
    const { error } = await supabase.from('testimonials').delete().eq('id', id)
    setDeletingId(null)
    if (error) {
      toast.error(error.message)
      return
    }
    setTestimonials((prev) => prev.filter((t) => t.id !== id))
    toast.success('Testimonial deleted')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <p className="text-neutral-600">Loading testimonials...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-4 mb-6">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-semibold text-neutral-900">Testimonials</h1>
          <p className="text-neutral-600 mt-1 text-sm sm:text-base">
            Manage testimonials shown on the home page after &quot;Why Inuka na Ploti&quot;.
          </p>
        </div>
        <Link href="/admin/testimonials/new">
          <Button size="sm" className="min-h-[44px] touch-manipulation">
            <Plus className="w-4 h-4 mr-2" />
            Add testimonial
          </Button>
        </Link>
      </div>
      {testimonials.length === 0 ? (
        <Card className="py-12 text-center">
          <p className="text-neutral-600 mb-4">No testimonials yet.</p>
          <Link href="/admin/testimonials/new">
            <Button><Plus className="w-4 h-4 mr-2" /> Add your first testimonial</Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-4">
          {testimonials.map((t) => (
            <Card key={t.id} className="flex flex-col sm:flex-row sm:flex-wrap sm:items-start sm:justify-between gap-4 p-4 sm:p-6">
              <div className="min-w-0 flex-1">
                <p className="text-neutral-700 line-clamp-2">&quot;{t.quote}&quot;</p>
                <p className="font-semibold text-neutral-900 mt-2">{t.authorName}</p>
                {t.authorRole && (
                  <p className="text-sm text-neutral-500">{t.authorRole}</p>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2 min-h-[44px]">
                <Link href={`/admin/testimonials/edit?id=${t.id}`}>
                  <Button variant="outline" size="sm" className="min-h-[44px] touch-manipulation">
                    <Pencil className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  className="min-h-[44px] touch-manipulation"
                  onClick={() => handleDelete(t.id)}
                  disabled={deletingId === t.id}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  {deletingId === t.id ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
