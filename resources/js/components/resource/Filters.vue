<template>
	<popover v-if="resourceFilters.length">
		<template #trigger>
			<el-button class="filter-state">
				<el-icon><Filter /></el-icon><el-icon class="el-icon--right"><arrow-down /></el-icon>
			</el-button>
		</template>
		<template #default="scope">
			<div class="p-3">
				<template v-for="filter in resourceFilters">
					<h4 class="mb-1" :class="activeFilter(filter.class)">{{ filter.name }}</h4>
					<SelectFilter
						v-if="filter.type == 'select'"
						class="mb-4"
						:handle="filter.class"
						:remote="filter.remote"
						:filter-options="filter.options"
						:initial-value="filter.initialValue"
						@selected="scope.close()"
					/>

					<DateFilter
						v-if="filter.type == 'date' || filter.type == 'daterange'"
						:handle="filter.class"
						:type="filter.type"
						:initial-value="filter.initialValue == '' ? [] : filter.initialValue"
						@selected="scope.close()"
					/>
				</template>
			</div>
		</template>
	</popover>
	<el-icon v-else class="opacity-30 cursor-not-allowed"><Filter/></el-icon>
</template>

<script setup>
import { Filter, ArrowDown, Minus } from '@element-plus/icons-vue'

const props = defineProps({
	resourceHandle: String,
	filters: String
})

const resourceIndex = useResource(props.resourceHandle)

const requestFilters = ref(null)
const resourceFilters = ref([])

const filterState = computed(() => props.filters ? 'var(--el-color-primary)' : 'initial')
const activeFilter = (name) => name in resourceIndex.activeFilters ? 'active-filter' : ''

onMounted(() => {
	if (props.filters) {
		requestFilters.value = JSON.parse(atob(props.filters))
	}
})

watchEffect(() => {
	getFilters()
})

function getFilters() {
	Invicta.axios.get(`/resource/${props.resourceHandle}/filters`)
		.then(({data}) => {

			if (data.length) {
				resourceFilters.value = data.map(filter => {
					let initialValue = ''

					if (requestFilters.value) {
						initialValue = filterFn(requestFilters.value, (item, key) => {
							console.log(filter.class, key, item)
							return filter.class == key
						})[0]
						console.log(initialValue)
					}
					filter.initialValue = initialValue
					return filter
				})
			}
			resourceFilters.value = data
		})
}
</script>

<style>
.filter-state {
	color: v-bind(filterState) !important;
}
.active-filter {
	/* color:  var(--el-color-primary); */
	font-weight: 600;
}
</style>