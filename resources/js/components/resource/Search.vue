<template>
	<el-input
		v-model="search" clearable
		:placeholder="searchStrings.placeholder"
		:title="searchStrings.title"
		:prefix-icon="Search">
	</el-input>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'

const props = defineProps({
	currentSearch: String,
	searchStrings: {
		type: Object,
		default: () => ({ placeholder: 'Search', title: 'Type to search' })
	},
})

const search = ref(props.currentSearch)

watch(search, debounce(newSearch => {
	console.log('debouncing works', newSearch)
	Invicta.emit('search-change', newSearch)

}, 400))
</script>