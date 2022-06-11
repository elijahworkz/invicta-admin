import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/inertia-vue3'
import { InertiaProgress } from '@inertiajs/progress'
import { AxiosInstance } from 'axios'
// import { setupAxios } from './services/axios'
// import { InvictaConfigObject } from './common/interfaces'

// global components
import { Link } from '@inertiajs/inertia-vue3'
// import Loading from '@/components/shared/Loading.vue'
// import SvgIcon from '@/components/shared/SvgIcon.vue'
import { ElNotification } from 'element-plus'
import 'element-plus/es/components/message/style/index';
import 'element-plus/es/components/notification/style/index';

// Layouts
import MainLayout from '@/layouts/MainLayout.vue'

class Invicta
{	
	config: any

	constructor(config: any) {
		this.config = config
	}

	initInertia() {
		console.log('I am in initInertia')

		createInertiaApp({
			resolve: async(name) => {
				const page = (await import(`./views/${name}.vue`)).default
				page.layout = MainLayout
				return page
			},
			setup: ({el, app, props, plugin}): void => {
				createApp({ render: () => h(app, props) })
					.use(plugin)
					.component('Link', Link)
					.mount(el)
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
	}
}

export default Invicta

function getConfig(key: any, string: any) {
	throw new Error('Function not implemented.')
}
