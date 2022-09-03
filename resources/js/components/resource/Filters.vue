<template>
<!-- 	<popover
		v-if="filters.length"
		ref="filtersDropdown">
		<template #trigger>
			<el-button :type="filterButtonType">
				<el-icon><Filter /></el-icon><el-icon class="el-icon--right"><arrow-down /></el-icon>
			</el-button>
		</template>
		<template #default>
			<div class="p-2">
				<template v-for="filter in filters">
					<h4 class="mb-1">{{ filter.name }}</h4>
					<SelectFilter
						class="mb-4"
						:handle="filter.class"
						:filter-options="filter.options"
						:initial-value="filter.initialValue"
					/>
				</template>
			</div>	
		</template>
	</popover> -->
	<el-popover
		ref="filtersDropdown"
		v-if="filters.length"
		placement="bottom-end" 
		:width="200" 
		trigger="click" 
		:teleported="false">
		<template #reference>
        	<el-button :type="filterButtonType">
				<el-icon><Filter /></el-icon><el-icon class="el-icon--right"><arrow-down /></el-icon>
			</el-button>
		</template>
		<template #default>
			<template v-for="filter in filters">
				<h4 class="mb-1">{{ filter.name }}</h4>
				<SelectFilter
					class="mb-4"
					:handle="filter.class"
					:filter-options="filter.options"
					:initial-value="filter.initialValue"
				/>
			</template>
		</template>
    </el-popover>
</template>

<script setup>
import { ref, unref, computed, onMounted } from 'vue'
import Popover from '@/components/shared/Popover.vue'
import SelectFilter from './SelectFilter.vue'
import { Filter, ArrowDown } from '@element-plus/icons-vue'
import filterFn from 'lodash/filter'

const props = defineProps({
	resourceHandle: String,
	filters: String
})

const filtersDropdown = ref()
const filters = ref([])
const requestFilters = ref(null)
const filterButtonType = computed(() => {

	return props.filters ? 'primary' : 'default'
})

onMounted(() => {
	
	if (props.filters) {
		requestFilters.value = JSON.parse(atob(props.filters))
		console.log(requestFilters)
	}

	Invicta.axios.get(`/resource/${props.resourceHandle}/filters`)
		.then(({data}) => {

			if (data.length) {
				filters.value = data.map(filter => {
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
			filters.value = data
		})
})

Invicta.on('update-filters', () => {
	unref(filtersDropdown).hide()
})
</script>