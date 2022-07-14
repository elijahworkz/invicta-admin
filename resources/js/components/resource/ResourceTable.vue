<template>
		<el-table
			:data="data"
			table-layout="auto"
			:flexible="true"
			@select="updateSelection"
			@select-all="updateSelection">
			<el-table-column type="selection" fixed />

			<template v-for="(column, key) in visibleColumns">
				<Column :id="key" :props="column"/>
			</template>
			<el-table-column
				width="100"
				align-header="right"
				align="right">

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
						<SvgIcon :icon="mdiSquareEditOutline" />
					</span>
					<span class="action-icon danger" title="Delete">
						<SvgIcon :icon="mdiTrashCanOutline" />
					</span>
				</div>

			</el-table-column>
		</el-table>
</template>

<script setup>
import { ref, computed } from 'vue'
import map from 'lodash/map'
import pickBy from 'lodash/pickBy'
import { SetUp } from '@element-plus/icons-vue'
import { mdiSquareEditOutline, mdiTrashCanOutline } from '@mdi/js'
import { checked } from '@/utils/functions'
import Column from './Column.vue'

const props = defineProps({
	data: Array,
	columns: Object
})

const selected = ref([])
const updateSelection = (selection, row = null) => {
	selected.value = selection
}


const columnTree = map(props.columns, (item, index) => {
	return { label: item.label, value: index, checked: true }
})
const treeModel = ref(columnTree)

const visibleColumns = computed(() => {
	let visible = checked(treeModel.value)

	return pickBy(props.columns, (column, index) => visible.includes(index))
})
</script>

<style lang="scss">
.action-icon {
	cursor: pointer;
	color: var(--el-table-header-text-color);
	opacity: .8;
	margin: 0 5px;
	display: inline-block;

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