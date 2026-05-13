import { Paper, Typography } from '@mui/material'
import type { SeoMeta } from '../types'
import './SeoMetaPreview.css'

interface SeoMetaPreviewProps {
  meta: SeoMeta
}

export function SeoMetaPreview({ meta }: SeoMetaPreviewProps) {
  return (
    <Paper component="section" elevation={0} className="panel seo-preview" aria-label="SEO metadata preview">
      <Typography variant="h6" component="h2">
        SEO Preview
      </Typography>
      <Typography variant="body2" className="seo-url">
        reviewdunia.com/{meta.slug}
      </Typography>
      <Typography variant="subtitle1" component="h3" className="seo-title">
        {meta.title}
      </Typography>
      <Typography variant="body2">{meta.description}</Typography>
    </Paper>
  )
}
