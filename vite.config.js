// vite.config.js (Client ID 강제 삽입)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// dotenv를 사용하여 .env 파일을 수동으로 로드합니다. (Docker에서 변수 로딩 실패 시 대비)
// dotenv 설치: npm install dotenv
import dotenv from 'dotenv';
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 🚨 환경 변수를 수동으로 정의하여 Client ID가 import.meta.env에 삽입되도록 합니다.
  define: {
    // process.env가 Node.js 환경에서 작동하므로, .env 로드 후 값을 JSON.stringify로 삽입합니다.
    'import.meta.env.VITE_NAVER_MAP_CLIENT_ID': JSON.stringify(process.env.VITE_NAVER_MAP_CLIENT_ID || '5mw0x26vq5')
  }
})