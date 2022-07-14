<template>
		<el-table
			:data="data"
			v-bind="tableProps"
			@select="updateSelection"
			@select-all="updateSelection"
			@sort-change="handleSortChange">
			<el-table-column type="selection" fixed />

			<template v-for="(column, key) in visibleColumns">
				<Column :id="key" :props="column"/>
			</template>
			<el-table-column
				width="100"
				header-align="right">

				<template #header >
					<div v-if="selected.length" class="text-right" title="Delete Selected">
						<SvgIcon :icon="mdiTrashCanOutline" class="action-icon delete"/>
					</div>
					<el-dropdown trigger="click" class="!align-middle">
						<el-icon class="action-icon"><SetUp /></el-icon>
					    <template #dropdown>
					    	<div class="p-2">
						    	<CheckTree :initial-items="treeModel" :disabled="false" :depth="1" />
						    </div>
					    </template>
					</el-dropdown>
				</template>

				<div class="flex items-center justify-end">
					<span class="action-icon" title="Edit">
						<!-- <el-icon><Edit /></el-icon> -->
						<el-icon><EditPen /></el-icon>
						<!-- <SvgIcon :icon="mdiSquareEditOutline" :width="20" :height="20" /> -->
					</span>
					<span class="action-icon danger" title="Delete">
						<el-icon><Delete /></el-icon>
						<!-- <SvgIcon :icon="mdiTrashCanOutline" :width="20" :height="20" /> -->
					</span>
				</div>

			</el-table-column>
		</el-table>
</template>

<script setup>
import { ref, computed } from 'vue'
import map from 'lodash/map'
import pickBy from 'lodash/pickBy'
import { SetUp, Edit, EditPen, Delete } from '@element-plus/icons-vue'
import { mdiSquareEditOutline, mdiTrashCanOutline } from '@mdi/js'
import { checked } from '@/utils/functions'
import Column from './Column.vue'

const props = defineProps({
	data: Array,
	tableProps: Object,
	columns: Object,
})

const selected = ref([])
const updateSelection = (selection, row = null) => {
	selected.value = selection
}

// Handle column setup and visibility
const columnTree = map(props.columns, (item, index) => {
	return { label: item.label, value: index, checked: true }
})
const treeModel = ref(columnTree)

const visibleColumns = computed(() => {
	let visible = checked(treeModel.value)

	return pickBy(props.columns, (column, index) => visible.includes(index))
})

// Handle sorting
const handleSortChange = ({ prop, order }) => {
	Invicta.emit('sort-change', { prop, order })
	console.log('Sorting changed on ', prop, order)
}
</script>

<style lang="scss">
$action-icon-size: 18px;
.el-icon {
	width: $action-icon-size;
	height: $action-icon-size;

	svg {
		width: $action-icon-size;
		height: $action-icon-size;
	}
}
.action-icon {
	cursor: pointer;
	color: var(--el-table-header-text-color);
	// opacity: .8;
	margin: 0 5px;
	display: inline-block;
	line-height: 0;

	thead & {
		opacity: 1;
	}

	&:hover {
		opacity: 1;
		color: var(--el-color-primary);

		&.danger {
			color: var(--el-color-danger);
		}
	}

	&.delete {
		color: var(--el-color-danger);
	}

}
</style>