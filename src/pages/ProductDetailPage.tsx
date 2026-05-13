import { useAppSelector } from '../app/hooks'
import { AffiliateCTAs } from '../components/AffiliateCTAs'
import { ProductHero } from '../components/ProductHero'
import { ProsCons } from '../components/ProsCons'
import { SeoMetaPreview } from '../components/SeoMetaPreview'
import { SpecsTable } from '../components/SpecsTable'
import { useGetProductByIdQuery } from '../services/api'
import { useParams } from 'react-router-dom'

export function ProductDetailPage() {
  const { id = '' } = useParams()
  const adminMode = useAppSelector((state) => state.ui.adminMode)
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id, {
    skip: !id,
  })

  if (isLoading) {
    return <p>Loading product details...</p>
  }

  if (isError || !product) {
    return <p>Product details are currently unavailable.</p>
  }

  return (
    <div className="stack">
      <ProductHero
        title={product.title}
        subtitle={product.subtitle}
        images={product.heroImages}
      />

      <section className="panel">
        <h2>Review Summary</h2>
        <p>{product.reviewSummary}</p>
      </section>

      <section className="panel">
        <h2>Detailed Review</h2>
        <p>{product.overview}</p>
      </section>

      <SpecsTable specs={product.specs} />
      <ProsCons pros={product.pros} cons={product.cons} />
      <AffiliateCTAs links={product.affiliateLinks} />
      {adminMode ? <SeoMetaPreview meta={product.seo} /> : null}
    </div>
  )
}
