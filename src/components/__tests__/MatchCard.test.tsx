import { render, screen } from '@testing-library/react'
import { MatchCard } from '../MatchCard'

describe('MatchCard', () => {
  it('renders title, thumbnail and score', () => {
    render(
      <MatchCard
        title="Pixel 9 Pro"
        thumbnail="https://placehold.co/600x340"
        scorePercentage={91}
      />,
    )

    expect(screen.getByRole('heading', { name: /pixel 9 pro/i })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /pixel 9 pro thumbnail/i })).toBeInTheDocument()
    expect(screen.getByText(/score: 91% match/i)).toBeInTheDocument()
  })
})
