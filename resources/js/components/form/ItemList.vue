<template>
	<draggable 
		v-model="modelValue" 
		handle=".drag-handle" 
		item-key="index">
		<template #item="{element, index}"
		@update="() => $emit('update:modelValue', modelValue)">
			<div class="flex items-center justify-start mb-2 border rounded-sm has-actions">
				<DragHandle class="text-gray-300 hover:text-gray-400"/>
				<div class="px-2">{{ element[titleField] }}
				{{ element }}</div>
				<RowActions :id="index" @action="removeRow" class="ml-auto" />
			</div>
		</template>
		<template #footer>
			<div class="flex mt-4">
	   	 		<el-button type="primary" text bg size="small" :icon="Link" @click="drawer = true">Add</el-button>
	   	 	</div>
  		</template>
	</draggable>
	  
	<Drawer v-if="drawer" @close="drawer = false">
		<ItemSelector :exclude="excludeItems" :request-url="itemsUrl" :title-field="titleField" @select="updateItems" />
	</Drawer>
</template>

<script setup>
import { ref, computed } from 'vue'
import draggable from 'vuedraggable'
import DragHandle from '@/components/shared/DragHandle.vue'
import RowActions from '@/components/shared/RowActions.vue'
import ItemSelector from './ItemSelector.vue'
import { Link } from '@element-plus/icons-vue'
import { intersectionBy } from '@/utils/functions'

const props = defineProps({
	modelValue: {
		type: Array,
		default: [],
		required: true
	},
	itemsUrl: String,
	titleField: String,
})
const emit = defineEmits(['update:modelValue', 'change'])

const drawer = ref(false)

function removeRow({id}) {
	props.modelValue.splice(id, 1)
}

const excludeItems = computed(() => {
	return props.modelValue.map(item => {
		return item.id
	})
})

const updateItems = (selected) => {
	drawer.value = false
	let updated = [...props.modelValue, ...selected]
	emit('update:modelValue', updated)
	emit('change', updated)
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