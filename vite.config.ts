import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for a React + TypeScript project.
// See https://vitejs.dev/config/ for more details.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist',
  },
});