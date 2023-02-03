<template>
	<FieldBase :form-id="formId" :field-props="props" :field-class="{'inline-label': data.inline}">
		<el-switch v-model="value" v-bind="data.props" />
	</FieldBase>
</template>

<script setup>
const props = defineProps({
	formId: String,
	data: Object,
	path: String
})
const field = useFormField(props)
const value = field.value(false)
</script>