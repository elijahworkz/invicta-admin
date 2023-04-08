<template>
	<div>
		<div class="flex items-center justify-start p-3">
			<div class="mr-2">Total: <strong>{{ assetsResource.total }}</strong></div>
			<div class="ml-auto flex items-center">
				<div v-show="settings.canDelete" class="ml-3" title="Delete Selected">
					<el-button :icon="Delete" @click="handleBulkDelete" :disabled="!selectedRows.length" />
				</div>
			</div>
		</div>

		<ResourceTable
			:key="settings.slug"
			resource-handle="assets"
			:data="assetsResource.resourceData"
			:columns="columns"
			:can-edit="settings.canEdit"
			:can-delete="settings.canDelete"
			@select="handleSelect"
			@edit="$emit('edit', $event)"
			@delete="handleDelete" />
	</div>
</template>

<script setup>
import { Delete } from '@element-plus/icons-vue'

const props = defineProps({
	settings: Object,
	columns: Object,
})

const emit = defineEmits('select')

const assetsResource = useResource(props.settings.handle)

/* Setup Selection */
const selectedRows = ref([])
const handleSelect = (selection) => {
	selectedRows.value = selection.map(row => row.id)
	emit('select', selection)
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
		// router.delete(props.resource.meta.path, {data: { selected }})
	})
	.catch(() => console.log('cancel'))
}

const handleBulkDelete = () => {
	if (selectedRows.value.length) {
		handleDelete(selectedRows.value)
	}
}
</script>