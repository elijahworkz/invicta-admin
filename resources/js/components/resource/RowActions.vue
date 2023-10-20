<template>
	<div class="actions flex items-center justify-end">
		<ActionsDropdown
			v-if="actions.length"
			:actions="actions" 
			:item="id" 
			@selected="handleAction" 
			class="ml-3" />

		<router-link v-if="hasDetail" :to="{name: 'resourceDetail', params: { id, handle: resourceHandle }}" class="action-icon"><View /></router-link>
		<router-link v-if="canEdit" :to="{name: 'resourceEdit', params: { id, handle: resourceHandle }}" class="action-icon"><Edit /></router-link>
		<span v-if="canDelete" class="action-icon" @click="$emit('delete', [id])" title="Delete Item"><Delete /></span>

	</div>
</template>

<script setup>
import { mdiDotsHorizontal } from '@mdi/js'
import { Delete, Edit, View } from '@element-plus/icons-vue'

const props = defineProps({
	id: Number,
	resourceHandle: String,
	actions: Array,
	hasDetail: Boolean,
	canEdit: Boolean,
	canDelete: Boolean,
})

const handleAction = (event) => {
	console.log('action call', event)
	Invicta.emit('action-called', { action: event.action, selected: [props.id] })
}
</script>

