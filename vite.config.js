import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const path = require('path')

export default defineConfig(({command}) => ({
  base: command === 'serve' ? '' : '/invicta-admin',
  server: {
    host: '0.0.0.0',
    cors: {
      origin: 'https://8000-ilyagromov-invictadev-uk7235k3xyz.ws-eu47.gitpod.io',
      credentials: true
    },
    hmr: process.env.GITPOD_WORKSPACE_URL
    ? {
        // removes the protocol and replaces it with the port we're connecting to
        host: process.env.GITPOD_WORKSPACE_URL.replace('https://', '3000-'),
        protocol: 'wss',
        clientPort: 443
      }
    : true
  },
  publicDir: false,
  build: {
    manifest: true,
    outDir: 'public/invicta-admin',
    rollupOptions: {
      input: 'resources/js/main.ts'
    },
  },
  plugins: [
    vue(),
    svgLoader(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver({
        importStyle: 'sass'
      })]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './resources/js'),
      '~/': `${path.resolve(__dirname, 'resources/js')}/`
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/assets/sass/element/custom.scss" as *;`,
      },
    }
  },
  optimizeDeps: {
    include: [
      'vue',
      '@inertiajs/inertia',
      '@inertiajs/inertia-vue3',
      '@inertiajs/progress',
      'pusher-js',
      'axios'
    ]
  }
}))