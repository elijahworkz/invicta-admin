<template>
	<FormField v-for="field in data.fields" :field-data="field" :data-path="fixedPath" />
</template>

<script setup>
import { computed } from 'vue'
import FormField from '@/components/form/FormField.vue'

const props = defineProps({
	data: Object,
	path: String
})

const { path } = props

const fixedPath = computed(() => {
	if (typeof path === 'undefined')
		return props.data.id

	let pathArray = path.split('.')
	pathArray.pop()

	return pathArray.join('.')
})
</script>