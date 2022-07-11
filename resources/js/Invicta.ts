import { createApp, h } from 'vue'
import { App, plugin, Head } from '@inertiajs/inertia-vue3'
import { InertiaProgress } from '@inertiajs/progress'
import { setupAxios } from './services/axios'
import mitt from 'mitt'
// import { InvictaConfigObject } from './common/interfaces'

// global components
import { Link } from '@inertiajs/inertia-vue3'
// import Loading from '@/components/shared/Loading.vue'
import SvgIcon from '@/components/shared/SvgIcon.vue'
import { ElNotification } from 'element-plus'
import 'element-plus/es/components/message/style/index';
import 'element-plus/es/components/notification/style/index';

// Layouts
import MainLayout from '@/layouts/MainLayout.vue'
import { create } from 'lodash'


class Invicta
{	
	app: any
	mountElement: string
	config: any
	bootingCallbacks: Function[]
	pages: any
	eventBus: any

	constructor(config: any) {
		this.app = null
		this.mountElement = '#app'
		this.config = config
		this.bootingCallbacks = []
		this.eventBus = mitt()

		this.pages = {
			'Invicta.Login': () => import('./views/Auth/Login.vue'),
			'Invicta.ForgotPassword': () => import('./views/Auth/ForgotPassword.vue'),
			'Invicta.ResetPassword': () => import('./views/Auth/ResetPassword.vue'),
			'Invicta.Home': () => import('./views/Home.vue'),
			'Invicta.Resource': () => import('./views/Resource.vue')
		}
		// this.pages = import.meta.glob('./views/*.vue')
	}

	booting(callback: Function) {
		console.log('we have a new callback')
		this.bootingCallbacks.push(callback)
	}

	boot() {
		console.log('in boot', this.bootingCallbacks)
		this.bootingCallbacks.forEach(callback => callback(this.app))
	}

	initInertia() {

		let appElement = document.querySelector(this.mountElement)
		let inertiaData = appElement?.getAttribute('data-page') || ''

		this.app = createApp({
			render: () => h(App, {
				initialPage: JSON.parse(inertiaData),
				titleCallback: (title: string) => `${title} - ${this.getConfig('appName')}`,
				resolveComponent: async (name) => {

					const page = name.includes('Invicta.')
						? (await this.pages[name]()).default
						: this.pages[name]

					page.layout ??= MainLayout

					return page
				}
			})
		})

		this.app.use(plugin)
		this.app.component('Head', Head)
		this.app.component('Link', Link)
		this.app.component('SvgIcon', SvgIcon)
		this.event('InvictaReady')
	}

	getConfig(key: string) {
		if (this.config && Object.prototype.hasOwnProperty.call(this.config, key)) {
			return this.config[key]
		}
		return []
	}

	start() {
		console.log(' i am starting')
		this.boot()

		this.app.mount('#app')

		console.log('started Invicta', this.pages)
	}

	inertia(name: string, component: any) {
		// this.pages = {...this.pages, ...name}
		this.pages[name] = component
		console.log('want to add', name, this.pages)
	}

	// component(name: string, component: any) {
	// 	this.app.component(name, component)
	// }
	// 
	// Emits dom events
	event(name: string, data?: Object | null = null) {
		let e = (data)
			? new CustomEvent(name, { detail: {data} })
			: new Event(name)

		document.dispatchEvent(e)
	}

	// Listents to mitt events
	on(name: string, callback: Function) {
		this.eventBus.on(name, callback)
	}

	// Emits mitt events
	emit(name: string, data?: unknown) {
		this.eventBus.emit(name, data)
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
