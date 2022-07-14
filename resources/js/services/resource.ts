import { ref, computed, watch, onMounted } from 'vue'
import { Inertia } from '@/services'
import { IResourceObject, IFilterObject} from '@/interfaces'
import pickBy from 'lodash/pickBy'

declare global {
	interface Window {
		Invicta: any
	}
}

const Invicta = window.Invicta

export const useResource = (resource: IResourceObject, pageUrl: string) => {
	const search = ref<any>('')
	const currentPage = ref<any>(resource.meta.current_page)
	const perPage = ref<any>(resource.meta.per_page)
	const sortOrder = ref()
	const sortBy = ref()
	const activeFilters = ref([])

	onMounted(() => { 
		if (Object.prototype.hasOwnProperty.call(resource.meta.filters, 'filters')) {
			let decodedFilters = JSON.parse(atob(resource.meta.filters.filters))
			Invicta.emit('request-filters', decodedFilters)
		}
	})

	Invicta.on('page-change', (page) => {
		currentPage.value = page == 1 ? null : page
	})

	Invicta.on('page-size-change', (size) => {
		perPage.value = size
	})

	Invicta.on('sort-change', ({ prop, order }: { prop: string, order: string}) => {
		sortOrder.value = order == 'ascending' ? 'asc' : 'desc'
		sortBy.value = prop
	})

	Invicta.on('sort-order-change', (order: string) => {
		sortOrder.value = order == 'ascending' ? 'asc' : 'desc'
	})

	Invicta.on('search-change', (query: string) => {
		currentPage.value = null
		search.value = query
	})

	Invicta.on('clear-filters', () => {
		currentPage.value = null
		activeFilters.value = []
	})

	const updateFilters = (filters: IFilterObject): void => {

		currentPage.value = null

		for (const [key, item] of Object.entries(filters)) {
			if (! item.length) {
				// @ts-ignore
				delete activeFilters.value[key]
			} else {
				activeFilters.value = {...activeFilters.value, ...filters}
			}
		}
	}
	Invicta.on('update-filters', updateFilters as any)

	const encodedFilters = computed(() => {
		return Object.keys(activeFilters.value).length
			? btoa(JSON.stringify(activeFilters.value))
			: null
	})

	const requestQuery = computed(() => {
		return {
			page: currentPage.value,
			per_page: perPage.value,
			sort_by: sortBy.value,
			sort_order: sortOrder.value,
			search: search.value,
			filters: encodedFilters.value,
		}
	})

	watch(
		() => {
			return (
				currentPage.value +
				search.value +
				encodedFilters.value +
				perPage.value +
				sortOrder.value +
				sortBy.value
			)
		},
		() => {
			getresource()
		})


	function getresource() {
		let query = pickBy(requestQuery.value)
		console.log('I should change', pageUrl, requestQuery.value, query)
		Inertia.get(pageUrl, query, { preserveState: true})
	}

	
	return {
		requestQuery,
	}
}