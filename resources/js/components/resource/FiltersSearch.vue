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
import { ref, watch, computed } from 'vue'
import { useResource } from '@/services'
import { debounce } from '@/utils/functions'
import Filters from '@/components/resource/Filters.vue'
import { Search, Refresh } from '@element-plus/icons-vue'
import { isEmpty } from 'lodash'

const props = defineProps({
	currentSearch: String,
	searchStrings: {
		type: Object,
		default: () => ({ placeholder: 'Search', title: 'Type to search' })
	},
	handle: String,
	filters: String,
})

const resourceIndex = useResource()
const search = ref(props.currentSearch)
const canReset = computed(() => !isEmpty(resourceIndex.activeFilters) && search )

watch(search, debounce(newSearch => {
	// console.log('debouncing works', newSearch)
	Invicta.emit('search-change', newSearch)

}, 400))

const reset = () => {
	search.value = ''
	Invicta.emit('clear-filters', true)
}
</script>