<template>
	<el-form-item :class="[...fieldClasses, resourceForm.errors[id] ? 'is-error' : '']">
		<template #label>
			<div v-html="field.label(fieldProps.data.readOnly)"/>
			<div class="info info-top opacity-60" v-if="info && infoPosition == 'top'">{{ info }}</div>
		</template>

		<slot />
		<div class="el-form-item__error" v-if="resourceForm.errors[id]">{{ resourceForm.errors[id] }}</div>
		<span class="info" v-if="info && infoPosition == 'bottom'">{{ info }}</span>
	</el-form-item>
</template>

<script setup>
import { useResourceForm } from '@/services/form'
import { useFormField } from '@/services/form/field'

const props = defineProps({
	formId: String,
	fieldProps: Object,
	fieldClass: Object | String
})

const resourceForm = useResourceForm(props.formId)

const { id } = props.fieldProps.data
const field = useFormField(props.fieldProps, props.formId)

const required = field.get('validation', '').includes('required')
const fieldClasses = [
	required ? 'is-required' : '',
	props.fieldClass
]

const info = field.get('info', false)
const infoPosition = field.get('info_position', 'top')

</script>