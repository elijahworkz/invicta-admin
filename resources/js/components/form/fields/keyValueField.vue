<template>
	<FieldBase :form-id="formId" :field-props="props">
		<table class="keyValue-table">
			<thead>
				<tr>
					<th>{{ data.keyLabel || 'Key' }}</th>
					<th colspan="2">{{ data.valueLabel || 'Value' }}</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item, index) in editableValue">
					<td class="w-1/4">
						<input :name="`${data.id}-key-${index}`" v-model="item.key">
					</td>
					<td>
						<input :name="`${data.id}-value-${index}`" v-model="item.value">
					</td>
					<td class="action">
						<el-button text @click="removeRow(index)" :icon="Delete" />
					</td>
				</tr>
			</tbody>
		</table>
		<div class="mt-3">
			<el-button type="primary" @click="addRow">{{ data.addLabel || 'Add' }}</el-button>
		</div>
	</FieldBase>
</template>

<script setup>
import { Delete } from '@element-plus/icons-vue'

const props = defineProps({
	formId: String,
	data: Object,
	path: String
})

const field = useFormField(props)
const fieldValue = field.value({})

const editableValue = ref(prepareValue(fieldValue.value))

watch(
	() => editableValue.value,
	(newValue, oldValue) => {
		fieldValue.value = newValue.reduce((obj, item) => {
			obj[item.key] = item.value
			return obj
		}, {})
	},
	{ deep: true }
)

function prepareValue(value) {
	if (isString(value)) {
		value = JSON.parse(value)
	}
	return map(Object.entries(value), ([key, value]) => ({
		key: `${key}`,
		value
	}))
}

function addRow() {
	let newPair = {key: '', value: ''}
	editableValue.value.push(newPair)
}

function removeRow(index) {
	editableValue.value.splice(index, 1)
}
</script>

<style lang="scss">
.keyValue-table {
	width: 100%;
	border-collapse: separate;
	border: 1px solid var(--el-border-color);
	border-radius: 3px;
	border-spacing: 0;

	thead {
		background: var(--el-fill-color-light);

		th {
			border-bottom-width: 1px;
		}
	}

	tr {
		&:not(:last-child) {
			th, td {
				border-bottom-width: 1px;
			}
		}
	}
	th, td {
		text-align: start;
		padding: .25rem .5rem;
		vertical-align: middle;
		display: table-cell;
		
		&.action {
			text-align: right;
		}
	}

	input {
		outline: none;
	}
}
</style>