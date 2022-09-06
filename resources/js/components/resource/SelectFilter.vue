<template>
	<el-select
		v-model="filterValue"
		clearable
		collapse-tags
		:placeholder="placeholder"
		:teleported="false"
		@change="onChange">
		<el-option
			v-for="(option, value) in filterList"
			:key="value"
			:label="option"
			:value="value">
		</el-option>
	</el-select>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
	filterOptions: Array,
	handle: String,
	initialValue: String,
	placeholder: {
		type: String,
		default: 'Select'
	},
	valueKey: {
		type: String,
		default: 'value'
	},
	labelKey: {
		type: String,
		default: 'label'
	}
})

const emit = defineEmits(['selected'])

let filterValue = ref(props.initialValue)

const filterList = computed(() => {
	return props.filterOptions.reduce((obj, item) => {
		obj[item[props.valueKey]] = item[props.labelKey]
		return obj
	}, {})
})

const onChange = () => {
	let filterObject = {}
	filterObject[props.handle] = filterValue.value
	Invicta.emit('update-filters', filterObject)
	emit('selected')
}

Invicta.on('remove-filter', (handle) => {
	if (handle == props.handle) {
		filterValue.value = []
		onChange()
	}
})
</script>