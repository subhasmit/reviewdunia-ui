import type { MatchResult } from '../types'

type MatchCardProps = Pick<MatchResult, 'title' | 'thumbnail' | 'scorePercentage'>

export function MatchCard({ title, thumbnail, scorePercentage }: MatchCardProps) {
  return (
    <article className="card" aria-label={`Match ${title}`}>
      <img src={thumbnail} alt={`${title} thumbnail`} className="card-thumbnail" />
      <div className="card-content">
        <h3>{title}</h3>
        <p className="score-label">Score: {scorePercentage}% match</p>
      </div>
    </article>
  )
}
