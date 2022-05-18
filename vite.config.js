import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const path = require('path')

export default defineConfig(({command}) => ({
  base: command === 'serve' ? '' : '/invicta-admin',
  // server: {
  //   host: 'invicta.local',
  // },
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