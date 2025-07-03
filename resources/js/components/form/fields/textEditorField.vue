<template>
    <FieldBase :form-id="formId" :field-props="props" class="text-editor">
        <QuillEditor :id="fieldId" v-model:content="value" />
    </FieldBase>
</template>

<script setup>
import QuillEditor from "../QuillEditor.vue";

const props = defineProps({
    formId: String,
    data: Object,
    path: String,
});
const field = useFormField(props);
const value = field.value();

const fieldId = Array.isArray(props.path) ? props.path.join(".") : props.path;
</script>
