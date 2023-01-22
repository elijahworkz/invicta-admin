<template>
	<div class="resource-table">
		<el-table
			ref="resourceTableRef"
			:data="data"
			v-bind="tableProps"
			:highlight-current-row="singleSelect"
			@selection-change="$emit('select', $event)"
			@current-change="$emit('single-select', $event)"
			@sort-change="handleSortChange"
			@row-click="handleRowClick"
			:key="tableKey"
			v-loading="loading">

			<el-table-column v-if="!singleSelect && !noSelect" type="selection" fixed />

			<template v-for="(column, key) in visibleColumns">
				<Column 
					:id="key"
					:props="column"
					:can-edit="canEdit"
					:has-detail="hasDetail"
					@show="$emit('show', $event)"
					@edit="$emit('edit', $event)"/>
			</template>

			<el-table-column
				v-if="!noActions"
				width="100"
				header-align="right"
				column-key="no-select"
				fixed="right">

				<template #header >
					<el-dropdown trigger="click" class="!align-middle">
						<el-icon class="action-icon"><SetUp /></el-icon>
					    <template #dropdown>
					    	<div class="p-2">
						    	<CheckTree :initial-items="treeModel" :disabled="false" :depth="1" />
						    </div>
					    </template>
					</el-dropdown>
				</template>

				<template #default="scope">
					<RowActions 
						:id="scope.row.id" 
						:actions="scope.row.actions || []" 
						:can-edit="canEdit" 
						:can-delete="canDelete"
						:has-detail="hasDetail"
						@show="$emit('show', $event)"
						@edit="$emit('edit', $event)" 
						@delete="$emit('delete', $event)" />
				</template>

			</el-table-column>
		</el-table>
	</div>
</template>

<script setup>
import { SetUp, MoreFilled } from '@element-plus/icons-vue'

const props = defineProps({
	resourceHandle: String,
	data: Array,
	tableProps: Object,
	columns: Object,
	canEdit: Boolean,
	canDelete: Boolean,
	hasDetail: Boolean,
	noActions: {
		type: Boolean,
		default: false,
	},
	singleSelect: {
		type: Boolean,
		default: false
	},
	noSelect: {
		type: Boolean,
		default: false
	}
})

console.log(props.canEdit);
console.log(props.canDelete);

const resourceTableRef = ref()

// Handle column setup and visibility
const columnTree = map(props.columns, (item, index) => {
	return { label: item.label, value: index, checked: item.hidden ? false : true }
})
const treeModel = ref(columnTree)

const visibleColumns = computed(() => {
	let visible = checked(treeModel.value)

	return pickBy(props.columns, (column, index) => visible.includes(index))
})

// Handle sorting
const handleSortChange = ({ prop, order }) => {
	console.log('before sort event', prop, order)
	Invicta.emit('sort-change', { prop, order, handle: props.resourceHandle })
}

// Handle Row click
const handleRowClick = (row, column, event) => {
	if (!column.columnKey && column.columnKey != 'no-select') {
		resourceTableRef.value.toggleRowSelection(row, undefined)
	}
}

// Repaint table when sidebar is exposed
const tableKey = ref(0)
Invicta.on('close-sidebar-submenus', () => {
	if (!document.querySelector('body').classList.contains('sidebar-mini')) {
		tableKey.value = Date.now()
	}
})

// Set loading state
const loading = ref(false)
router.on('start', () => {
	loading.value = true
})

router.on('finish', () => {
	loading.value = false
	// loading.close()
})
</script>