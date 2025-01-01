import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/math-contents/',
  server: {
    hmr: false,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  }
})
