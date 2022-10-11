<template>
	<el-input
		v-model="search"
		:placeholder="searchStrings.placeholder"
		:title="searchStrings.title"
		:prefix-icon="Search"
		:input-style="{ width: '250px' }">
		<template #prepend>
			<Filters :resource-handle="handle" :filters="filters" />
		</template>
		<template #append v-if="canReset">
			<el-button  :icon="Refresh" @click="reset" title="Clear"></el-button>
		</template>
	</el-input>
</template>

<script setup>
import { Search, Refresh } from '@element-plus/icons-vue'

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
	Invicta.emit('search-change', {query: newSearch, handle: props.handle})

}, 400))

const reset = () => {
	search.value = ''
	Invicta.emit('clear-filters', true)
}
</script>