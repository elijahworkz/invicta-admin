<template>
	<div>
		<div class="flex items-center justify-start p-3">
			<div class="mr-2">Total: <strong>{{ assetsResource.data.total }}</strong></div>
			<div class="ml-auto flex items-center">
				<div v-show="settings.canDelete" class="ml-3" title="Delete Selected">
					<el-button :icon="Delete" @click="handleBulkDelete" :disabled="!selectedRows.length" />
				</div>
			</div>
		</div>

		<ResourceTable
			:key="settings.slug"
			resource-handle="assets"
			:data="assetsResource.data.resourceData"
			:columns="settings.columns"
			:can-edit="settings.canEdit"
			:can-delete="settings.canDelete"
			@select="handleSelect"
			@edit="handleEdit"
			@delete="handleDelete" />
	</div>
</template>

<script setup>
import { Delete } from '@element-plus/icons-vue'

const emit = defineEmits(['edit', 'select'])

const assetsResource = useResource('assets')
const settings = assetsResource.data.settings

/* Setup Selection */
const selectedRows = ref([])
const handleSelect = (selection) => {
	selectedRows.value = selection.map(row => row.id)
	emit('select', selectedRows.value)
}

const handleEdit = (item) => {
	console.log(' call to edit asset', item)
	emit('edit', item)
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
		Invicta.axios.delete(props.settings.resourceUrl, { data: { selected }})
			.then(({data}) => {
				Invicta.message(data.message)
				assetsResource.getResource()
			})
	})
	.catch((error) => {
		console.log('cancel', error)
	})
}

const handleBulkDelete = () => {
	if (selectedRows.value.length) {
		handleDelete(selectedRows.value)
	}
}
</script>