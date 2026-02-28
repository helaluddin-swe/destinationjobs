import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  // mode is automatically "development" when running 'npm run dev'
  const isDevelopment = mode === 'development';
  
  // Choose which backend to hit
  // If you want to use the LIVE backend even during local dev, 
  // just set target to backendUrl directly.
  const localBackend = "http://localhost:5175";
  const backendUrl = "https://helaluddin-swe-destinationjobs-3yzu.vercel.app";

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        "/jobs": {
          // Change 'backendUrl' to 'localBackend' here if you are 
          // running your node server locally on port 5175
          target:isDevelopment?localBackend:backendUrl, 
          changeOrigin: true,
          secure: true,
        },
      }
    }
  }
})