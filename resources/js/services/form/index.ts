import { defineStore } from 'pinia'
import get from 'lodash/get'
import set from 'lodash/set'

interface IResourceItem {
	[key: string]: any
}

export const useResourceForm = defineStore('resourceForm', {
	state: () => {
		return <IResourceItem>{
			data: {},
			meta: {},
			blueprint: {},
			dirty: false
		}
	},
	actions: {
		init(resource: IResourceItem) {
			this.data = resource.item
			this.meta = resource.meta
			// this.data = Object.prototype.hasOwnProperty.call(resource, 'data')
			// 	? resource.data
			// 	: resource
			this.blueprint = parseBlueprint(resource.blueprint)
		},
		isDirty() {
			return this.dirty
		},
		get(id: string): any {
			return get(this.data, id)
		},
		set(id: string, value: any) {
			set(this.data, id, value)
			this.dirty = true
		}
	},
	getters: {
		title(): string {
			return get(this.data, this.meta.title_field)
		},
		id(): any {
			return get(this.data, 'id')
		},
		rules() {
			return {
				email: {
					required: true
				}
			}
		}
	}
})

export function getFields(fields: any[]): object {

	return fields.reduce((obj, item) => {
		if (item.fields) {
			let nested = getFields(item.fields)
			return {...obj, ...nested}
		} else {
			obj[item.id] = ''
			return obj
		}
	},{})
}

function parseBlueprint(blueprint: IResourceItem) {

	if (Object.prototype.hasOwnProperty.call(blueprint, 'fields'))
		return getFields(blueprint.fields)
}

