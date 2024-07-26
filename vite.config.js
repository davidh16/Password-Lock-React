import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

const baseUrl = process.env.BASE_URL
export default defineConfig({

  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5713,
    proxy: {
      '/api': {
        target: baseUrl,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 5713,
  },
})
