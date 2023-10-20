const definedEndPoints = new Map()

export const useRemoteOptions = (url) => {
	// let formId = `resourceForm-${id}`
	if (!definedEndPoints.has(url)) {
		definedEndPoints.set(
			url,
			defineEndPoint(url)
		)
	}

	return definedEndPoints.get(url)
}

const defineEndPoint = (url) => {

	const options = ref([])

	return {
		async get() {
			console.log('calling for options', url, options.value)

			if (options.value.length) {
				return options.value
			}

			
			options.value = { data } = await Invicta.axios.get(url)

			return options.value
		},
		options
	}
}