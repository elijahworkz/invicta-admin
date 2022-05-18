import '@/assets/styles/main.css' // tailwind css
import '@/assets/sass/main.scss' // custom css

import InvictaApp from '@/Invicta'

declare global {
	interface Window {
		Invicta: any
	}
}

const Invicta = new InvictaApp()
Invicta.initInertia()
window.Invicta = Invicta