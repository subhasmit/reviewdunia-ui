import { Box, Paper, Typography } from '@mui/material'
import { useAppSelector } from '../app/hooks'
import {
  sectionIllustrationAnalytics,
  sectionIllustrationReviews,
} from '../assets/media'
import { AffiliateCTAs } from '../components/AffiliateCTAs'
import { ProductHero } from '../components/ProductHero'
import { ProsCons } from '../components/ProsCons'
import { SeoMetaPreview } from '../components/SeoMetaPreview'
import { SpecsTable } from '../components/SpecsTable'
import { useGetProductByIdQuery } from '../services/api'
import { useParams } from 'react-router-dom'
import './ProductDetailPage.css'

export function ProductDetailPage() {
  const { id = '' } = useParams()
  const adminMode = useAppSelector((state) => state.ui.adminMode)
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id, {
    skip: !id,
  })

  if (isLoading) {
    return (
      <Paper elevation={0} className="panel product-state">
        <Typography>Loading product details...</Typography>
      </Paper>
    )
  }

  if (isError || !product) {
    return (
      <Paper elevation={0} className="panel product-state">
        <Typography>Product details are currently unavailable.</Typography>
      </Paper>
    )
  }

  return (
    <Box className="product-page stack">
      <ProductHero
        title={product.title}
        subtitle={product.subtitle}
        images={product.heroImages}
      />

      <Paper component="section" elevation={0} className="panel">
        <img src={sectionIllustrationReviews} alt="" className="section-illustration" />
        <Typography variant="h5" component="h2">
          Review Summary
        </Typography>
        <Typography variant="body1">{product.reviewSummary}</Typography>
      </Paper>

      <Paper component="section" elevation={0} className="panel">
        <img src={sectionIllustrationAnalytics} alt="" className="section-illustration" />
        <Typography variant="h5" component="h2">
          Detailed Review
        </Typography>
        <Typography variant="body1">{product.overview}</Typography>
      </Paper>

      <SpecsTable specs={product.specs} />
      <ProsCons pros={product.pros} cons={product.cons} />
      <AffiliateCTAs links={product.affiliateLinks} />
      {adminMode ? <SeoMetaPreview meta={product.seo} /> : null}
    </Box>
  )
}
