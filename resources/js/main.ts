declare global {
	interface Window {
		Invicta: any
	}
}

const Invicta: Object = {
	name: "something",
	start() {
		console.log('I got this here', this.name)
	}
}

export default Invicta
window.Invicta = Invicta