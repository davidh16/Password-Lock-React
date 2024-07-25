import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const baseUrl = import.meta.env.BASE_URL;
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
