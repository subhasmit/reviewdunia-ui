import type { Meta, StoryObj } from '@storybook/react-vite'
import { SeoMetaPreview } from './SeoMetaPreview'

const meta: Meta<typeof SeoMetaPreview> = {
  title: 'Components/SeoMetaPreview',
  component: SeoMetaPreview,
}

export default meta

type Story = StoryObj<typeof SeoMetaPreview>

export const Default: Story = {
  args: {
    meta: {
      slug: 'apple-iphone-16-review',
      title: 'Apple iPhone 16 Review: Battery, Camera and Value in India',
      description:
        'Our expert iPhone 16 review covers camera tests, battery benchmarks, and latest affiliate deals.',
    },
  },
}
