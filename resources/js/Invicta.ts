import { createApp, h } from 'vue'
import { App, plugin, Head } from '@inertiajs/inertia-vue3'
import { InertiaProgress } from '@inertiajs/progress'
import { createPinia } from 'pinia'
import { setupAxios } from './services/axios'
import { AxiosInstance } from 'axios'
import mitt from 'mitt'
import isNil from 'lodash/isNil'
// import { InvictaConfigObject } from './common/interfaces'

// global components
import { Link } from '@inertiajs/inertia-vue3'
// import Loading from '@/components/shared/Loading.vue'
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
	mountElement: string
	config: any
	user: any
	bootingCallbacks: Function[]
	pages: any
	eventBus: any
	axios: AxiosInstance | null

	constructor(config: any) {
		this.app = null
		this.mountElement = '#app'
		this.user = config.user
		delete config.user
		this.config = config
		this.bootingCallbacks = []
		this.eventBus = mitt()
		this.axios = setupAxios(`${this.getConfig('appUrl')}${this.getConfig('appPath')}/api`)

		this.pages = {
			'Invicta.Login': () => import('./views/Auth/Login.vue'),
			'Invicta.ForgotPassword': () => import('./views/Auth/ForgotPassword.vue'),
			'Invicta.ResetPassword': () => import('./views/Auth/ResetPassword.vue'),
			'Invicta.Home': () => import('./views/Home.vue'),
			'Invicta.Resource': () => import('./views/ResourceIndex.vue'),
			'Invicta.Resource.Reorder': () => import('./views/ResourceReorder.vue'),
			'Invicta.Resource.Create': () => import('./views/ResourceEdit.vue'),
			'Invicta.Resource.Edit': () => import('./views/ResourceEdit.vue'),
			'Invicta.Permission.Edit': () => import('./views/PermissionEdit.vue'),
			'NavIndex': () => import('./views/NavIndex.vue'),
			'NavEdit': () => import('./views/NavEdit.vue'),
			'NavItemsEdit': () => import('./views/NavItemsEdit.vue'),
		}
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
					let page = this.pages[name]

					if (typeof page === 'undefined') {
						throw new Error(`Page not found: ${name}`)
					}
					// page = typeof page === 'function' ? page() : page
					// const page = name.includes('Invicta.')
					// 	? (await this.pages[name]()).default
					// 	: this.pages[name]

					page = typeof page === 'function'
						? (await page()).default
						: page

					page.layout ??= MainLayout

					return page
				}
			})
		})

		this.app.use(plugin)
		this.app.use(pinia)
		this.app.component('Head', Head)
		this.app.component('Link', Link)
		this.app.component('SvgIcon', SvgIcon)
		this.app.component('CheckTree', CheckTree)
		this.app.component('Drawer', Drawer)
		this.event('InvictaReady')
	}

	getConfig(key: string) {
		if (this.config && Object.prototype.hasOwnProperty.call(this.config, key)) {
			return this.config[key]
		}
		return []
	}

	can(ability: string) {
		if(this.user.is_super == undefined || this.user.permissions == undefined)
			return false

		if(this.user.is_super) {
			return true
		}
		return this.user.permissions.includes(ability)
	}

	start() {
		console.log(' i am starting')
		this.boot()

		InertiaProgress.init({
			// The color of the progress bar.
			color: '#29d',

			// Whether to include the default NProgress styles.
			includeCSS: true,

			// Whether the NProgress spinner will be shown.
			showSpinner: false,
		})

		this.app.mount('#app')

		console.log('started Invicta', this.pages)

		console.log('checking components', this.app._context.components)
	}

	inertia(name: string, component: any) {
		// this.pages = {...this.pages, ...name}
		this.pages[name] = component
		console.log('want to add', name, this.pages)
	}

	componentExists(name: string) {
		return !isNil(this.app._context.components[name])
	}

	component(name: string, component: any) {
		if (!this.componentExists(name)) {
			this.app.component(name, component)
		}
	}
	//
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

	// Emits mitt events
	emit(name: string, data?: unknown) {
		this.eventBus.emit(name, data)
	}

	message(args: Object) {
		ElNotification({...args, position: 'bottom-left'})
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
