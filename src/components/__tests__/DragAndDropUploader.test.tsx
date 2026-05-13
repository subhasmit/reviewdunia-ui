import { Provider } from 'react-redux'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { createStore } from '../../app/store'
import { DragAndDropUploader } from '../DragAndDropUploader'

function renderUploader() {
  return render(
    <Provider store={createStore()}>
      <DragAndDropUploader />
    </Provider>,
  )
}

describe('DragAndDropUploader', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('shows high-confidence match cards after upload', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          request_id: 'req-100',
          matches: [
            {
              id: 'm1',
              title: 'Pixel 9 Pro',
              thumbnail: 'https://placehold.co/640x360',
              scorePercentage: 88,
            },
          ],
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        },
      ),
    )

    renderUploader()
    const input = screen.getByLabelText(/upload screenshot/i)
    const file = new File(['image-bytes'], 'phone.png', { type: 'image/png' })

    fireEvent.change(input, { target: { files: [file] } })

    expect(await screen.findByText(/pixel 9 pro/i)).toBeInTheDocument()
    expect(screen.queryByText(/queued for manual review/i)).not.toBeInTheDocument()
  })

  it('shows queued state when all matches are below 80%', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          request_id: 'req-queued-55',
          matches: [
            {
              id: 'm2',
              title: 'Unknown Model',
              thumbnail: 'https://placehold.co/640x360',
              scorePercentage: 55,
            },
          ],
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        },
      ),
    )

    renderUploader()
    const input = screen.getByLabelText(/upload screenshot/i)
    const file = new File(['image-bytes'], 'unclear.png', { type: 'image/png' })
    fireEvent.change(input, { target: { files: [file] } })

    await waitFor(() =>
      expect(screen.getByText(/queued for manual review/i)).toBeInTheDocument(),
    )
    expect(screen.getByText(/req-queued-55/i)).toBeInTheDocument()
  })
})
