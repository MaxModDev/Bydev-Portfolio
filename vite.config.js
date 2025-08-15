import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const base = process.env.NODE_ENV === 'production'
  ? '/Bydev-portfolio/'
  : '/'

export default defineConfig({
  plugins: [react()],
  base,
})
