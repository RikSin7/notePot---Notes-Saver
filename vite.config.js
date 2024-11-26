import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
<<<<<<< HEAD
  server: {
    host: true, 
    port: 5173, 
  },
  plugins: [react()],
  build: {
    rollupOptions: {},
  },
  base: "/",
});
=======
  plugins: [react()],
  build: {
    rollupOptions: {
    }
  },
  base: '/'
})
>>>>>>> origin/main
