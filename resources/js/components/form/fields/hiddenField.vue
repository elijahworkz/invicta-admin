<template>
	<input type="hidden" v-model="value" />
</template>

<script setup>
const props = defineProps({
	formId: String,
	data: Object,
	path: String
})
const field = useFormField(props)
const value = field.value()
</script>