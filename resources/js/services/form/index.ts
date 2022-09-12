import { defineStore } from 'pinia'
import get from 'lodash/get'
import set from 'lodash/set'
import { useForm } from '@inertiajs/inertia-vue3'
import { pickBy } from 'lodash'

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
			dirty: false,
			blueprint: {},
			rules: {},
		}
	},
	actions: {
		init(resource: IResourceItem, actionUrl: string) {
			this.data = resource.item ? resource.item : null
			this.meta = resource.meta
			this.mode = resource.meta.id ? 'edit' : 'create'
			this.actionUrl = actionUrl
			this.blueprint = resource.blueprint

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
						let value = getFieldData(item)


						obj[_id] = value

						this.rules[_id] = item.validation
							? item.validation
							: 'nullable'

						if (item.fields) {
							// check for related fields nested into other fields
							let nested = getRelatedField(item.fields)
							obj = {...obj, ...nested}
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
					} else if (item.id == field) {
						item.readOnly = true
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
		title(): string {
			let title = this.mode == 'edit'
				? get(this.form, this.meta.titleField)
				: this.meta.createTitle

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