<template>
	<FieldBase :form-id="formId" :field-props="props">
		<el-input v-model="value" type="textarea" v-bind="data.props" />
	</FieldBase>
</template>

<script setup>
import FieldBase from '@/components/form/FieldBase.vue'
import { useFormField } from '@/services/form/field'

const props = defineProps({
	formId: String,
	data: Object,
	path: String
})
const field = useFormField(props)
const value = field.value()
</script>