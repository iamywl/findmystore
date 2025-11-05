// vite.config.js (수정)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 🚨 이 줄을 추가하여 정적 자산이 상대 경로("./")로 시작하도록 강제합니다.
  // Netlify의 MIME/경로 오류를 해결하는 가장 일반적인 방법입니다.
  base: './', 
});