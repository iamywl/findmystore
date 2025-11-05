// vite.config.js (dotenv 제거 후 표준 Vite 설정 복구)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // define 설정도 필요 없으며, Vite가 env_file에서 VITE_NAVER_MAP_CLIENT_ID를 자동으로 로드합니다.
})