import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  "server":{
    "proxy":{
      "/jobs":{
        target:"http://localhost:5175",
        secure:false,
        changeOrigin:true
      }
    }
  }
})
