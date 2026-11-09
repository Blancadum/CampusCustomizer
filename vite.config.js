import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { openFolderPlugin } from './vite-plugins/openFolderPlugin.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), openFolderPlugin()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/highlight.js')) {
            return 'vendor-highlight';
          }
          if (
            id.includes('node_modules/react-markdown') ||
            id.includes('node_modules/remark-') ||
            id.includes('node_modules/rehype-') ||
            id.includes('node_modules/micromark') ||
            id.includes('node_modules/mdast') ||
            id.includes('node_modules/hast') ||
            id.includes('node_modules/parse5') ||
            id.includes('node_modules/unist') ||
            id.includes('node_modules/vfile') ||
            id.includes('node_modules/property-information') ||
            id.includes('node_modules/space-separated-tokens') ||
            id.includes('node_modules/comma-separated-tokens')
          ) {
            return 'vendor-markdown';
          }
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/react-router')) {
            return 'vendor-react';
          }
        }
      }
    },
    chunkSizeWarningLimit: 800,
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.{js,jsx}', 'backend/**/*.test.js', 'vite-plugins/**/*.test.js'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{js,jsx}', 'backend/**/*.js'],
    },
  },
})
