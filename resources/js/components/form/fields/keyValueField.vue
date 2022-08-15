<template>
	<draggable 
		:list="list"
		:disabled="!sortable"
		handle=".drag-handle" 
		item-key="index"
		class="items-stack w-full"
		@update="$emit('updated', list)">
		<template #item="{element, index}">
			<div class="flex items-center justify-start mb-2 border rounded-sm has-actions">
				<DragHandle v-if="sortable" class="text-gray-300 hover:text-gray-400"/>

				<component 
					:is="ItemListComponent" 
					:item="element" 
					:title-field="titleField"
					@edit="handleEditItem" />

				<RowActions 
					v-if="options.actions.length"
					:actions="options.actions"
					:id="element.id"
					@edit="handleEditItem"
					@delete="removeRow" 
					class="ml-auto" />
			</div>
		</template>
		<template #footer>
			<div class="flex mt-4">
	   	 		<el-button v-if="options.createItems" type="primary" text bg size="small" :icon="Plus" @click="handleCreateItem">Create new</el-button>
	   	 		<el-button v-if="options.addItems" type="primary" text bg size="small" :icon="Link" @click="handleAddItem">Add existing</el-button>
	   	 	</div>
  		</template>
	</draggable>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import draggable from 'vuedraggable'
import DragHandle from '@/components/shared/DragHandle.vue'
import { useFormField } from '@/services/form/field'

const props = defineProps({
	formId: String,
	data: Object,
	path: String
})

const field = useFormField(props)
const disableDraggable = !field.get('draggable', true)

function addRow() {
	let row = {}
	props.list.push(row)
}

function removeRow({id}) {
	props.list.splice(id, 1)
	emit('updated', props.list)
}
</script>

<style lang="scss">
[draggable=true] {
	border-color: var(--el-color-primary-light-7);
	color: var(--el-color-primary-light-3);
}
</style>