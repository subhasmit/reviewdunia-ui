export interface ProductSpec {
  label: string
  value: string
}

export interface AffiliateLink {
  label: string
  url: string
}

export interface SeoMeta {
  title: string
  description: string
  slug: string
}

export interface Product {
  id: string
  title: string
  subtitle: string
  heroImages: string[]
  overview: string
  reviewSummary: string
  specs: ProductSpec[]
  pros: string[]
  cons: string[]
  affiliateLinks: AffiliateLink[]
  seo: SeoMeta
}
