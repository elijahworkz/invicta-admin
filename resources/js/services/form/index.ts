import { defineStore } from 'pinia'
import get from 'lodash/get'
import set from 'lodash/set'
import { useForm, usePage } from '@inertiajs/inertia-vue3'
import { isArray } from 'lodash'

interface IResourceItem {
	[key: string]: any
}

export const useResourceForm = defineStore('resourceForm', {
	state: () => {
		return <IResourceItem>{
			form: null,
			data: null,
			meta: {},
			blueprint: {},
			dirty: false
		}
	},
	actions: {
		init(resource: IResourceItem) {
			this.data = resource.item
			this.meta = resource.meta

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
					if (item.fields) {
						// check for related fields nested into other fields
						let nested = getRelatedField(item.fields)
						console.log('got nested', nested, {...obj, ...nested})

						return {...obj, ...nested}
					} else if (item.id) {
						let value = this.data
							? get(this.data, item.id)
							: null

						obj[item.id] = value
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
		}
	},
	getters: {
		title(): string {
			return get(this.form, this.meta.title_field)
		},
		id(): any {
			return get(this.form, 'id')
		},
	}
})

// export function getAllFields(fields: any[]): object {

// 	return fields.reduce((obj, item) => {
// 		if (item.fields) {
// 			let nested = getAllFields(item.fields)
// 			return {...obj, ...nested}
// 		} else if (item.id) {
// 			obj[item.id] = ''
// 			return obj
// 		}
// 		return obj
// 	},{})
// }