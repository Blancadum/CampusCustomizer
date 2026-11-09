import { exec } from 'child_process'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

function openFolderPlugin() {
  return {
    name: 'open-folder-plugin',
    configureServer(server) {
      server.middlewares.use('/api/open-folder', (req, res) => {
        const url = new URL(req.url, 'http://localhost')
        const folder = url.searchParams.get('path') || '/Users/blanca/Micampus/public/eacs/ent/EAC2'
        exec(`open "${folder}"`)
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ ok: true, path: folder }))
      })
    }
  }
}

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
    include: ['src/**/*.test.{js,jsx}', 'backend/**/*.test.js'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{js,jsx}', 'backend/**/*.js'],
    },
  },
})
