import type { Meta, StoryObj } from '@storybook/react-vite'
import { Provider } from 'react-redux'
import { createStore } from '../app/store'
import { DragAndDropUploader } from './DragAndDropUploader'

const meta: Meta<typeof DragAndDropUploader> = {
  title: 'Components/DragAndDropUploader',
  component: DragAndDropUploader,
  decorators: [
    (Story) => (
      <Provider store={createStore()}>
        <Story />
      </Provider>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof DragAndDropUploader>

export const Default: Story = {}
