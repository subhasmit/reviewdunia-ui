import { useRef, useState, type ChangeEvent, type DragEvent, type KeyboardEvent } from 'react'
import { Alert, Box, Button, Chip, LinearProgress, Paper, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  setDragging,
  setQueuedRequestId,
  setSelectedFileName,
} from '../features/upload/uploadSlice'
import { useUploadScreenshotMutation } from '../services/api'
import type { MatchResult } from '../types'
import { MatchCard } from './MatchCard'
import './DragAndDropUploader.css'

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
    <Paper component="section" elevation={0} className="panel uploader-panel">
      <Typography variant="h5" component="h2">
        Upload Screenshot to Match Reviews
      </Typography>
      <motion.div
        role="button"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`dropzone uploader-dropzone ${isDragging ? 'dropzone-active' : ''}`}
        aria-label="Drop screenshot here or press enter to browse files"
        whileHover={{ scale: 1.01 }}
        animate={isDragging ? { scale: [1, 1.015, 1] } : { scale: 1 }}
        transition={{ duration: 0.45 }}
      >
        <Typography>Drag and drop screenshot here</Typography>
        <Typography variant="body2" color="text.secondary">
          or
        </Typography>
        <Button type="button" variant="contained" onClick={() => inputRef.current?.click()}>
          Browse files
        </Button>
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
      </motion.div>
      {selectedFileName ? (
        <Chip label={`Selected file: ${selectedFileName}`} color="info" className="uploader-file-chip" />
      ) : null}

      <AnimatePresence>
        {isLoading ? (
          <motion.div
            className="uploader-progress"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <Typography>Uploading and matching screenshot...</Typography>
            <LinearProgress />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {isError ? <Alert severity="error">Upload failed. Please try again.</Alert> : null}

      {highConfidenceMatches.length > 0 ? (
        <Box className="match-grid" aria-label="High confidence matches">
          {highConfidenceMatches.map((match, index) => (
            <MatchCard key={match.id} {...match} animationOrder={index} />
          ))}
        </Box>
      ) : null}

      <AnimatePresence>
        {queuedRequestId ? (
          <motion.div
            className="queued-banner queue-state"
            role="status"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <Typography>No high-confidence match found (&lt;80%).</Typography>
            <Typography>Queued for manual review. request_id: {queuedRequestId}</Typography>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Paper>
  )
}
