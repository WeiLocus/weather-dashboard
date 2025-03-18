import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    base: '/weather-dashboard/',
    esbuild: {
      // 在 production 模式下移除 console.log
      pure: mode === 'production' ? ['console.log'] : [],
    },
  }
})
