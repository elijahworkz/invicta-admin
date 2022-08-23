<template>
	<el-form-item :class="[...fieldClasses, $page.props.errors[id] ? 'is-error' : '']">
		<template #label>
			{{ field.label() }}
			<div class="info info-top opacity-60" v-if="info && infoPosition == 'top'">{{ info }}</div>
		</template>

		<slot />
		<div class="el-form-item__error" v-if="$page.props.errors[id]">{{ $page.props.errors[id] }}</div>
		<span class="info" v-if="info && infoPosition == 'bottom'">{{ info }}</span>
	</el-form-item>
</template>

<script setup>
import { useFormField } from '@/services/form/field'

const props = defineProps({
	formId: String,
	fieldProps: Object,
	fieldClass: Object | String
})

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