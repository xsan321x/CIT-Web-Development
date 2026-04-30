import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/auth': process.env.VITE_API_URL || 'http://127.0.0.1:5001',
      '/api': process.env.VITE_API_URL || 'http://127.0.0.1:5001'
    }
  },
  define: {
    __API_URL__: JSON.stringify(process.env.VITE_API_URL || '')
  }
})
