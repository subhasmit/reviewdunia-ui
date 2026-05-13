import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/@mui') || id.includes('node_modules/@emotion')) {
            return 'mui-vendor'
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'motion-vendor'
          }
          if (
            id.includes('node_modules/@reduxjs/toolkit') ||
            id.includes('node_modules/react-redux')
          ) {
            return 'state-vendor'
          }
          if (id.includes('node_modules/react-router-dom')) {
            return 'router-vendor'
          }
          return undefined
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    css: true,
  },
})
