interface ProductHeroProps {
  title: string
  subtitle: string
  images: string[]
}

export function ProductHero({ title, subtitle, images }: ProductHeroProps) {
  const firstImage = images[0]

  return (
    <section className="panel">
      <h2>{title}</h2>
      <p>{subtitle}</p>
      <div className="hero-carousel">
        {firstImage ? (
          <img src={firstImage} alt={`${title} hero`} className="hero-image" />
        ) : (
          <div className="hero-placeholder">Carousel placeholder</div>
        )}
      </div>
    </section>
  )
}
