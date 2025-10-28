import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Use BASE_PATH when provided (CI), otherwise default to '/'
  base: process.env.BASE_PATH ?? '/Harrisdesign/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
