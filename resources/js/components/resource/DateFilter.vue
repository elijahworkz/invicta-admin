<template>
	<el-date-picker
		v-model="filterValue"
		:type="type"
		value-format="YYYY-MM-DD"
		@change="onChange"
		/>
</template>

<script setup>
const props = defineProps({
	handle: String,
	resourceHandle: String,
	type: String,
	initialValue: Array,
})

const emit = defineEmits(['selected'])

const filterValue = ref(props.initialValue)

const onChange = () => {
	let filterObject = {}
	filterObject[props.handle] = filterValue.value
	Invicta.emit('update-filters', { filter: filterObject, handle: props.resourceHandle })
	emit('selected')
}

Invicta.on('remove-filter', (handle) => {
	if (handle == props.handle) {
		filterValue.value = []
		onChange()
	}
})

Invicta.on('clear-filters', () => {
	filterValue.value = []
})
</script>