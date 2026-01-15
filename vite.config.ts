import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',      // Allows access from network (not just localhost)
    port: 3034,           // Your desired port
    strictPort: true,     // Exit if port is already in use
  },
})
