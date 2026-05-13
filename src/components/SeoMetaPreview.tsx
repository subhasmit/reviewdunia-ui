import type { SeoMeta } from '../types'

interface SeoMetaPreviewProps {
  meta: SeoMeta
}

export function SeoMetaPreview({ meta }: SeoMetaPreviewProps) {
  return (
    <section className="panel" aria-label="SEO metadata preview">
      <h2>SEO Preview</h2>
      <p className="seo-url">reviewdunia.com/{meta.slug}</p>
      <h3 className="seo-title">{meta.title}</h3>
      <p>{meta.description}</p>
    </section>
  )
}
