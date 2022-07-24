<template>
	<FormField v-for="field in data.fields" :field-data="field" :data-path="fixedPath(field.id)" />
</template>

<script setup>
import { computed } from 'vue'
import FormField from '@/components/form/FormField.vue'

const props = defineProps({
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