<template>
	<el-input
		:key="handle" 
		v-model="search"
		:placeholder="searchStrings.placeholder"
		:title="searchStrings.title"
		:prefix-icon="Search"
		:input-style="{ width: '250px' }">
		<template #prepend>
			<Filters 
				v-if="resourceIndex.static.filters" 
				:resource-handle="handle" 
				:filters="resourceIndex.static.filters"
				:active-filters="resourceIndex.data.activeFilters" />
		</template>
		<template #append v-if="canReset">
			<el-button :icon="RefreshLeft" @click="reset" title="Clear all filters"></el-button>
		</template>
	</el-input>
</template>

<script setup>
import { Search, RefreshLeft } from '@element-plus/icons-vue'

const props = defineProps({
	currentSearch: {
		type: String,
		default: '',
	},
	searchStrings: {
		type: Object,
		default: () => ({ placeholder: 'Search', title: 'Type to search' })
	},
	handle: String,
	filters: String,
})

const resourceIndex = useResource(props.handle)
const search = ref(props.currentSearch)
const canReset = computed(() => !isEmpty(resourceIndex.activeFilters) || search.value !== '')

watch(search, debounce(newSearch => {
	resourceIndex.setSearch(newSearch)
}, 400))

const reset = () => {
	search.value = ''
}

onMounted(() => {
	Invicta.axios.get(`api/resource/${props.handle}/filters`)
		.then(({data}) => {
			if (data.length) {
				resourceIndex.static.filters = data
			}
		})
})
</script>