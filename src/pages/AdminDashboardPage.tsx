import { useState } from 'react'
import { SeoMetaPreview } from '../components/SeoMetaPreview'
import {
  useApproveReviewMutation,
  useGetPendingReviewsQuery,
  useRequestReviewEditsMutation,
} from '../services/api'

export function AdminDashboardPage() {
  const [notesByReview, setNotesByReview] = useState<Record<string, string>>({})
  const { data: pendingReviews = [], isLoading, isError } = useGetPendingReviewsQuery()
  const [approveReview, { isLoading: isApproving }] = useApproveReviewMutation()
  const [requestReviewEdits, { isLoading: isRequestingEdits }] =
    useRequestReviewEditsMutation()

  if (isLoading) {
    return <p>Loading pending reviews...</p>
  }

  if (isError) {
    return <p>Unable to load pending reviews right now.</p>
  }

  const sidebarMeta = pendingReviews[0]?.seo

  return (
    <div className="admin-layout">
      <section className="panel">
        <h2>Pending Review Queue</h2>
        {pendingReviews.length === 0 ? (
          <p>No reviews pending moderation.</p>
        ) : (
          <ul className="admin-list">
            {pendingReviews.map((review) => (
              <li key={review.id} className="admin-item">
                <h3>{review.productTitle}</h3>
                <p>
                  Product ID: {review.productId} · Submitted by {review.submittedBy}
                </p>
                <p>Queued: {review.queuedAt}</p>
                <label htmlFor={`notes-${review.id}`}>Editor note</label>
                <input
                  id={`notes-${review.id}`}
                  type="text"
                  value={notesByReview[review.id] ?? ''}
                  onChange={(event) =>
                    setNotesByReview((previous) => ({
                      ...previous,
                      [review.id]: event.target.value,
                    }))
                  }
                />
                <div className="button-row">
                  <button
                    type="button"
                    className="primary-button"
                    disabled={isApproving}
                    onClick={() => void approveReview({ reviewId: review.id })}
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    className="secondary-button"
                    disabled={isRequestingEdits}
                    onClick={() =>
                      void requestReviewEdits({
                        reviewId: review.id,
                        notes: notesByReview[review.id] ?? 'Please improve clarity.',
                      })
                    }
                  >
                    Request edits
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <aside>
        {sidebarMeta ? (
          <SeoMetaPreview meta={sidebarMeta} />
        ) : (
          <section className="panel">
            <h2>SEO Sidebar</h2>
            <p>Select a pending review to preview metadata.</p>
          </section>
        )}
      </aside>
    </div>
  )
}
