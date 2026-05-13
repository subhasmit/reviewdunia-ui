import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface UploadUiState {
  isDragging: boolean
  selectedFileName: string | null
  queuedRequestId: string | null
}

const initialState: UploadUiState = {
  isDragging: false,
  selectedFileName: null,
  queuedRequestId: null,
}

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    setDragging: (state, action: PayloadAction<boolean>) => {
      state.isDragging = action.payload
    },
    setSelectedFileName: (state, action: PayloadAction<string | null>) => {
      state.selectedFileName = action.payload
    },
    setQueuedRequestId: (state, action: PayloadAction<string | null>) => {
      state.queuedRequestId = action.payload
    },
    clearUploadUiState: () => initialState,
  },
})

export const {
  clearUploadUiState,
  setDragging,
  setQueuedRequestId,
  setSelectedFileName,
} = uploadSlice.actions
export default uploadSlice.reducer
