import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    mimeTypes: {
      // add the MIME types you need to support
      'application/javascript': ['js'],
      'text/css': ['css'],
      'text/html': ['html'],
      'image/svg+xml': ['svg'],
      'application/json': ['json'],
    },
  },
});
