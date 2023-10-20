// import { defineStore } from 'pinia'

import { createSharedComposable } from '@vueuse/core'
const Invicta = window.Invicta

const definedForms = new Map()

export const useResourceForm = (id) => {
	// let formId = `resourceForm-${id}`
	if (!definedForms.has(id)) {
		definedForms.set(
			id,
			defineResourceForm(id)
		)
	}

	return definedForms.get(id)
}

const remoteData = new Map()

const defineResourceForm = (id) => {
	
	const formData = ref(null)
	const settings = {
		id: null,
		handle: null,
		actionUrl: '',
		mode: 'create',
		currentLocale: 'en',
		blueprint: {}
	}
	let additionalParams

	const readOnly = ref(false)

	const rules = {}
	const errors = ref(Invicta.errors)
	const processing = ref(false)
	const isDirty = ref(false)

	async function init(resource, url, params = {}) {

		if (formData.value) {
			console.log('we already have this form init', settings)
			Invicta.emit('resource-form-ready')
			return
		}

		additionalParams = params

		settings.handle = resource.meta?.handle ?? null
		settings.id = resource.meta?.id ?? null
		settings.actionUrl = url
		settings.mode = resource.item ? 'edit' : 'create'
		settings.blueprint = resource.blueprint

		// blueprint.value = resource.blueprint

		let itemData = resource.item ?? null
		formData.value = prepareFields(resource.blueprint, itemData)

		await getRemoteData()

		Invicta.emit('resource-form-ready')
		// getAssetActions()

		console.log('form init is complete', settings)
	}

	function setLocale(locale) {
		settings.currentLocale = locale
	}

	function setRelated(id) {
		// formData.value[id] = this.data[id]
	}

	function prepareFields(blueprint, itemData = null) {
		const getFieldData = (field) => {
			let id = 'path' in field ? field.path : field.id
			id = id.includes('.') ? split(id, '.')[0] : id
			let defaultValue = 'defaultValue' in field ? field.defaultValue : null
			return itemData
				? (id in itemData ? itemData[id] : defaultValue)
				: defaultValue
		}

		const getRelatedField = (fields) => {
			return fields.reduce((obj, item) => {
				if (item.fields) {
					let nested = getRelatedField(item.fields)
					return {...obj, ...nested}
				} else if (item.id && item.type.includes('related')) {
					let value = getFieldData(item)

					obj[item.id] = value
					return obj
				}
				return obj
			},{})
		}

		const setRemoteData = (field) => {
			// Check for remote options fields
			if (field.type == 'link') {
				if (! remoteData.has('linkField')) {
					remoteData.set('linkField', field.optionsUrl ?? '/api/fields/resource-link/options')
				}
			}

			if (field.type == 'textEditor') {
				if (! remoteData.has('textEditor')) {
					remoteData.set('textEditor', '/api/fields/texteditor/resources')
				}
			}

			if (field.type == 'asset') {
				if (! remoteData.has('assetActions')) {
					remoteData.set('assetActions', '/api/fields/assets/field-actions')
				}
			}

			if ('options' in field && isString(field.options) && field.type !== 'terms') {
				if (! remoteData.has(field.options)) {
					remoteData.set(field.options, field.options)
				}
			}	
		}

		const parseNestedFields = (fields) => {
			return fields.reduce((obj, item) => {
				if (item.fields) {
					let nested = parseNestedFields(item.fields)
					return {...obj, ...nested}
				} else {
					// here we get to the root of the field
					if (item.id) {
						// treat related?
						if (item.type.includes('related')) {
							let value = getFieldData(item)

							obj[item.id] = value
							return obj
						} else {
							// what do we do for others?
							setRemoteData(item)				
						}
					}
				}
			},{})
		}

		const getFields = (fields) => {
			return fields.reduce((obj, item) => {
				if (item.id) {
					let _id = 'path' in item ? item.path : item.id

					let dotPath = _id.includes('.') ? split(_id, '.') : false

					// Enable passing json fields without json wrapper
					_id = dotPath ? dotPath[0] : _id
					// Fix for conflict whith 'data' key
					// _id = _id == 'data' ? '_data' : _id
					
					let value = getFieldData(item)

					if (item.type == 'toggle' && typeof value == "number") {
						value = Boolean(value)
					}

					obj[_id] = value

					rules[_id] = item.validation
						? item.validation
						: 'nullable'

					if (item.fields) {
						let nested = parseNestedFields(item.fields)
						obj = {...obj, ...nested}
					}

					// Deep relationship check
					if (dotPath && item.type.includes('related')) {
						// get last field
						let relatedId = dotPath[dotPath.length - 1]
						
						obj[relatedId] = itemData ? itemData[relatedId] : null
					}

					setRemoteData(item)

					return obj
				} else if (item.type == 'row') {
					let rowFields = getFields(item.fields)

					obj = {...obj, ...rowFields}
				}

				return obj
			},{})
		}

		let fields = {}
		if (blueprint.fields) {
			fields = getFields(blueprint.fields)
		}
		if (blueprint.sidebar && blueprint.sidebar.fields) {
			fields = {...fields, ...getFields(blueprint.sidebar.fields)}
		}

		if (blueprint.sections) {
			blueprint.sections.forEach((section) => {
				if (section.fields) {
					fields = {...fields, ...getFields(section.fields)}
				}
			})
		}

		return fields
	}

	function setReadOnly(field) {


		function readOnly(fields) {
			fields.map(item => {
				if (item.fields) {
					return readOnly(item.fields)
				} else {
					let id = 'path' in item ? item.path : item.id
					if (id == field) {
						item.readOnly = true
					}
				}
				return item
			})
			return fields
		}

		parseBlueprint(readOnly)
	}

	function parseBlueprint(callback) {
		if (settings.blueprint.fields) {
			settings.blueprint.fields = callback(settings.blueprint.fields)
		}
		if (settings.blueprint.sidebar && settings.blueprint.sidebar.fields) {
			settings.blueprint.sidebar.fields = callback(settings.blueprint.sidebar.fields)
		}

		if (settings.blueprint.sections) {
			settings.blueprint.sections.forEach((section, index) => {
				if (section.fields) {
					settings.blueprint.sections[index].fields = callback(section.fields)
				}
			})
		}
	}

	function getRemoteData() {
		for (let [key, endpoint] of remoteData) {
			console.log('getRemoteData', key, endpoint)
			if (isString(endpoint)) {			
				Invicta.axios.get(endpoint)
					.then(({data}) => {
						remoteData.set(key, data)
					})
			}
		}
	}

	function submit(postSubmitAction) {

		let data = {
			fields: pickBy(formData.value),
			validation: rules,
			...additionalParams,
		}

		console.log('we have form submit', data)

		// Invicta.axios.post(this.actionUrl, data)
		// 	.then(({data}) => {
		// 		// console.log('ajax post submit', data)
		// 		Invicta.message(data.message)
		// 		Invicta.emit('resource-form-submitted')
		// 	})
		// 	.catch(({response}) => {
		// 		// console.log('api submit errors', response.status, response)
		// 		// Check if error is from validation
		// 		if (response.status == 422) {

		// 			// we need to unpack errors as they come as arrays
		// 			let errors = {}
		// 			for (const [key, value] of Object.entries(response.data.errors)) {
		// 				errors[key] = Array.isArray(value) ? value[0] : value
		// 			}

		// 			Invicta.setErrors(errors)
		// 		}
		// 	})
		// 	
		// document.removeEventListener('inertia:before', this.confirmUnsavedChanges)
		// let rules = this.rules
		// this.form
		// 	.transform((data) => ({
		// 		...data,
		// 		postSubmitAction,
		// 		validation: rules
		// 	}))
		// 	.post(this.actionUrl, {
		// 		onSuccess: () => {
		// 			if (postSubmitAction == 'create') {
		// 				this.form.reset()
		// 			}
		// 			this.dirty = false
		// 			Invicta.emit('resource-form-submitted')
		// 		}
		// 	})
	}

	return {
		init,

		get(id, defaultValue = null) {
			let result = get(formData.value, id, defaultValue)
			return !result && defaultValue ? defaultValue : result
		},
	
		set(id, value) {
			isDirty.value = true
			set(formData.value, id, value)
		},

		readOnly,

		processing,

		isDirty,

		errors,

		remoteData,

		formData,

		settings,

		setReadOnly,

		setLocale,

		submit,

		rules
	}
}

// export const useResourceForm = createSharedComposable(defineResourceForm)

export function getFields(fields) {

	return fields.reduce((obj, item) => {
		if (item.fields) {
			let nested = getFields(item.fields)
			return {...obj, ...nested}
		} else if (item.id) {
			obj[item.id] = ''
			return obj
		}
		return obj
	},{})
}
