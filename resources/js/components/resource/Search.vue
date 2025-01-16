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
	currentSearch: {
		type: String,
		default: '',
	},
	searchStrings: {
		type: Object,
		default: () => ({ placeholder: 'Search', title: 'Type to search' })
	},
})

const emit = defineEmits(['update'])

const search = ref(props.currentSearch)

watch(search, debounce(newSearch => {
	console.log('debouncing works', newSearch)
	emit('update', newSearch)
}, 400))
</script>