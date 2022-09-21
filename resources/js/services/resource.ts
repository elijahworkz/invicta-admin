import { ref, reactive, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { Inertia } from '@inertiajs/inertia'
import { IResourceObject, IFilterObject} from '@/interfaces'
import pickBy from 'lodash/pickBy'

declare global {
	interface Window {
		Invicta: any
	}
}

const Invicta = window.Invicta

export const useResource = defineStore('resourceStore', () => {
	const data = ref<any>([])
	const search = ref<any>('')
	const currentPage = ref<any>(1)
	const perPage = ref<any>(10)
	const sortOrder = ref()
	const sortBy = ref()
	const activeFilters = ref([])
	const filterBadges = ref([])
	const requestUrl = ref<string>('')
	const api = ref<any>(null)
	const additionalParams = ref<any>(null)
	const total = ref<any>(0)
	const columns = ref<any>({})

	const pageChange = (page: number) => {
		console.log('see that you want to change page')
		currentPage.value = page == 1 ? null : page
	}

	const pageSizeChange = (size: number) => {
		perPage.value = size
	}

	Invicta.on('sort-change', ({ prop, order }: { prop: string, order: string}) => {
		console.log('hear sort', prop, order)
		sortOrder.value = order == 'ascending' ? 'asc' : 'desc'
		sortBy.value = prop
	})

	Invicta.on('search-change', (query: string) => {
		currentPage.value = null
		search.value = query
	})

	Invicta.on('clear-filters', () => {
		console.log('clearing filter')
		currentPage.value = null
		activeFilters.value = []
	})

	/* Filters */
	const requestFilters = ref(false)
	const updateFilters = (filters: IFilterObject): void => {

		currentPage.value = null

		for (const [key, item] of Object.entries(filters)) {

			if (typeof item === 'string' && item === '') {
				// @ts-ignore
				delete activeFilters.value[key]
			} else {
				activeFilters.value = {...activeFilters.value, ...filters}
			}
		}
		requestFilters.value = false
	}
	Invicta.on('update-filters', updateFilters as any)

	const setActiveFilters = (filters = null) => {
		if (filters) {
			activeFilters.value = JSON.parse(atob(filters))
			requestFilters.value = true
		}
	}

	const encodedFilters = computed(() => {
		return Object.keys(activeFilters.value).length
			? btoa(JSON.stringify(activeFilters.value))
			: null
	})

	/* Build and monitor request query */
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
			getResource()
		})

	// watch(activeFilters, (newState) => {
	// 	console.log('we have some changes here', newState)
	// })

	function init(resourceUrl: string, apiResource: any = null) {
		console.log('got some data', apiResource)
		requestUrl.value = resourceUrl

		if (apiResource) {
			api.value = true
			data.value = apiResource.data
			total.value = apiResource.meta.total
			additionalParams.value = apiResource.params
			filterBadges.value = apiResource.meta.filterBadges
			columns.value = apiResource.columns
		}
	}

	function getResource() {
		let query = pickBy(requestQuery.value)
		console.log('I should change', requestQuery.value, query, api)
		
		if (api.value) {
			query = additionalParams.value
				? { ...query, ...additionalParams.value }
				: query
			console.log(' I should ask api', query)

			Invicta.axios.get(requestUrl.value, { params: query })
				.then((response: { data: IResourceObject}) => {
					console.log('got some new data', response.data)
					data.value = response.data.data
					currentPage.value = response.data.meta.current_page
					total.value = response.data.meta.total
					filterBadges.value = response.data.meta.filterBadges
				})

		} else {

			if (! requestFilters.value) {
				Inertia.get(requestUrl.value, query, { preserveState: true})
			}
			requestFilters.value = false
		}
	}

	const resource = computed(() => data.value)
	
	return {
		init,
		resource,
		filterBadges,
		activeFilters,
		setActiveFilters,
		currentPage,
		perPage,
		pageChange,
		pageSizeChange,
		total,
		columns
		// resourceData,
		// requestQuery,
		// activeFilters,
		// sortOrder,
		// sortBy
	}
})