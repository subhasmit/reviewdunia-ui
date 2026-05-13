import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
  AffiliateLink,
  PendingReview,
  Product,
  ProductSpec,
  ReviewActionPayload,
  SeoMeta,
  UploadScreenshotResponse,
} from '../types'

interface ProductApiResponse {
  id: number | string
  name?: string
  title?: string
  description?: string | null
}

const defaultSpecs: ProductSpec[] = [
  { label: 'Category', value: 'General' },
  { label: 'Availability', value: 'In stock' },
]

const defaultAffiliateLinks: AffiliateLink[] = [
  { label: 'Amazon', url: '#' },
  { label: 'Flipkart', url: '#' },
]

const defaultSeo = (title: string, id: string): SeoMeta => ({
  title: `${title} review`,
  description: `Detailed review for ${title}.`,
  slug: `products/${id}`,
})

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl:
      import.meta.env.VITE_API_BASE_URL ??
      (import.meta.env.MODE === 'test' ? 'http://localhost/api' : '/api'),
  }),
  tagTypes: ['PendingReview', 'Product'],
  endpoints: (builder) => ({
    uploadScreenshot: builder.mutation<UploadScreenshotResponse, File>({
      query: (file) => {
        const formData = new FormData()
        formData.append('file', file)

        return {
          url: '/v1/upload/screenshot',
          method: 'POST',
          body: formData,
        }
      },
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `/v1/products/${id}`,
      transformResponse: (response: ProductApiResponse): Product => {
        const id = String(response.id)
        const title = response.title ?? response.name ?? `Product ${id}`
        const overview = response.description ?? 'Detailed review will appear here soon.'
        return {
          id,
          title,
          subtitle: 'Hands-on verdict and buying advice',
          heroImages: [],
          overview,
          reviewSummary: overview,
          specs: defaultSpecs,
          pros: ['Strong value proposition', 'Useful feature coverage'],
          cons: ['More benchmark data pending'],
          affiliateLinks: defaultAffiliateLinks,
          seo: defaultSeo(title, id),
        }
      },
      providesTags: (_result, _error, id) => [{ type: 'Product', id }],
    }),
    getPendingReviews: builder.query<PendingReview[], void>({
      query: () => '/v1/admin/reviews/pending',
      providesTags: ['PendingReview'],
    }),
    approveReview: builder.mutation<void, ReviewActionPayload>({
      query: ({ reviewId }) => ({
        url: `/v1/admin/reviews/${reviewId}/approve`,
        method: 'POST',
      }),
      invalidatesTags: ['PendingReview'],
    }),
    requestReviewEdits: builder.mutation<void, ReviewActionPayload>({
      query: ({ reviewId, notes }) => ({
        url: `/v1/admin/reviews/${reviewId}/request_edit`,
        method: 'POST',
        body: { note: notes },
      }),
      invalidatesTags: ['PendingReview'],
    }),
  }),
})

export const {
  useApproveReviewMutation,
  useGetPendingReviewsQuery,
  useGetProductByIdQuery,
  useRequestReviewEditsMutation,
  useUploadScreenshotMutation,
} = api
