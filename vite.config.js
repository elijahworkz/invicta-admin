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
			// hotFile: 'public/vendor/invicta/hot',
			input: ['resources/js/main.js'],
			buildDirectory: '/vendor/invicta/',
			refresh: true,
		}),
		vue({
			template: {
                transformAssetUrls: {
                    // The Vue plugin will re-write asset URLs, when referenced
                    // in Single File Components, to point to the Laravel web
                    // server. Setting this to `null` allows the Laravel plugin
                    // to instead re-write asset URLs to point to the Vite
                    // server instead.
                    base: null,
 
                    // The Vue plugin will parse absolute URLs and treat them
                    // as absolute paths to files on disk. Setting this to
                    // `false` will leave absolute URLs un-touched so they can
                    // reference assets in the public directory as expected.
                    includeAbsolute: false,
                },
            },
		}),
		AutoImport({
			imports: [
				'vue',
				{
					'@vueuse/core': ['onClickOutside', 'onKeyStroke', 'useTitle', 'useClipboard', 'usePermission', 'useEventSource']
				}
			],
			dirs: ['resources/js/services/**', 'resources/js/utils'],
		}),
		Components({
			resolvers: [
				ElementPlusResolver({
					importStyle: "sass"
				})
			],
			dirs: ['resources/js/components'],
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
			'axios',
			'lodash-es'
		]
	},
	rollupOptions: {
		external: ['vue', 'axios', 'element-plus']
	}
})