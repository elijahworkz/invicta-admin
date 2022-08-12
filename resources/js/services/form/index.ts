import { defineStore } from 'pinia'
import get from 'lodash/get'
import set from 'lodash/set'
import { useForm } from '@inertiajs/inertia-vue3'

interface IResourceItem {
	[key: string]: any
}

export const useResourceForm = (id: string) => defineStore(`resourceForm-${id}`, {
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

			const getRelatedField = (fields: any[]): object => {
				return fields.reduce((obj, item) => {
					if (item.fields) {
						let nested = getRelatedField(item.fields)
						return {...obj, ...nested}
					} else if (item.id && item.type.includes('related')) {
						let value = this.data
							? get(this.data, item.id)
							: null

						obj[item.id] = value
						return obj
					}
					return obj
				},{})
			}

			const getFields = (fields: any[]): object => {
				return fields.reduce((obj, item) => {
					if (item.id) {
						let value = this.data
							? (item.id in this.data ? this.data[item.id] : null)
							: null


						obj[item.id] = value

						if (item.fields) {
							// check for related fields nested into other fields
							let nested = getRelatedField(item.fields)
							console.log('got something', nested)
							obj = {...obj, ...nested}
						}
						return obj
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
				.transform((data) => ({
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