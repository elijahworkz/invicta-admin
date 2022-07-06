import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import laravel from 'laravel-vite-plugin'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import serverConfig from './server.config.js'

const path = require('path')

export default defineConfig({
	server: serverConfig,
	plugins: [
		laravel(['resources/js/main.ts']),
		vue({
			template: {
				transformAssetsUrls: {
					base: null,
					includeAbsolute: false,
				}
			}
		}),
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
})