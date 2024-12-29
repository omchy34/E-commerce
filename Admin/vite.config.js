import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://e-commerceserver-uu0f.onrender.com', 
        changeOrigin: true,
        secure: false, 
      },
    },
  },
});
