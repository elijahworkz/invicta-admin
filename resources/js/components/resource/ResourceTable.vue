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
				header-align="right">

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
					<div class="flex items-center justify-end">
						<el-dropdown @command="handleAction">
							<el-button text size="small" circle :icon="MoreFilled" />
							<template #dropdown>
								<el-dropdown-menu>
									<el-dropdown-item :command="{action: 'edit', id: scope.row['id']}">Edit</el-dropdown-item>
									<el-dropdown-item :command="{action: 'edit', id: scope.row['id']}" divided>Delete</el-dropdown-item>
								</el-dropdown-menu>
							</template>
						</el-dropdown>
					</div>
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

const props = defineProps({
	data: Array,
	tableProps: Object,
	columns: Object,
})

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
}

// Handle Edit
const handleAction = ({ action, id }) => {

	if (action == 'edit') {
		Inertia.visit(`/admin/resource/users/${id}`)
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