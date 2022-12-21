<template>
	<FieldBase :form-id="formId" :field-props="props">
		<el-date-picker v-model="value" v-bind="data.props" :disabled="field.disabled" />
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

<style lang="scss">
.el-date-editor {
	--el-date-editor-width: 100%;

	.el-input__wrapper {
		width: 100%;
	}
}
</style>