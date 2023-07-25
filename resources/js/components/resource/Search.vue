<template>
	<el-input
		v-model="search" clearable
		:placeholder="searchStrings.placeholder"
		:title="searchStrings.title"
		:prefix-icon="Search"
		size="large"
		@clear="search = ''">
	</el-input>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'

const props = defineProps({
	handle: String,
	currentSearch: {
		type: String,
		default: '',
	},
	searchStrings: {
		type: Object,
		default: () => ({ placeholder: 'Search', title: 'Type to search' })
	},
})

const search = ref(props.currentSearch)

onMounted(() => {
	if (props.currentSearch) {
		console.log('we have some initial search', props.currentSearch)
		// requestFilters.value = JSON.parse(atob(props.filters))
	}
})

watch(search, debounce(newSearch => {
	console.log('debouncing works', newSearch)
	Invicta.emit('search-change', {query: newSearch, handle: props.handle})
}, 400))

// watch(search, debounce(newSearch => {
// 	Invicta.emit('search-change', {query: newSearch, handle: props.handle})

// }, 400))
</script>