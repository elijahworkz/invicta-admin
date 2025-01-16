<template>
	<FieldBase :form-id="formId" :field-props="props">
		<el-input-number v-model="value" v-bind="data.props" :disabled="field.disabled" />
	</FieldBase>
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