import { defineStore } from 'pinia'
import get from 'lodash/get'
import set from 'lodash/set'

// interface IResourceItem {
// 	[key: string]: any
// }

export const useResourceForm = defineStore('resourceForm', {
	state: () => {
		return {
			data: {},
			blueprint: {},
			dirty: false
		}
	},
	actions: {
		init(resource: object, blueprint: object) {
			this.data = resource
			// this.data = Object.prototype.hasOwnProperty.call(resource, 'data')
			// 	? resource.data
			// 	: resource
			this.blueprint = blueprint
		},
		isDirty() {
			return this.dirty
		},
		get(id: string) {
			return get(this.data, id)
		},
		set(id: string, value: any) {
			set(this.data, id, value)
			this.dirty = true
		}
	},
	getters: {
		rules() {
			return {
				email: {
					required: true
				}
			}
		}
	}
})


