<template>
	<div class="inline-repeater-field">
		<draggable
			v-model="modelValue" 
			handle=".handle" 
			item-key="index"
			:disabled="disableDraggable"
			@update="() => $emit('update:modelValue', modelValue)">
			<template #item="{element, index}">
				<div class="field-row flex items-center">
					<DragHandle v-if="!disableDraggable" class="handle cursor-grab opacity-50" />
					<slot :item="element" :index="index"></slot>
					<el-button type="danger" text :icon="Close" size="small" @click="removeRow(index)"></el-button>
				</div>
			</template>
		</draggable>
		<div class="mt-3">
			<el-button type="primary" @click="addRow">Add {{ itemName }}</el-button>
		</div>
	</div>
</template>

<script setup>
import clone from 'lodash/clone'
import draggable from 'vuedraggable'
import DragHandle from '@/components/shared/DragHandle.vue'
import { Close } from '@element-plus/icons-vue'

const props = defineProps({
	modelValue: {
		type: Array,
		default: [],
		required: true
	},
	default: {
		type: Object,
		default(rawProps) { 
			return {}
		}
	},
	itemName: String,
	itemTitle: Function,
	panelClass: String,
	disableDraggable: {
		type: Boolean,
		default: false
	}
})

const defaultRow = props.modelValue.length ? props.modelValue[0] : props.default

function addRow() {
	let row = clone(defaultRow)
	props.modelValue.push(row)
}

function removeRow(index) {
	props.modelValue.splice(index, 1)
}
</script>