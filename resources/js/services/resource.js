// import { defineStore } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import { createSharedComposable } from '@vueuse/core'

const Invicta = window.Invicta

const definedResources = new Map()

// export const useResource = (id = 'store') => {
// 	let resourceId = `resource-${id}`
// 	if (!definedResources.has(resourceId)) {
// 		definedResources.set(
// 			resourceId,
// 			createSharedComposable(defineResource(id))
// 		)
// 	}

// 	return definedResources.get(resourceId)
// }



const defineResource = (handle) => {

	if (! definedResources.has(handle)) {
		definedResources.set(handle, { settings: null, filters: null, actions: null})
	}
	const definedResource = reactive(definedResources.get(handle))
	// const definedResource = reactive({ settings: null, filters: null, actions: null})

	const resourceHandle = handle
	const requestUrl = ref('')
	const resourceData = ref([])
	const resourceSettings = ref(null)
	const resourceFilters = ref([])
	const resourceActions = ref([])

	const currentLocale = ref('')
	const currentPage = ref(1)
	const perPage = ref()
	const sortOrder = ref()
	const sortBy = ref()
	const total = ref(0)

	const search = ref('')
	const activeFilters = ref({})
	const filterBadges = ref([])

	const tableSettings = ref({})
	const columns = ref({})

	// is resource used for a form field (i.e. no need to update route)
	const formResource = ref(false)
	const additionalParams = ref(null)

	const loading = ref(false)

	const setLocale = (locale) => {
		console.log('see you change locale', locale, requestUrl, resourceHandle)
		currentLocale.value = locale
		currentPage.value = 1
	}

	const setPage = (page) => {
		currentPage.value = page//page == 1 ? null : page
		console.log('see that you want to change page', page, currentPage.value, requestUrl)
	}

	const setPageSize = (size) => {
		perPage.value = size
	}

	Invicta.on('sort-change', ({ prop, order }) => {
		sortOrder.value = order == 'ascending' ? 'asc' : 'desc'
		sortBy.value = prop
	})

	// Invicta.on('search-change', ({query, handle}) => {
	// 	console.log('search-change event', query, handle, resourceHandle)
	// 	if (resourceHandle == handle) {
	// 		currentPage.value = 1
	// 		search.value = query
	// 	}
	// })

	// check if there are already search coming with resource
	const setSearch = (query = null) => {
		currentPage.value = 1
		search.value = query
		console.log('I get some searching', query, requestQuery)
	}

	/* Filters */
	const updateFilters = ({filter, handle}) => {
		// should check for resource id here?
		if (resourceHandle == handle) {		

			for (const [key, item] of Object.entries(filter)) {

				if (typeof item === 'string' && item === '') {
					// @ts-ignore
					delete activeFilters.value[key]
				} else {
					activeFilters.value = {...activeFilters.value, ...filter}
				}
			}
			currentPage.value = 1
		}
	}
	Invicta.on('update-filters', updateFilters)

	const encodedFilters = computed(() => {
		return Object.keys(activeFilters.value).length
			? btoa(JSON.stringify(activeFilters.value))
			: null
	})

	const clearFilters = () => {
		currentPage.value = 1
		activeFilters.value = {}
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
		requestQuery,
		() => {
			console.log('Something changed in requestQuery', requestQuery)
			getResource()
		})

	function initIndex(route) {
		let makeRequest = true

		// 	let resourceId = `resource-${id}`
		if (definedResource.settings) {
			// makeRequest = false
			console.log('Ive been here already')
			Invicta.pageTitle(definedResource.settings.title)
		}

		// we need to make an initial request to get the data
		// but only if this is not a first page load with some query params already
		// present - in that case - the request will be made automatically

		console.log('1. init Index', route.path)
		requestUrl.value = `api${route.path}`
		
		if (route.query.search) {
			search.value = route.query.search
			makeRequest = false
		}

		if (route.query.page) {
			currentPage.value = Number(route.query.page)
			makeRequest = false
		}

		if (route.query.filters) {
			activeFilters.value = JSON.parse(atob(route.query.filters))
			makeRequest = false
		}

		if (makeRequest) {		
			getResource()
		}

		getResourceFilters()
		getResourceActions()
	}

	function initForm(resourceUrl, resource) {
		formResource.value = true
		requestUrl.value = resourceUrl
		currentPage.value = resource.meta.current_page
		resourceData.value = resource.data
		total.value = resource.meta.total
		filterBadges.value = resource.meta.filterBadges
		additionalParams.value = resource.params

		definedResource.settings = {
			...resource.meta.settings,
			tableSettings: resource.meta.table,
			columns: resource.meta.columns
		}
	}

	function getResource() {
		loading.value = true

		let query = pickBy(requestQuery.value, (value, key) => {
			if (value) {
				if (key == 'page') {
					return value > 1
				}
				return true
			}
		})

		console.log('2. I should change', requestUrl.value, requestQuery.value)

		if (formResource.value) {
			query = additionalParams.value
				? { ...query, ...additionalParams.value }
				: query
			console.log(' I should ask api', query)
		} else {
			let queryString = Object.keys(query).map(key => key + '=' + query[key]).join('&')
			// window.history.replaceState(null, null, `?${queryString}`)
			
			console.log('3. I have this query', query)
			Invicta.router.replace({ query })
		}

		if (! definedResource.settings) {
			query.settings = true
		}


		Invicta.axios.get(requestUrl.value, { params: query })
			.then(({data}) => {
				console.log('4. got some new data', data)
				resourceData.value = data.data
				total.value = data.meta.total
				filterBadges.value = data.meta.filterBadges

				if (data.meta.current_page !== currentPage.value) {
					currentPage.value = data.meta.current_page
				}

				if (data.meta.settings) {
					definedResource.settings = data.meta.settings
					Invicta.pageTitle(data.meta.settings.title)
				}

				loading.value = false
			})
	}

	function getResourceFilters() {
		if (! definedResource.filters) {
			Invicta.axios.get(`${requestUrl.value}/filters`)
				.then(({data}) => {

					if (data.length) {
						definedResource.filters = data.map(filter => {
							let initialValue = ''

							if (Object.keys(activeFilters.value).length) {
								initialValue = filterFn(activeFilters.value, (item, key) => {
									// console.log(filter.class, key, item)
									return filter.class == key
								})[0]
							}
							filter.initialValue = initialValue
							return filter
						})
					}
				})
		}
	}

	function getResourceActions() {
		if (! definedResource.actions) {
			Invicta.axios.get(`${requestUrl.value}/actions`)
				.then(({data}) => {
					if (data.length) {

						resourceActions.value = data.reduce((obj, item) => {
							obj[item.type] = obj[item.type] || []
							obj[item.type].push(item)
							return obj
						},{})
					}
				})
		}
	}

	function selectAll() {
		let query = pickBy(requestQuery.value)

		query.selectAll = true

		return Invicta.axios.get(requestUrl.value, { params: query })
	}

	return {
		initIndex,
		initForm,
		getResource,
		setSearch,
		setLocale,
		setPage,
		setPageSize,
		selectAll,
		clearFilters,
		static: definedResource,
		requestUrl,
		currentLocale,
		data: reactive({
			resourceData,
			filterBadges,
			activeFilters,
			currentPage,
			perPage,
			total,
			currentLocale,
			loading,
		})
	}
}

export const useResource = createSharedComposable(defineResource)