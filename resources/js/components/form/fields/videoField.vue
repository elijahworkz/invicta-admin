<template>
	<FieldBase :form-id="formId" :field-props="props">
		<el-input v-model="value" v-bind="data.props" :disabled="field.disabled" />
	</FieldBase>
</template>

<script setup>
import getVideoId from 'get-video-id'

const props = defineProps({
	formId: String,
	data: Object,
	path: String
})
const field = useFormField(props)
const value = field.value(null, extractVideoId)

function extractVideoId (url) {
	return getVideoId(url)['id']
}
</script>