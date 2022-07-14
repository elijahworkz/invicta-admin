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