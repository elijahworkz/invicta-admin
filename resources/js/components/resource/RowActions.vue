<template>
	<div class="actions flex items-center justify-end">
		<ActionsDropdown 
			:actions="actions" 
			:item="id" 
			@selected="handleAction" 
			class="ml-3" />

		<span v-show="canEdit" class="action-icon" @click="$emit('edit', id)" title="Edit Item"><Edit /></span>
		<span v-show="canDelete" class="action-icon" @click="$emit('delete', [id])" title="Delete Item"><Delete /></span>

	</div>
</template>

<script setup>
import { ref, unref } from 'vue'
import { mdiDotsHorizontal } from '@mdi/js'
import { Delete, Edit } from '@element-plus/icons-vue'
import ActionsDropdown from '@/components/shared/ActionsDropdown.vue'

const props = defineProps({
	id: Number,
	actions: Array,
	canEdit: Boolean,
	canDelete: Boolean,
})

const handleAction = (event) => {
	console.log('action call', event)
	Invicta.emit('action-called', { action: event.action, selected: [props.id] })
}
</script>

