<template>
	<el-popover placement="bottom-end" :width="200" trigger="click" v-if="filters.length">
		<template #reference>
        	<el-button type="primary">
				<el-icon><Filter /></el-icon><el-icon class="el-icon--right"><arrow-down /></el-icon>
			</el-button>
		</template>
		<template #default>
			<template v-for="filter in filters">
				<h4>{{ filter.name }}</h4>
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
import { ref, onMounted } from 'vue'
import { usePage } from '@inertiajs/inertia-vue3'
import filterFn from 'lodash/filter'
import { Filter, ArrowDown } from '@element-plus/icons-vue'
import SelectFilter from './SelectFilter.vue'

const { resource } = usePage().props.value
const filters = ref([])
const requestFilters = ref(null)

onMounted(() => {
	
	if (Object.prototype.hasOwnProperty.call(resource.meta, 'filters')) {
		requestFilters.value = JSON.parse(atob(resource.meta.filters))
		console.log(requestFilters)
	}

	Invicta.axios.get(`/resource/${resource.slug}/filters`)
		.then(({data}) => {

			if (data.length) {
				filters.value = data.map(filter => {
					let initialValue = []

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
</script>