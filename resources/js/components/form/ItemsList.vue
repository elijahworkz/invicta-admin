<template>
	<draggable 
		:list="list"
		:disabled="!sortable"
		handle=".drag-handle" 
		item-key="index"
		class="items-stack"
		@update="$emit('updated', list)">
		<template #item="{element, index}">
			<div class="flex items-center justify-start mb-2 border rounded-sm has-actions">
				<DragHandle v-if="sortable" class="text-gray-300 hover:text-gray-400"/>
				<component :is="ItemListComponent" :item="element" :title-field="titleField" />
				<RowActions :id="index" @delete="removeRow" class="ml-auto" />
			</div>
		</template>
		<template #footer>
			<div class="flex mt-4">
	   	 		<el-button type="primary" text bg size="small" :icon="Link" @click="drawer = true">Add</el-button>
	   	 	</div>
  		</template>
	</draggable>
	  
	<Drawer v-if="drawer" @close="drawer = false">
		<ItemsSelector 
			:exclude="excludeItems"
			:request-url="itemsUrl"
			:title-field="titleField"
			@update="updateItems" 
			@cancel="drawer = false" />
	</Drawer>
</template>

<script setup>
import { ref, computed } from 'vue'
import draggable from 'vuedraggable'
import DragHandle from '@/components/shared/DragHandle.vue'
import RowActions from '@/components/shared/RowActions.vue'
import ItemListItem from './ItemListItem.vue'
import ItemsSelector from './ItemsSelector.vue'
import { Link } from '@element-plus/icons-vue'

const props = defineProps({
	list: {
		type: Array,
		default: [],
		required: true
	},
	itemsUrl: String,
	fieldData: Object,
	sortable: Boolean
})
const emit = defineEmits(['updated'])

const drawer = ref(false)
const { titleField } = props.fieldData
const ItemListComponent = computed(() => {

	if (props.fieldData.itemComponent && Invicta.componentExists(props.fieldData.itemComponent)) {
		return props.fieldData.itemComponent
	}
	return ItemListItem
})

const excludeItems = computed(() => {
	return props.list.map(item => {
		return item.id
	})
})

function removeRow({id}) {
	props.list.splice(id, 1)
	emit('updated', props.list)
}


const updateItems = (selected) => {
	drawer.value = false
	let updated = props.list
		? [...props.list, ...selected]
		: selected
	emit('updated', updated)
}
</script>

<style lang="scss">
[draggable=true] {
	border-color: var(--el-color-primary-light-7);
	color: var(--el-color-primary-light-3);
}
.has-actions {
	position: relative;
	padding: 5px 12px 5px 6px;
	line-height: 1.5;
}
</style>