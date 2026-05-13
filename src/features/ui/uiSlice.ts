import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface UiState {
  adminMode: boolean
}

const initialState: UiState = {
  adminMode: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleAdminMode: (state) => {
      state.adminMode = !state.adminMode
    },
    setAdminMode: (state, action: PayloadAction<boolean>) => {
      state.adminMode = action.payload
    },
  },
})

export const { toggleAdminMode, setAdminMode } = uiSlice.actions
export default uiSlice.reducer
