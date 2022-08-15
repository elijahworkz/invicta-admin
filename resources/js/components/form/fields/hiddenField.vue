<template>
	<el-input type="hidden" v-model="value" />
</template>

<script setup>
import { useFormField } from '@/services/form/field'

const props = defineProps({
	formId: String,
	data: Object,
	path: String
})
const field = useFormField(props)
const value = field.value()
</script>