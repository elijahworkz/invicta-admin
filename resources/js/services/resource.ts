import { ref, computed, watch, onMounted } from 'vue'
import { Events, Inertia } from '@/services'
import { InvictaResourceObject, InvictaFilterObject} from '@/interfaces'
import pickBy from 'lodash/pickBy'


export const useResource = (resource: InvictaResourceObject, pageUrl: string) => {
	const search = ref<any>('')
	const currentPage = ref<any>(resource.meta.current_page)
	const perPage = ref()
	const sortOrder = ref()
	const activeFilters = ref([])

	onMounted(() => { 
		if (Object.prototype.hasOwnProperty.call(resource.meta, 'filters')) {
			let decodedFilters = JSON.parse(atob(resource.meta.filters))
			Invicta.emit('request-filters', decodedFilters)
		}
	})

	Events.on('page-change', (page) => {
		currentPage.value = page == 1 ? null : page
	})

	Events.on('page-size-change', (size) => {
		perPage.value = size
	})

	Events.on('sort-order-change', (order) => {
		sortOrder.value = order
	})

	Events.on('search-change', (query) => {
		currentPage.value = null
		search.value = query
	})

	Events.on('clear-filters', () => {
		currentPage.value = null
		activeFilters.value = []
	})

	const updateFilters = (filters: InvictaFilterObject): void => {

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
	Events.on('update-filters', updateFilters as any)

	const encodedFilters = computed(() => {
		return Object.keys(activeFilters.value).length
			? btoa(JSON.stringify(activeFilters.value))
			: null
	})

	const requestQuery = computed(() => {
		return {
			page: currentPage.value,
			per_page: perPage.value,
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
				sortOrder.value
			)
		},
		() => {
			getresource()
		})


	function getresource() {
		let query = pickBy(requestQuery.value)
		// console.log('I should change', pageUrl, requestQuery.value, query)
		Inertia.get(pageUrl, query, { preserveState: true})
	}

	
	return {
		requestQuery,
	}
}