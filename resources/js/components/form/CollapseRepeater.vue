<template>
	<div class="repeater-field">
		<el-collapse accordion>
			<draggable
				v-model="modelValue" 
				handle=".handle" 
				item-key="index"
				:disabled="disableDraggable"
				@update="() => $emit('update:modelValue', modelValue)">
				<template #item="{element, index}">
					<el-collapse-item :name="index">
						<template #title>
							<DragHandle v-if="!disableDraggable" class="handle cursor-grab" />
							<span class="ml-2">{{ itemTitle(element, index) }}</span>
							<div class="delete-row-button ml-auto mr-4">
								<el-button text :icon="Delete" @click="removeRow(index)"></el-button>
							</div>
						</template>
						<div class="fieldset py-3" :class="panelClass">
							<div class="field-row-full text-right">
								<el-button type="danger" text size="small" :icon="Close" @click="removeRow(index)">Remove {{ itemName }}</el-button>
							</div>
							<slot :item="element" :index="index"></slot>
						</div>
					</el-collapse-item>
				</template>
			</draggable>
		</el-collapse>
		<div class="mt-3">
			<el-button type="primary" @click="addRow">Add {{ itemName }}</el-button>
		</div>
	</div>
</template>

<script setup>
import clone from 'lodash/clone'
import draggable from 'vuedraggable'
import DragHandle from '@/components/shared/DragHandle.vue'
import { Close, Delete } from '@element-plus/icons-vue'

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
	itemName: {
		type: String,
		default: 'row'
	},
	itemTitle: {
		type: Function,
		default(item, index) {
			return 'Empty'
		}
	},
	panelClass: {
		type: String,
		default: ''
	},
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

<style lang="scss">
.el-collapse-item__header {
	.el-button {
		visibility: hidden;
	}

	&:hover {
		.el-button {
			visibility: visible;
		}
	}
	.el-collapse-item__arrow {
		margin: 0 8px 0 0;
	}
}
</style>