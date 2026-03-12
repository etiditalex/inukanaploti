export interface Testimonial {
  id: string
  quote: string
  authorName: string
  authorRole: string | null
  displayOrder: number
  createdAt: string
  updatedAt: string
}
