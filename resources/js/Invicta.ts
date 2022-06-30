import { createApp, h } from 'vue'
import { createInertiaApp, App, plugin } from '@inertiajs/inertia-vue3'
import { InertiaProgress } from '@inertiajs/progress'
import { AxiosInstance } from 'axios'
// import { setupAxios } from './services/axios'
// import { InvictaConfigObject } from './common/interfaces'

// global components
import { Link } from '@inertiajs/inertia-vue3'
// import Loading from '@/components/shared/Loading.vue'
import SvgIcon from '@/components/global/SvgIcon.vue'
import { ElNotification } from 'element-plus'
import 'element-plus/es/components/message/style/index';
import 'element-plus/es/components/notification/style/index';

// Layouts
import MainLayout from '@/layouts/MainLayout.vue'
import { create } from 'lodash'

class Invicta
{	
	app: any
	mountElement: HTMLElement | null
	config: any
	bootingCallbacks: Function[]
	pages: any

	constructor(config: any) {
		this.app = null
		this.mountElement = document.getElementById('app')
		this.config = config
		this.bootingCallbacks = []

		// this.pages = {
		// 	'Invicta.Home': () => import('./views/Home.vue'),
		// 	'Invicta.Resource': () => import('./views/Resource.vue')
		// }
		this.pages = import.meta.glob('./views/*.vue')
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

		// this.app = createApp({
		// 	render: () => h(App, {
		// 		initialPage: JSON.parse(this.mountElement.dataset.page),
		// 		resolveComponent: async (name) => {
		// 			const page = (await this.pages[`./views/${name}.vue`]).default

		// 			page.layout = MainLayout

		// 			return page //page().then((module) => module.default)
		// 		}
		// 	})
		// })
// const app = createApp({
// 	render: () => h(App, {
// 		initialPage: JSON.parse(el.dataset.page),
// 			resolveComponent: async name => {
// 				if (import.meta.env.DEV) {
// 					return (await import(`./Pages/${name}.vue`)).default;
// 				} else {
// 					let pages = asyncViews();
// 					const importPage = pages[`./Pages/${name}.vue`];
// 					return importPage().then(module => module.default);
// 				}
// 			}
// 		})
// 	})
		// this.app.use(plugin)
		
		createInertiaApp({
			resolve: async(name) => {
				console.log(name, this.pages)
				// const page = (await import(`./views/${name}.vue`)).default
				// let page = this.pages[`./views/${name}.vue`]
				let page
				if (name == 'Student') {
					page = this.pages[name]
				} else {
					page = (await this.pages[`./views/${name}.vue`]()).default
				}
				page.layout = MainLayout
				return page
			},
			setup: ({el, app, props, plugin}): void => {
				console.log(' are you there?')
				// this.mountElement = el
				this.app = createApp({ render: () => h(app, props) })
				this.app.use(plugin)
		this.app.component('Link', Link)
		this.app.component('SvgIcon', SvgIcon)
				this.app.mount(el)
			}
		})
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

		// this.app.mount('#app')
	}

	inertia(name, component) {
		this.pages[name] = component
		console.log('want to add', name, this.pages)
	}

	// component(name: string, component: any) {
	// 	this.app.component(name, component)
	// }

	log(message: string, payload: any = null): void {
		if (payload) {
			console.log(`[Invicta] ${message}`, payload)
		} else {
			console.log('[Invicta]', message)
		}
	}	
}

export default Invicta
