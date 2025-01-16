<template>
	<el-form-item :class="[...fieldClasses, error ? 'is-error' : '']">
		<template #label>
			<div v-html="field.label()"/>
			<div class="info info-top opacity-60 leading-snug" v-if="info && infoPosition == 'top'">{{ info }}</div>
		</template>

		<slot />
		<div class="el-form-item__error" v-if="error">{{ error }}</div>
		<span class="info opacity-60 leading-snug mt-2" v-if="info && infoPosition == 'bottom'">{{ info }}</span>
	</el-form-item>
</template>

<script setup>
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

const error = computed(() => resourceForm.errors.value[id] ?? false)
</script>