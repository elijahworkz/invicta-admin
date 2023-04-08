import { defineStore } from 'pinia'

const Invicta = window.Invicta

const definedForms = new Map()

export const useResourceForm = (id) => {
	let formId = `resourceForm-${id}`
	if (!definedForms.has(formId)) {
		definedForms.set(
			formId,
			defineResourceForm(id)
		)
	}

	return definedForms.get(formId)
}

const defineResourceForm = (id) => defineStore(`resourceForm-${id}`, {
	state: () => {
		return {
			mode: 'create',
			form: null,
			meta: {},
			localizations: null,
			actionUrl: null,
			readOnly: true,
			blueprint: {},
			rules: {},
			assetActions: [],
			api: false,
			errors: Invicta.errors
		}
	},
	actions: {
		init(resource, actionUrl, api) {
			let itemData = resource.item ? resource.item : null
			this.meta = resource.meta
			this.mode = resource.meta?.id ? 'edit' : 'create'
			this.actionUrl = actionUrl
			this.blueprint = resource.blueprint
			this.localizations = resource.localizations
			this.api = api

			let formData = this.prepareFields(this.blueprint, itemData)
			this.form = useForm(formData)

			Invicta.emit('resource-form-ready')
			this.getAssetActions()
		},
		get(id, defaultValue = null) {
			let result = get(this.form, id, defaultValue)
			return !result && defaultValue ? defaultValue : result
		},
		set(id, value) {
			set(this.form, id, value)
		},
		setRelated(id) {
			this.form[id] = this.data[id]
		},
		prepareFields(blueprint, itemData = null) {
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

			const getFields = (fields) => {
				return fields.reduce((obj, item) => {
					if (item.id) {
						let _id = 'path' in item ? item.path : item.id

						let dotPath = _id.includes('.') ? split(_id, '.') : false

						// Enable passing json fields without json wrapper
						_id = dotPath ? dotPath[0] : _id
						// Fix for conflict whith 'data' key
						_id = _id == 'data' ? '_data' : _id
						
						let value = getFieldData(item)

						if (item.type == 'toggle' && typeof value == "number") {
							value = Boolean(value)
						}

						obj[_id] = value

						this.rules[_id] = item.validation
							? item.validation
							: 'nullable'

						if (item.fields) {

							if (item.type == 'json' && item.hasOwnProperty('populateFields') && item.populateFields) {
								// check if the current value is null - we don't want to overwrite the existing
								// values
								
								if (value === null) {

									obj[_id] = item.fields.reduce((_obj, _item) => {
										_obj[_item.id] = _item.defaultValue || null
										return _obj
									}, {})
								}	
							} else {
								// check for related fields nested into other fields
								let nested = getRelatedField(item.fields)
								obj = {...obj, ...nested}
							}
						}

						// Deep relationship check
						if (dotPath && item.type.includes('related')) {
							// get last field
							let relatedId = dotPath[dotPath.length - 1]
							
							obj[relatedId] = itemData ? itemData[relatedId] : null
						}

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
		},
		setReadOnly(field) {

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

			this.parseBlueprint(readOnly)

		},
		parseBlueprint(callback) {

			if (this.blueprint.fields) {
				this.blueprint.fields = callback(this.blueprint.fields)
			}
			if (this.blueprint.sidebar && this.blueprint.sidebar.fields) {
				this.blueprint.sidebar.fields = callback(this.blueprint.sidebar.fields)
			}

			if (this.blueprint.sections) {
				this.blueprint.sections.forEach((section, index) => {
					if (section.fields) {
						this.blueprint.sections[index].fields = callback(section.fields)
					}
				})
			}
		},
		getAssetActions() {
			Invicta.axios.get('api/assets/field-actions')
				.then(({data}) => {
					this.assetActions = data
				})
		},
		formData() {
			return this.form
				.transform((data) => ({
					...pickBy(data)
				}))
				.data()
		},
		submit(postSubmitAction) {

			if (this.api) {
				this.apiSubmit()
				return
			}

			document.removeEventListener('inertia:before', this.confirmUnsavedChanges)
			let rules = this.rules
			this.form
				.transform((data) => ({
					...data,
					postSubmitAction,
					validation: rules
				}))
				.post(this.actionUrl, {
					onSuccess: () => {
						if (postSubmitAction == 'create') {
							this.form.reset()
						}
						this.dirty = false
						Invicta.emit('resource-form-submitted')
					}
				})
		},
		apiSubmit() {
			let data = {
				fields: this.formData(),
				validation: this.rules
			}

			if (typeof this.api === 'object') {
				data = {...data, ...this.api}
			}

			Invicta.axios.post(this.actionUrl, data)
				.then(({data}) => {
					// console.log('ajax post submit', data)
					Invicta.message(data.message)
					Invicta.emit('resource-form-submitted')
				})
				.catch(({response}) => {
					// console.log('api submit errors', response.status, response)
					// Check if error is from validation
					if (response.status == 422) {

						// we need to unpack errors as they come as arrays
						let errors = {}
						for (const [key, value] of Object.entries(response.data.errors)) {
							errors[key] = Array.isArray(value) ? value[0] : value
						}

						Invicta.setErrors(errors)
					}
				})
		},
		confirmUnsavedChanges(event) {
			if (this.dirty) {
				if(! confirm('You have unsaved changes. Leave anyway?')) {
					event.preventDefault()
				} else {
					document.removeEventListener('inertia:before', this.confirmUnsavedChanges)
				}
			}	
		}
	},
	getters: {
		title() {
			let title = this.meta.pageTitle

			if (this.mode == 'edit' && this.meta.titleField !== 'id' && this.meta.titleField in this.form  ) {
				title = get(this.form, this.meta.titleField)
			}

			if ('published' in this.form) {
				let status = get(this.form, 'published') ? 'success' : ''
				title = `<i class="icon-status ${status} mr-2"></i> ${title}`
			}

			return title
		},
		id() {
			return get(this.form, 'id')
		}
	}
})()

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
