<template>
	<FieldBase :form-id="formId" :field-props="props">
		<el-input v-model="fieldValue" v-bind="data.props" :disabled="field.disabled" />
	</FieldBase>
</template>

<script setup>
import slugify from 'speakingurl'

const props = defineProps({
	formId: String,
	data: Object,
	path: String
})
const field = useFormField(props)
const fieldValue = field.value()

const resourceForm = useResourceForm(props.formId)

const slugified = computed(() => slugify(resourceForm.get(props.data.source)))

watch(slugified, (value) => {

	if (resourceForm.isDirty.value) {
		fieldValue.value = value
	}
})
</script>