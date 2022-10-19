import { defineStore } from 'pinia'
import get from 'lodash/get'
import set from 'lodash/set'
import { useForm } from '@inertiajs/inertia-vue3'
import { pickBy, map, split } from 'lodash'

declare global {
	interface Window {
		Invicta: any
	}
}

const Invicta = window.Invicta

interface IResourceItem {
	[key: string]: any
}

const definedForms = new Map()

export const useResourceForm = (id: string) => {
	let formId = `resourceForm-${id}`
	if (!definedForms.has(formId)) {
		definedForms.set(
			formId,
			defineResourceForm(id)
		)
	}

	return definedForms.get(formId)
}

const defineResourceForm = (id: string) => defineStore(`resourceForm-${id}`, {
	state: () => {
		return <IResourceItem>{
			mode: 'create',
			form: null,
			data: null,
			meta: {},
			actionUrl: null,
			// dirty: false,
			blueprint: {},
			rules: {},
			api: false,
			errors: Invicta.errors
		}
	},
	actions: {
		init(resource: IResourceItem, actionUrl: string, api: boolean) {
			this.data = resource.item ? resource.item : null
			this.meta = resource.meta
			this.mode = resource.meta?.id ? 'edit' : 'create'
			this.actionUrl = actionUrl
			this.blueprint = resource.blueprint
			this.api = api

			let formData = this.prepareFields(this.blueprint)
			this.form = useForm(formData)

			Invicta.emit('resource-form-ready')
		},
		get(id: string, defaultValue?: any): any {
			let result = get(this.form, id, defaultValue)
			return !result && defaultValue ? defaultValue : result
		},
		set(id: string, value: any) {
			set(this.form, id, value)
		},
		setRelated(id: string) {
			this.form[id] = this.data[id]
		},
		prepareFields(blueprint: IResourceItem) {
			const getFieldData = (field: any) => {
				let id = 'path' in field ? field.path : field.id
				id = id.includes('.') ? split(id, '.')[0] : id
				let defaultValue = 'defaultValue' in field ? field.defaultValue : null
				return this.data
					? (id in this.data ? this.data[id] : defaultValue)
					: defaultValue
			}

			const getRelatedField = (fields: any[]): object => {
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

			const getFields = (fields: any[]): object => {
				return fields.reduce((obj, item) => {
					if (item.id) {
						let _id = 'path' in item ? item.path : item.id
						// Fix for conflict whith 'data' key
						_id = _id == 'data' ? '_data' : _id
						// Enable passing json fields without json wrapper
						_id = _id.includes('.') ? split(_id, '.')[0] : _id
						
						let value = getFieldData(item)

						if (item.type == 'toggle' && typeof value == "number") {
							value = Boolean(value)
						}

						obj[_id] = value

						this.rules[_id] = item.validation
							? item.validation
							: 'nullable'

						if (item.fields) {

							if (item.type == 'json' && item.hasOwnProperty('prepopulate') && item.prepopulate) {
								// check if the current value is null - we don't want to overwrite the existing
								// values
								if (value === null) {

									obj[_id] = item.fields.reduce((_obj: any, _item: any) => {
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
						return obj
					} else if (item.type == 'row') {
						let rowFields = getFields(item.fields)
						obj = {...obj, ...rowFields}
					}

					return obj
				},{})
			}

			let fields: object = {}
			if (blueprint.fields) {
				fields = getFields(blueprint.fields)
			}
			if (blueprint.sidebar && blueprint.sidebar.fields) {
				fields = {...fields, ...getFields(blueprint.sidebar.fields)}
			}

			if (blueprint.sections) {
				blueprint.sections.forEach((section: IResourceItem) => {
					if (section.fields) {
						fields = {...fields, ...getFields(section.fields)}
					}
				})
			}

			return fields
		},
		setReadOnly(field: string) {

			function readOnly(fields: any[]) {
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
		parseBlueprint(callback: Function) {

			if (this.blueprint.fields) {
				this.blueprint.fields = callback(this.blueprint.fields)
			}
			if (this.blueprint.sidebar && this.blueprint.sidebar.fields) {
				this.blueprint.sidebar.fields = callback(this.blueprint.sidebar.fields)
			}

			if (this.blueprint.sections) {
				this.blueprint.sections.forEach((section: IResourceItem, index: any) => {
					if (section.fields) {
						this.blueprint.sections[index].fields = callback(section.fields)
					}
				})
			}
		},
		formData() {
			return this.form
				.transform((data: any) => ({
					...pickBy(data)
				}))
				.data()
		},
		submit(postSubmitAction: string) {

			if (this.api) {
				this.apiSubmit()
				return
			}

			document.removeEventListener('inertia:before', this.confirmUnsavedChanges)
			let rules = this.rules
			this.form
				.transform((data: any) => ({
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
				.then(({data}: any) => {
					console.log('ajax post submit', data)
					Invicta.message(data.message)
					Invicta.emit('resource-form-submitted')
				})
				.catch(({response}: any) => {
					// Check if error is from validation
					if (response.status == 422) {

						// we need to unpack errors as they come as arrays
						let errors: any = {}
						for (const [key, value] of Object.entries(response.data.errors)) {
							errors[key] = Array.isArray(value) ? value[0] : value
						}

						Invicta.setErrors(errors)
					}
				})
		},
		confirmUnsavedChanges(event: Event) {
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
		title(): string {
			let title = this.mode == 'edit'
				? get(this.form, this.meta.titleField)
				: this.meta.pageTitle

			if ('published' in this.form) {
				let status = get(this.form, 'published') ? 'success' : ''
				title = `<i class="icon-status ${status} mr-2"></i> ${title}`
			}

			return title
		},
		id(): any {
			return get(this.data, 'id')
		}
	}
})()

export function getFields(fields: any[]): object {

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