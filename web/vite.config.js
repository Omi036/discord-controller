import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  clearScreen:false,
  server: {
    port: process.env.WEBPORT || 5018,
    open: process.env.DOCKER_OPEN === "false" ? false : true,
    host: process.env.VITE_BIND ?? "localhost"
  }
})
