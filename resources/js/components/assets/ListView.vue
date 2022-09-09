<template>
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
		:data="resource.data"
		:table-props="resource.table"
		:columns="resource.columns"
		:edit-url="resource.meta.path"
		:can-edit="canEdit"
		:can-delete="canDelete"
		@select="handleSelect"
		@delete="handleDelete" />
</template>

<script setup>
import { ref } from 'vue'
import { Delete } from '@element-plus/icons-vue'
import ResourceTable from '@/components/resource/ResourceTable.vue'

const props = defineProps({
	resource: Object,
	canEdit: Boolean,
	canDelete: Boolean
})

/* Setup Selection */
const selectedRows = ref([])
const handleSelect = (selection) => {
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
		Inertia.delete(props.resource.meta.path, {data: { selected }})
	})
	.catch(() => console.log('cancel'))
}

const handleBulkDelete = () => {
	if (selectedRows.value.length) {
		handleDelete(selectedRows.value)
	}
}
</script>