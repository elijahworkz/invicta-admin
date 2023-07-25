import { defineStore } from 'pinia'
// import { router } from '@inertiajs/vue3'

const Invicta = window.Invicta

const definedResources = new Map()

export const useResource = (id = 'store') => {
	let resourceId = `resource-${id}`
	if (!definedResources.has(resourceId)) {
		definedResources.set(
			resourceId,
			defineResource(id)
		)
	}

	return definedResources.get(resourceId)
}

const defineResource = (id) => defineStore(`resource-${id}`, () => {
	const resourceHandle = id
	const resourceData = ref([])
	const search = ref('')
	const currentPage = ref(1)
	const perPage = ref()
	const sortOrder = ref()
	const sortBy = ref()
	const activeFilters = ref([])
	const filterBadges = ref([])
	const requestUrl = ref('')
	const api = ref(null)
	const additionalParams = ref(null)
	const total = ref(0)
	const columns = ref({})
	const currentLocale = ref('')

	const setLocale = (locale) => {
		console.log('see you change locale', locale)
		currentLocale.value = locale
		currentPage.value = 1
	}

	const pageChange = (page) => {
		console.log('see that you want to change page', resourceHandle, page, currentPage.value)
		currentPage.value = page//page == 1 ? null : page
	}

	const pageSizeChange = (size) => {
		perPage.value = size
	}

	Invicta.on('sort-change', ({ prop, order, handle }) => {
		console.log('hear sort', prop, order, handle)
		if (resourceHandle == handle) {
			sortOrder.value = order == 'ascending' ? 'asc' : 'desc'
			sortBy.value = prop
		}
	})

	Invicta.on('search-change', ({query, handle}) => {
		console.log('search-change event', query, handle, resourceHandle)
		if (resourceHandle == handle) {
			currentPage.value = 1
			search.value = query
		}
	})

	Invicta.on('clear-filters', (handle) => {
		console.log('clearing filter for', handle)
		if (resourceHandle == handle) {
			currentPage.value = 1
			activeFilters.value = []
		}
	})

	/* Filters */
	const requestFilters = ref(false)
	const updateFilters = ({filter, handle}) => {
		// should check for resource id here?
		if (resourceHandle == handle) {		
			currentPage.value = null

			for (const [key, item] of Object.entries(filter)) {

				if (typeof item === 'string' && item === '') {
					// @ts-ignore
					delete activeFilters.value[key]
				} else {
					activeFilters.value = {...activeFilters.value, ...filter}
				}
			}
			requestFilters.value = false
		}
	}
	Invicta.on('update-filters', updateFilters)

	// check if there are already active filters coming with resource
	// this can happen on a page reload with filters in url - in this case
	// we need to set activeFilters manually from what came with resource
	// but prevent the getResource function from loading it again
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

	// check if there are already search coming with resource
	const setSearch = (query = null) => {
		if (query) {
			requestFilters.value = true // we need to set api to false to avoid reload on initial page load
			search.value = query
		}
	}

	/* Build and monitor request query */
	const requestQuery = computed(() => {
		return {
			page: currentPage.value,
			per_page: perPage.value,
			sort_by: sortBy.value,
			sort_order: sortOrder.value,
			search: search.value,
			filters: encodedFilters.value,
			locale: currentLocale.value,
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
				sortBy.value +
				currentLocale.value
			)
		},
		() => {
			getResource()
		})

	// watch(activeFilters, (newState) => {
	// 	console.log('we have some changes here', newState)
	// })

	function init(resourceUrl, resource, useApi = false) {
		console.log('got some data', resource)
		requestUrl.value = resourceUrl
		currentPage.value = resource.meta.current_page
		resourceData.value = resource.data
		total.value = resource.meta.total
		filterBadges.value = resource.meta.filterBadges

		if (useApi) {
			api.value = true
			additionalParams.value = resource.params
			columns.value = resource.meta.columns
		}
	}

	function getResource() {
		let query = pickBy(requestQuery.value)

		// console.log('I should change', requestUrl, requestQuery.value, api.value)

		if (api.value) {
			query = additionalParams.value
				? { ...query, ...additionalParams.value }
				: query
			console.log(' I should ask api', query)
		}

		// we send request only if it's api or if requestFilters is false
		if (api.value || !requestFilters.value) {

			if (! api.value) {
				let queryString = Object.keys(query).map(key => key + '=' + query[key]).join('&')
				window.history.replaceState(null, null, `?${queryString}`)
			}

			Invicta.axios.get(requestUrl.value, { params: query })
				.then(({data}) => {
					console.log('got some new data', data)
					resourceData.value = data.data
					currentPage.value = data.meta.current_page
					total.value = data.meta.total
					filterBadges.value = data.meta.filterBadges
				})

		}
		requestFilters.value = false // we always reset requestFilters
	}

	function selectAll() {
		let query = pickBy(requestQuery.value)

		query.selectAll = true

		return Invicta.axios.get(requestUrl.value, { params: query })
	}
	
	return {
		handle: resourceHandle,
		init,
		filterBadges,
		activeFilters,
		setActiveFilters,
		setSearch,
		currentPage,
		perPage,
		pageChange,
		pageSizeChange,
		total,
		columns,
		setLocale,
		currentLocale,
		resourceData,
		getResource,
		selectAll
	}
})()