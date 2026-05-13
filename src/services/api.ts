import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
  PendingReview,
  Product,
  ReviewActionPayload,
  UploadScreenshotResponse,
} from '../types'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl:
      typeof window === 'undefined' ? 'http://localhost' : window.location.origin,
  }),
  tagTypes: ['PendingReview', 'Product'],
  endpoints: (builder) => ({
    uploadScreenshot: builder.mutation<UploadScreenshotResponse, File>({
      query: (file) => {
        const formData = new FormData()
        formData.append('file', file)

        return {
          url: '/api/v1/upload/screenshot',
          method: 'POST',
          body: formData,
        }
      },
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `/api/v1/products/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Product', id }],
    }),
    getPendingReviews: builder.query<PendingReview[], void>({
      query: () => '/api/v1/admin/reviews/pending',
      providesTags: ['PendingReview'],
    }),
    approveReview: builder.mutation<void, ReviewActionPayload>({
      query: ({ reviewId }) => ({
        url: `/api/v1/admin/reviews/${reviewId}/approve`,
        method: 'POST',
      }),
      invalidatesTags: ['PendingReview'],
    }),
    requestReviewEdits: builder.mutation<void, ReviewActionPayload>({
      query: ({ reviewId, notes }) => ({
        url: `/api/v1/admin/reviews/${reviewId}/request_edit`,
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
