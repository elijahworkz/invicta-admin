import { createApp, h, ref } from 'vue'
import { Head, Link, createInertiaApp } from '@inertiajs/vue3'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { createPinia } from 'pinia'
import { setupAxios } from './services/axios'
import mitt from 'mitt'
import isNil from 'lodash/isNil'

// components
import { ElNotification } from 'element-plus'
import 'element-plus/es/components/message-box/style/index'
import 'element-plus/es/components/notification/style/index'
import 'element-plus/es/components/button-group/style/index'

// Layouts
import MainLayout from '@/layouts/MainLayout.vue'

// Setup Pinia
const pinia = createPinia()

class Invicta
{
	constructor() {
		this.app = null
		this.mountElement = '#app'
		this.bootingCallbacks = []
		this.eventBus = mitt()
		this.errors = ref({})
		this.loadingElement = document.querySelector('.loading.pulse')
		this.user = {
			data: null,
			name: null
		}
	}

	loadingStatus(status) {
		this.loadingElement.textContent = status
	}

	booting(callback) {
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
		this.event('InvictaReady')
	}

	initInertia(config) {

		this.config = config
		this.axios = setupAxios(`${this.getConfig('appUrl')}${this.getConfig('appPath')}/api`)
		this.user = JSON.parse(atob(this.getConfig('user')))
		delete(this.config.user)

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


	getConfig(key) {
		if (this.config && Object.prototype.hasOwnProperty.call(this.config, key)) {
			return this.config[key]
		}
		return []
	}

	can(ability) {
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

		this.app.mount(this.mountElement)

		console.log('started Invicta', this.pages)
	}

	componentExists(name) {
		return !isNil(this.app._context.components[name])
	}

	component(name, component) {
		if (!this.componentExists(name)) {
			this.app.component(name, component)
		}
	}

	// Emits dom events
	event(name, data = null) {
		let e = (data)
			? new CustomEvent(name, { detail: {data} })
			: new Event(name)

		document.dispatchEvent(e)
	}

	// Listents to mitt events
	on(name, callback) {
		this.eventBus.on(name, callback)
	}

	// Remove mitt events
	off(name, callback) {
		this.eventBus.off(name, callback)
	}

	// Emits mitt events
	emit(name, data = {}) {
		this.eventBus.emit(name, data)
	}

	setErrors(errors) {
		console.log('I see you want to add errors', errors)
		this.errors.value = errors
	}

	remember(key, value = null) {
		key = `invicta-${key}`

		if (! value) {
			return localStorage.getItem(key)
		} else {
			localStorage.setItem(key, value)
		}
	}

	message(args) {
		ElNotification({...args})
	}

	log(message, payload = null) {
		if (payload) {
			console.log(`[Invicta] ${message}`, payload)
		} else {
			console.log('[Invicta]', message)
		}
	}
}

export default Invicta
