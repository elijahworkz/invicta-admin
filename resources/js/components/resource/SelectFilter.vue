<template>
	<el-select
		v-model="filterValue"
		clearable
		collapse-tags
		:filterable="remote"
		:remote="remote"
		:remote-method="remoteOptions"
		:value-key="remote ? 'id' : null"
		placeholder="Select"
		:teleported="false"
		@change="onChange">
		<el-option
			v-for="(option, index) in options"
			:key="index"
			:label="option.label"
			:value="option.value">
		</el-option>
	</el-select>
</template>

<script setup>
const props = defineProps({
	filterOptions: Array,
	handle: String,
	resourceHandle: String,
	initialValue: String | Object,
	remote: Boolean,
})

const emit = defineEmits(['selected'])

const filterValue = ref(props.initialValue)
const options = ref(props.filterOptions)

const remoteOptions = (query) => {
	let params = {
		handle: props.handle,
		search: query
	}
	Invicta.fetch.get(`api/fields/filter/options`, {params})
		.then(({data}) => {
			console.log('got results for options', data)
			options.value = data
		})
}

const onChange = () => {
	let filterObject = {}
	filterObject[props.handle] = filterValue.value
	console.log('this is my value', filterValue.value, filterObject)
	Invicta.emit('update-filters', { filter: filterObject, handle: props.resourceHandle })
	emit('selected')
}

Invicta.on('remove-filter', (handle) => {
	if (handle == props.handle) {
		filterValue.value = ''
		onChange()
	}
})

Invicta.on('clear-filters', () => {
	filterValue.value = ''
})
</script>
