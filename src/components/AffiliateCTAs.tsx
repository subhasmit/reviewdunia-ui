import type { AffiliateLink } from '../types'

interface AffiliateCTAsProps {
  links: AffiliateLink[]
}

export function AffiliateCTAs({ links }: AffiliateCTAsProps) {
  return (
    <section className="panel">
      <h2>Best Price Offers</h2>
      <div className="button-row">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="primary-button"
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  )
}
