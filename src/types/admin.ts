import type { SeoMeta } from './product'

export interface PendingReview {
  id: string
  productId: string
  productTitle: string
  submittedBy: string
  queuedAt: string
  seo: SeoMeta
}

export interface ReviewActionPayload {
  reviewId: string
  notes?: string
}
