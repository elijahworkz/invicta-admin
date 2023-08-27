import { defineConfig, splitVendorChunkPlugin } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'
import vue from '@vitejs/plugin-vue'
import laravel from 'laravel-vite-plugin'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import serverConfig from './server.config.js'

const path = require('path')

export default defineConfig({
	server: serverConfig,
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './resources/js'),
			'~/': `${path.resolve(__dirname, 'resources/js')}/`
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@use "~/assets/sass/element/variables.scss" as *;`,
			},
		}
	},
	plugins: [
		splitVendorChunkPlugin(),
		laravel({
			input: ['resources/js/main.js'],
			buildDirectory: '/vendor/invicta/'
		}),
		vue(),
		AutoImport({
			imports: [
				'vue',
				{
					'@vueuse/core': ['onClickOutside', 'onKeyStroke', 'useClipboard', 'usePermission', 'useEventSource']
				},
				{
					'@inertiajs/vue3': ['useForm', 'usePage', 'router']
				}
			],
			dirs: ['resources/js/services/**', 'resources/js/utils'],
			resolvers: [
				ElementPlusResolver(),
			],
		}),
		Components({
			dirs: ['resources/js/components'],
			resolvers: [ElementPlusResolver({
				importStyle: 'sass'
			})]
		}),
		viteCompression(),
		viteCompression({
			algorithm: 'brotliCompress',
		}),
		visualizer()
	],
	optimizeDeps: {
		include: [
			'vue',
			'@inertiajs/vue3',
			'axios',
			'lodash-es'
		]
	},
	rollupOptions: {
		external: ['vue', 'axios', 'element-plus']
	}
})