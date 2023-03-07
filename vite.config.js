import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import path from 'node:path';


export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/App.jsx'),
      name: 'iseeyoutech-widget-web',
      fileName: (format) => `iseeyoutech-widget-web.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React'
        }
      }
    }
  },
  plugins: [react()]
})