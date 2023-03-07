import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import path from 'node:path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    include: ".js"
  })],
  
  esbuild: { loader: "jsx", include: /src\/.*\.jsx?$/, exclude: [] }, optimizeDeps: { esbuildOptions: { plugins: [ { name: "load-js-files-as-jsx", setup(build) { build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => { return ({ loader: "jsx", contents: await fs.readFile(args.path, "utf8"), }) }); }, }, ], }, },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.js'),
      name: 'isy-widget-support',
      formats: ['es', 'umd'],
      fileName: (format) => `wid.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'styled-components'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})
