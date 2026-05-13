import { useRef, useState, type ChangeEvent, type DragEvent, type KeyboardEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  setDragging,
  setQueuedRequestId,
  setSelectedFileName,
} from '../features/upload/uploadSlice'
import { useUploadScreenshotMutation } from '../services/api'
import type { MatchResult } from '../types'
import { MatchCard } from './MatchCard'

const HIGH_CONFIDENCE_SCORE = 80

export function DragAndDropUploader() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const dispatch = useAppDispatch()
  const { isDragging, selectedFileName, queuedRequestId } = useAppSelector(
    (state) => state.upload,
  )
  const [matches, setMatches] = useState<MatchResult[]>([])
  const [uploadScreenshot, { isLoading, isError }] = useUploadScreenshotMutation()

  const highConfidenceMatches = matches.filter(
    (match) => match.scorePercentage >= HIGH_CONFIDENCE_SCORE,
  )

  const runUpload = async (file: File) => {
    dispatch(setSelectedFileName(file.name))
    const response = await uploadScreenshot(file)

    if ('data' in response && response.data) {
      setMatches(response.data.matches)
      const hasStrongMatch = response.data.matches.some(
        (match) => match.scorePercentage >= HIGH_CONFIDENCE_SCORE,
      )
      dispatch(setQueuedRequestId(hasStrongMatch ? null : response.data.request_id))
    }
  }

  const onInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      await runUpload(file)
    }
  }

  const onDragOver = (event: DragEvent<HTMLElement>) => {
    event.preventDefault()
    dispatch(setDragging(true))
  }

  const onDragLeave = () => {
    dispatch(setDragging(false))
  }

  const onDrop = async (event: DragEvent<HTMLElement>) => {
    event.preventDefault()
    dispatch(setDragging(false))
    const file = event.dataTransfer.files?.[0]
    if (file) {
      await runUpload(file)
    }
  }

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      inputRef.current?.click()
    }
  }

  return (
    <section className="panel">
      <h2>Upload Screenshot to Match Reviews</h2>
      <div
        role="button"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`dropzone ${isDragging ? 'dropzone-active' : ''}`}
        aria-label="Drop screenshot here or press enter to browse files"
      >
        <p>Drag and drop screenshot here</p>
        <p>or</p>
        <label htmlFor="screenshot-upload" className="primary-button">
          Browse files
        </label>
        <input
          id="screenshot-upload"
          name="screenshot-upload"
          ref={inputRef}
          className="sr-only"
          aria-label="Upload screenshot"
          type="file"
          accept="image/*"
          onChange={onInputChange}
        />
      </div>
      {selectedFileName ? <p>Selected file: {selectedFileName}</p> : null}
      {isLoading ? <p>Uploading and matching screenshot...</p> : null}
      {isError ? <p role="alert">Upload failed. Please try again.</p> : null}

      {highConfidenceMatches.length > 0 ? (
        <div className="match-grid" aria-label="High confidence matches">
          {highConfidenceMatches.map((match) => (
            <MatchCard key={match.id} {...match} />
          ))}
        </div>
      ) : null}

      {queuedRequestId ? (
        <div className="queued-banner" role="status">
          <p>No high-confidence match found (&lt;80%).</p>
          <p>Queued for manual review. request_id: {queuedRequestId}</p>
        </div>
      ) : null}
    </section>
  )
}
