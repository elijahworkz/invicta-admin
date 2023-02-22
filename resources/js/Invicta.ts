import { createApp, h, ref } from 'vue'
import { Head, Link, createInertiaApp } from '@inertiajs/vue3'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { createPinia } from 'pinia'
import { setupAxios } from './services/axios'
import { AxiosInstance } from 'axios'
// import { setupEcho } from './services/echo'
import mitt from 'mitt'
import isNil from 'lodash/isNil'
// import { InvictaConfigObject } from './common/interfaces'

// global components
import SvgIcon from '@/components/shared/SvgIcon.vue'
import CheckTree from '@/components/shared/CheckTree.vue'
import Drawer from '@/components/shared/Drawer.vue'
import { ElNotification, ElMessageBox } from 'element-plus'
import 'element-plus/es/components/message-box/style/index'
import 'element-plus/es/components/notification/style/index'
import 'element-plus/es/components/button-group/style/index'

// Layouts
import MainLayout from '@/layouts/MainLayout.vue'

// Setup Pinia
const pinia = createPinia()

class Invicta
{
	app: any
	mountElement: any
	config: any
	user: any
	bootingCallbacks: Function[]
	pages: any
	eventBus: any
	axios: AxiosInstance | null
	errors: any

	constructor(config: any) {
		this.app = null
		this.mountElement = '#app'
		this.user = config.user
		delete config.user
		this.config = config
		this.bootingCallbacks = []
		this.eventBus = mitt()
		this.axios = setupAxios(`${this.getConfig('appUrl')}${this.getConfig('appPath')}/api`)
		this.errors = ref({})
	}

	booting(callback: Function) {
		console.log('we have a new callback')
		this.bootingCallbacks.push(callback)
	}

	boot() {
		console.log('in boot', this.bootingCallbacks)
		this.bootingCallbacks.forEach(callback => callback(this.app))
	}

	setup({ el, App, props, plugin }) {
		this.mountElement = el
		this.app = createApp({ render: () => h(App, props) })

		this.app.use(plugin)
		this.app.use(pinia)
		this.app.component('Head', Head)
		this.app.component('Link', Link)
		this.app.component('SvgIcon', SvgIcon)
		this.app.component('CheckTree', CheckTree)
		this.app.component('Drawer', Drawer)
		this.event('InvictaReady')
	}

	initInertia() {

		createInertiaApp({
			title: (title) => `${title} - ${this.getConfig('appName')}`,
			resolve: (name) => {
				console.log('checking', name)
				const page = resolvePageComponent(`./views/${name}.vue`, import.meta.glob('./views/**/*.vue'))

				page.then((module) => {
		            module.default.layout = module.default.layout || MainLayout
		        });

		        return page
			},
			setup: this.setup.bind(this)
		})
	}

	getConfig(key: string) {
		if (this.config && Object.prototype.hasOwnProperty.call(this.config, key)) {
			return this.config[key]
		}
		return []
	}

	can(ability: string) {
		if(this.user.dev == undefined || this.user.permissions == undefined)
			return false

		if(this.user.dev) {
			return true
		}
		return this.user.permissions.includes(ability)
	}

	start() {
		console.log(' i am starting')
		this.boot()

		// InertiaProgress.init({
		// 	// The color of the progress bar.
		// 	color: '#29d',

		// 	// Whether to include the default NProgress styles.
		// 	includeCSS: true,

		// 	// Whether the NProgress spinner will be shown.
		// 	showSpinner: false,
		// })

		this.app.mount(this.mountElement)

		console.log('started Invicta', this.pages)

		// console.log('checking components', this.app._context.components)
	}

	componentExists(name: string) {
		return !isNil(this.app._context.components[name])
	}

	component(name: string, component: any) {
		if (!this.componentExists(name)) {
			this.app.component(name, component)
		}
	}

	// Emits dom events
	event(name: string, data: Object | null = null) {
		let e = (data)
			? new CustomEvent(name, { detail: {data} })
			: new Event(name)

		document.dispatchEvent(e)
	}

	// Listents to mitt events
	on(name: string, callback: Function) {
		this.eventBus.on(name, callback)
	}

	// Remove mitt events
	off(name: string, callback: Function) {
		this.eventBus.off(name, callback)
	}

	// Emits mitt events
	emit(name: string, data?: unknown) {
		this.eventBus.emit(name, data)
	}

	setErrors(errors: any) {
		console.log('I see you want to add errors', errors)
		this.errors.value = errors
	}

	remember(key: string, value?: unknown) {
		key = `invicta-${key}`

		if (! value) {
			return localStorage.getItem(key)
		} else {
			localStorage.setItem(key, value)
		}
	}

	message(args: Object) {
		ElNotification({...args})
	}

	log(message: string, payload: any = null): void {
		if (payload) {
			console.log(`[Invicta] ${message}`, payload)
		} else {
			console.log('[Invicta]', message)
		}
	}
}

export default Invicta
