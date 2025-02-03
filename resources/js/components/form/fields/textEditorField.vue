<template>
    <FieldBase :form-id="formId" :field-props="props" class="text-editor">
        <SunEditor :id="fieldId" :initial-value="fieldValue" @updated="onUpdated" :disabled="field.disabled" />
        <!-- <EditorBase :initial-value="fieldValue" @updated="onUpdated" :disabled="field.disabled" /> -->
    </FieldBase>
</template>

<script setup>
const props = defineProps({
    formId: String,
    data: Object,
    path: String
})

const field = useFormField(props)
const fieldValue = field.value('')

const fieldId = Array.isArray(props.path) ? props.path.join('.') : props.path

const onUpdated = (value) => {
    fieldValue.value = value
}
</script>
