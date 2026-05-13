import type { Meta, StoryObj } from '@storybook/react-vite'
import { MatchCard } from './MatchCard'

const meta: Meta<typeof MatchCard> = {
  title: 'Components/MatchCard',
  component: MatchCard,
}

export default meta

type Story = StoryObj<typeof MatchCard>

export const Default: Story = {
  args: {
    title: 'Samsung Galaxy S24',
    thumbnail: 'https://placehold.co/640x360',
    scorePercentage: 92,
  },
}
