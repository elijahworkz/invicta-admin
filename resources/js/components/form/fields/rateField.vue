<template>
	<FieldBase :form-id="formId" :field-props="props">
		<el-rate v-model="value" v-bind="data.props" :disabled="field.disabled" :colors="data.colors" />
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