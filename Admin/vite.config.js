import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5673', // Your backend server's URL
        changeOrigin: true,
        secure: false, 
      },
    },
  },
});
