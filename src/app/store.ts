import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { api } from '../services/api'
import uiReducer from '../features/ui/uiSlice'
import uploadReducer from '../features/upload/uploadSlice'

export const createStore = () => {
  const configuredStore = configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      ui: uiReducer,
      upload: uploadReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  })

  setupListeners(configuredStore.dispatch)
  return configuredStore
}

export const store = createStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
