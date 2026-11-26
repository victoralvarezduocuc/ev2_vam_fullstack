import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Las llamadas a /api/... se reenvían al backend (Spring Boot, puerto 8081).
// Así el navegador siempre habla con el mismo origen y no hay problemas de CORS.
const api = { '/api': { target: 'http://localhost:8081', changeOrigin: true } };

export default defineConfig({
  plugins: [react()],
  base: './',
  server: { proxy: api },
  preview: { proxy: api },
});
