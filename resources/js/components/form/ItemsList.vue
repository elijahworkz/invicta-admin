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
	  
	<Drawer v-if="drawer.state" @close="drawer.state = false">
		<ItemsSelector
			v-if="drawer.context == 'list'"
			:exclude="excludeItems"
			:request-url="itemsUrl"
			:title-field="titleField"
			@update="updateItems" 
			@cancel="drawer.state = false" />

		<ItemsForm
			v-if="drawer.context == 'form'"
			:request-url="formUrl"
			@cancel="drawer.state = false" />
	</Drawer>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import draggable from 'vuedraggable'
import DragHandle from '@/components/shared/DragHandle.vue'
import RowActions from '@/components/shared/RowActions.vue'
import ItemListItem from './ItemListItem.vue'
import ItemsSelector from './ItemsSelector.vue'
import ItemsForm from './ItemsForm.vue'
import { Plus, Link } from '@element-plus/icons-vue'

const props = defineProps({
	list: {
		type: Array,
		default: [],
		required: true
	},
	itemsUrl: String,
	fieldData: Object,
	resource: String,
	sortable: Boolean,
	options: {
		type: Object,
		default: () => { 
			return {addItems: false, createItems: true, actions: ['edit', 'delete']}
		}
	}
})
const emit = defineEmits(['updated'])

const drawer = reactive({
	state: false,
	context: 'list'
})
const formUrl = ref('')

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
	drawer.state = false

	let updated = [...props.list, ...selected]
	emit('updated', updated)
}

/* Handle Drawer Actions */
const handleEditItem = (item) => {
	console.log('want to edit', item)
	drawer.context = 'form'
	drawer.state = true

	formUrl.value = `resource/${props.resource}/${item}`
}

const handleAddItem = () => {
	drawer.context = 'list'
	drawer.state = true
}

const handleCreateItem = () => {
	drawer.context = 'form'
	drawer.state = true

	formUrl.value = `resource/${props.resource}/create`
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