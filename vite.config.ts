import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// GitHub Actions supplies the Pages base path; local development stays at /.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || '/',
});
