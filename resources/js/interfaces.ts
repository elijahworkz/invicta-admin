export interface InvictaResourceObject {
	data: Object[]
	links: Object
	meta: {
		current_page: number
		total: number
		[key: string]: any
	}
	[key: string]: any
}

export interface InvictaFilterObject {
	[key: string]: any[]
}