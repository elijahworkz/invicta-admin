<template>
	<FormField 
		v-for="field in data.fields" 
		:form-id="formId" 
		:field-data="field" 
		:data-path="fixedPath(field.id)" />
</template>

<script setup>
const props = defineProps({
	formId: String,
	data: Object,
	path: String
})

const { path } = props

const fixedPath = (id) => {
	if (typeof path === 'undefined')
		return id

	let pathArray = path.split('.')
	pathArray.pop()
	pathArray.push(id)

	return pathArray.join('.')
}
</script>