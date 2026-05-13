import { useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { motion } from 'framer-motion'
import { SeoMetaPreview } from '../components/SeoMetaPreview'
import { adminDashboardBanner } from '../assets/media'
import {
  useApproveReviewMutation,
  useGetPendingReviewsQuery,
  useRequestReviewEditsMutation,
} from '../services/api'
import './AdminDashboardPage.css'

export function AdminDashboardPage() {
  const [notesByReview, setNotesByReview] = useState<Record<string, string>>({})
  const { data: pendingReviews = [], isLoading, isError } = useGetPendingReviewsQuery()
  const [approveReview, { isLoading: isApproving }] = useApproveReviewMutation()
  const [requestReviewEdits, { isLoading: isRequestingEdits }] =
    useRequestReviewEditsMutation()

  if (isLoading) {
    return (
      <Paper elevation={0} className="panel">
        <Typography>Loading pending reviews...</Typography>
      </Paper>
    )
  }

  if (isError) {
    return (
      <Paper elevation={0} className="panel">
        <Typography>Unable to load pending reviews right now.</Typography>
      </Paper>
    )
  }

  const sidebarMeta = pendingReviews[0]?.seo

  return (
    <Grid container spacing={2} className="admin-layout">
      <Grid size={{ xs: 12, md: 8 }}>
        <Paper component="section" elevation={0} className="panel admin-panel">
          <img
            src={adminDashboardBanner}
            alt=""
            className="section-banner section-banner--compact"
          />
          <Typography variant="h5" component="h2" className="queue-title">
            Pending Review Queue
          </Typography>
          <Chip
            label={`${pendingReviews.length} queued`}
            color="warning"
            className="queue-chip"
          />
          {pendingReviews.length === 0 ? (
            <Typography className="queue-empty">No reviews pending moderation.</Typography>
          ) : (
            <Box component="ul" className="admin-list">
              {pendingReviews.map((review, index) => (
                <Box component="li" key={review.id}>
                  <Card
                    component={motion.article}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.08 }}
                    className="admin-item"
                    aria-label={`Pending review ${review.productTitle}`}
                  >
                    <CardContent>
                      <Typography variant="h6" component="h3">
                        {review.productTitle}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Product ID: {review.productId} · Submitted by {review.submittedBy}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" className="queued-at">
                        Queued: {review.queuedAt}
                      </Typography>
                      <TextField
                        id={`notes-${review.id}`}
                        label="Editor note"
                        fullWidth
                        size="small"
                        value={notesByReview[review.id] ?? ''}
                        onChange={(event) =>
                          setNotesByReview((previous) => ({
                            ...previous,
                            [review.id]: event.target.value,
                          }))
                        }
                        className="admin-notes-input"
                      />
                      <Box className="button-row">
                        <Button
                          type="button"
                          variant="contained"
                          disabled={isApproving}
                          onClick={() => void approveReview({ reviewId: review.id })}
                        >
                          Approve
                        </Button>
                        <Button
                          type="button"
                          variant="outlined"
                          disabled={isRequestingEdits}
                          onClick={() =>
                            void requestReviewEdits({
                              reviewId: review.id,
                              notes: notesByReview[review.id] ?? 'Please improve clarity.',
                            })
                          }
                        >
                          Request edits
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
          )}
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        {sidebarMeta ? (
          <SeoMetaPreview meta={sidebarMeta} />
        ) : (
          <Paper component="section" elevation={0} className="panel seo-sidebar-empty">
            <Typography variant="h6" component="h2">
              SEO Sidebar
            </Typography>
            <Typography>Select a pending review to preview metadata.</Typography>
          </Paper>
        )}
      </Grid>
    </Grid>
  )
}
