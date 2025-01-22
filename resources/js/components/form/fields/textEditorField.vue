<template>
	<FieldBase :form-id="formId" :field-props="props" class="text-editor">
        <EditorBase :initial-value="fieldValue" @updated="onUpdated" :disabled="field.disabled"/>
	</FieldBase>
</template>

<script setup>
const props = defineProps({
	formId: String,
	data: Object,
	path: String
})

const resourceForm = useResourceForm(props.formId)
const field = useFormField(props)
const fieldValue = field.value('')

const onUpdated = (value) => {
	fieldValue.value = value
}
</script>
