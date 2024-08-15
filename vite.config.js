import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

let baseUrl
switch (process.env.ENVIRONMENT){
  case "local":
    baseUrl = process.env.LOCAL_BASE_URL
    break;
  case "debug":
    baseUrl = process.env.DEBUG_BASE_URL
    break;
  case "production":
    baseUrl = process.env.PRODUCTION_BASE_URL
    break;
}

console.log(baseUrl)
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
