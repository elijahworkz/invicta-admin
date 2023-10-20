<template>
	<popover>
		<template #trigger>
			<el-button class="filter-state">
				<el-icon><Filter /></el-icon><el-icon class="el-icon--right"><arrow-down /></el-icon>
			</el-button>
		</template>
		<template #default="scope">
			<div class="p-3">
				<template v-for="filter in filters">
					<h4 class="mb-1" :class="activeFilter(filter.class)">{{ filter.name }}</h4>
					<SelectFilter
						v-if="filter.type == 'select'"
						class="mb-4"
						:handle="filter.class"
						:resource-handle="resourceHandle"
						:remote="filter.remote"
						:filter-options="filter.options"
						:initial-value="filter.initialValue"
						@selected="scope.close()"
					/>

					<DateFilter
						v-if="filter.type == 'date' || filter.type == 'daterange'"
						:handle="filter.class"
						:resource-handle="resourceHandle"
						:type="filter.type"
						:initial-value="filter.initialValue == '' ? [] : filter.initialValue"
						@selected="scope.close()"
					/>
				</template>
			</div>
		</template>
	</popover>
</template>

<script setup>
import { Filter, ArrowDown, Minus } from '@element-plus/icons-vue'

const props = defineProps({
	resourceHandle: String,
	filters: Array,
	activeFilters: Object,
})

const filterState = computed(() => Object.keys(props.activeFilters).length ? 'var(--el-color-primary)' : 'initial')
const activeFilter = (name) => name in props.activeFilters ? 'active-filter' : ''
</script>

<style>
.filter-state {
	color: v-bind(filterState) !important;
}
.active-filter {
	font-weight: 600;
}
</style>