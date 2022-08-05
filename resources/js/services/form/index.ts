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
			// data: {},
			meta: {},
			blueprint: {},
			dirty: false
		}
	},
	actions: {
		init(resource: IResourceItem) {
			// this.data = resource.item
			this.meta = resource.meta
			this.form = useForm(resource.item)
			// this.data = Object.prototype.hasOwnProperty.call(resource, 'data')
			// 	? resource.data
			// 	: resource
			this.blueprint = parseBlueprint(resource.blueprint)
		},
		isDirty() {
			return this.dirty
		},
		get(id: string): any {
			return get(this.form, id)
		},
		set(id: string, value: any) {
			set(this.form, id, value)
			this.dirty = true
		},
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

function parseBlueprint(blueprint: IResourceItem) {

	if (Object.prototype.hasOwnProperty.call(blueprint, 'fields'))
		return getFields(blueprint.fields)
}

