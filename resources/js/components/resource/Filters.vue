<template>
	<popover>
		<template #trigger>
			<el-button class="filter-state">
				<SvgIcon :icon="mdiFilterOutline" :width="18" :height="18" />
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
import { mdiFilterOutline } from '@mdi/js'

const props = defineProps({
	resourceHandle: String,
	filters: Array,
	activeFilters: Object,
})

const filterState = computed(() => Object.keys(props.activeFilters).length ? 'var(--el-color-primary)' : 'var(--el-text-color-regular)')
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