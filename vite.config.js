import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  lintOnSave: false,
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    }
  },
  plugins: [vue()]
})
