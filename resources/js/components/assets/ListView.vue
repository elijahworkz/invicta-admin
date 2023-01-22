<template>
	<div>
		<div class="flex items-center justify-start p-3">
			<div class="mr-2">Total: <strong>{{ resource.meta.total }}</strong></div>
			<div class="ml-auto flex items-center">
				<div v-show="canDelete" class="ml-3" title="Delete Selected">
					<el-button :icon="Delete" @click="handleBulkDelete" :disabled="!selectedRows.length" />
				</div>
			</div>
		</div>

		<ResourceTable
			:key="resource.slug"
			resource-handle="assets"
			:data="resource.data"
			:table-props="resource.table"
			:columns="resource.columns"
			:can-edit="canEdit"
			:can-delete="canDelete"
			@select="handleSelect"
			@edit="$emit('edit', $event)"
			@delete="handleDelete" />
	</div>
</template>

<script setup>
import { Delete } from '@element-plus/icons-vue'

const props = defineProps({
	resource: Object,
	canEdit: Boolean,
	canDelete: Boolean,
})

/* Setup Selection */
const selectedRows = ref([])
const handleSelect = (selection) => {
	console.log('selection', selection)
	selectedRows.value = selection.map(row => row.id)
}

/* Handle Delete Actions */
const handleDelete = (selected) => {
	ElMessageBox.confirm(
		'This action will permanently delete records from database. Are you sure you want to continue?',
		'Deleting',
		{
			confirmButtonText: 'Delete',
			cancelButtonText: 'Cancel',
			confirmButtonClass: 'el-button--danger'
		}
	).then(() => {
		router.delete(props.resource.meta.path, {data: { selected }})
	})
	.catch(() => console.log('cancel'))
}

const handleBulkDelete = () => {
	if (selectedRows.value.length) {
		handleDelete(selectedRows.value)
	}
}
</script>