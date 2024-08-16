import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({

  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5713,
    proxy: {
      '/api': {
        target: "http://backend:8080",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 5713,
  },
  define: {
    'process.env': process.env
  }
})
