import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/logs': 'http://localhost:8000' // 백엔드 API 프록시
    }
  }
});
