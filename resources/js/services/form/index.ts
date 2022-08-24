import { defineStore } from 'pinia'
import get from 'lodash/get'
import set from 'lodash/set'
import { useForm } from '@inertiajs/inertia-vue3'
import { pickBy } from 'lodash'
import { IFormField } from '@/interfaces'

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
			dirty: false
		}
	},
	actions: {
		init(resource: IResourceItem, actionUrl: string) {
			this.data = resource.item ? resource.item : null
			this.meta = resource.meta
			this.mode = this.data ? 'edit' : 'create'
			this.actionUrl = actionUrl
			console.log(resource.blueprint);
			let formData = this.prepareFields(resource.blueprint)
			this.form = useForm(formData)
		},
		isDirty() {
			return this.dirty
		},
		get(id: string, defaultValue?: any): any {
			let result = get(this.form, id, defaultValue)
			return !result && defaultValue ? defaultValue : result
		},
		set(id: string, value: any) {
			set(this.form, id, value)
			this.dirty = true
		},
		setRelated(id: string) {
			this.form[id] = this.data[id]
		},
		prepareFields(blueprint: IResourceItem) {
			const getFieldData = (field: any) => {
				let id = 'path' in field ? field.path : field.id
				return this.data
					? (id in this.data ? this.data[id] : null)
					: null
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
		submit(postSubmitAction: string) {
			this.form
				.transform((data: any) => ({
					...data,
					postSubmitAction,
				}))
				.post(this.actionUrl, {
					onSuccess: () => {
						if (postSubmitAction == 'create') {
							this.form.reset()
						}
					}
				})
		}
	},
	getters: {
		title(): string {
			return this.mode == 'edit'
				? get(this.form, this.meta.title_field)
				: this.meta.createTitle
		},
		id(): any {
			return get(this.form, 'id')
		},
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