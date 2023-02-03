import interface from "pusher-js/src/runtimes/interface";

export interface IResourceObject {
	data: Object[]
	links: Object
	meta: {
		current_page: number
		total: number
		[key: string]: any
	}
	[key: string]: any
}

export interface IFilterObject {
	[key: string]: any[]
}

export interface ICheckTree {
	label: string
	value: string | number
	checked: boolean
	children?: ICheckTree[]
}

export interface IFormFieldCondition {
    id: string
    operator: string
    value: any
}

export interface IFormField {
    id: string
    type: string
    label?: string
    info?: string
    info_position?: string
    if?: IFormFieldCondition
    if_any?: IFormFieldCondition[]
	params?: any,
	path?: string
}