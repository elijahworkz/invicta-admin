<template>
	<div class="resource-table">
		<el-table
			:data="data"
			v-bind="tableProps"
			@select="$emit('select', $event)"
			@select-all="$emit('select', $event)"
			@sort-change="handleSortChange"
			:key="tableKey">
			<el-table-column type="selection" fixed />

			<template v-for="(column, key) in visibleColumns">
				<Column :id="key" :props="column"/>
			</template>
			<el-table-column
				width="100"
				header-align="right" class="test2">

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
					<RowActions :id="scope.row.id" @action="handleAction"/>
				</template>

			</el-table-column>
		</el-table>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import map from 'lodash/map'
import pickBy from 'lodash/pickBy'
import { SetUp, MoreFilled } from '@element-plus/icons-vue'

import { checked } from '@/utils/functions'
import Column from './Column.vue'
import RowActions from '@/components/shared/RowActions.vue'

const props = defineProps({
	data: Array,
	tableProps: Object,
	columns: Object,
	editUrl: String
})

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
	Invicta.emit('sort-change', { prop, order })
}

// Handle Edit
const handleAction = ({ action, id }) => {

	if (action == 'edit') {
		Inertia.visit(`${props.editUrl}/${id}`)
	}
}
// Repaint table when sidebar is exposed
const tableKey = ref(0)
Invicta.on('close-sidebar-submenus', () => {
	if (!document.querySelector('body').classList.contains('sidebar-mini')) {
		console.log('I should repaint')
		tableKey.value = Date.now()
	}
})
</script>

<style lang="scss">

</style>