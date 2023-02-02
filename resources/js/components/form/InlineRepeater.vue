<template>
	<div class="inline-repeater-field">
		<draggable
			:list="list" 
			handle=".handle" 
			item-key="index"
			:disabled="disableDraggable"
			@update="$emit('updated', list)">
			<template #item="{element, index}">
				<div class="field-row flex items-center">
					<DragHandle v-if="!disableDraggable && !readOnly" class="handle cursor-grab opacity-50" />
					<slot :item="element" :index="index"></slot>
					<el-button v-if="!readOnly" text :icon="Delete" @click="removeRow(index)"></el-button>
				</div>
			</template>
		</draggable>
		<div class="mt-3" v-if="!readOnly">
			<el-button type="primary" @click="addRow">Add {{ itemName }}</el-button>
		</div>
	</div>
</template>

<script setup>
import draggable from 'vuedraggable'
import { Delete } from '@element-plus/icons-vue'

const props = defineProps({
	list: {
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
	},
	readOnly: {
		type: Boolean,
		default: false
	}
})

const emit = defineEmits(['updated'])
const defaultRow = props.list.length ? props.list[0] : props.default

function addRow() {
	let row = clone(defaultRow)
	let cloneList = toRaw(props.list)

	let updated = [...cloneList, row]
	emit('updated', updated)
}

function removeRow(index) {
	props.list.splice(index, 1)
}
</script>