<template>
	<FieldBase :form-id="formId" :field-props="props">
		<el-input v-model="fieldValue" type="textarea" v-bind="data.props" :disabled="field.disabled" />
		<el-progress class="mt-2" :percentage="validation.percentage" :stroke-width="3" :text-inside="true" :status="validation.status"/>
		<span class="info" v-if="validation.caption" v-html="validation.caption"/>
	</FieldBase>
</template>

<script setup>
const props = defineProps({
	formId: String,
	data: Object,
	path: String
})

const lengths = {
	normal: props.data.props && props.data.props.length_normal ? props.data.props.length_normal : 20,
	max: props.data.props && props.data.props.lengths_max ? props.data.props.lengths_max : 70,
}

const field = useFormField(props)
const fieldValue = field.value('')

const resourceForm = useResourceForm(props.formId)

const source = computed(() => {
	if (props.data.props && props.data.props.source) {
		return resourceForm.get(props.data.props.source)
	}
	return null
})

const postfix = computed(() => {
	const separator = props.data.props?.separator ? ` ${props.data.props.separator} ` : ' | '
	return props.data.props?.site_name ? separator + props.data.props.site_name : ''
})

function updateValue(newVal) {
	if (resourceForm.mode == 'create') {
		fieldValue.value = newVal + postfix.value
	}
}

onMounted(() => {
	if (resourceForm.mode == 'edit' && ! fieldValue.value) {
		fieldValue.value = source.value ? source.value + postfix.value : props.data.props?.site_name
	}
})

watch(source, (newVal) => {
	updateValue(newVal)
})

const validation = computed(() => {

	const length = fieldValue.value.length

	const result = {}

	result.percentage = Math.ceil(length * 100 / lengths.max)
	result.percentage = result.percentage > 100 ? 100 : result.percentage

	switch (true) {
		case length < lengths.normal:
			result.status = "warning"
			result.caption = `Your meta ${props.data.id} could be longer.`
			break;
		case length >= lengths.normal && length <= lengths.max:
			result.status = "success"
			result.caption = `Your meta ${props.data.id} is a good length.`
			break;
		case length > lengths.max:
			result.status = "exception"
			result.caption = `Your meta ${props.data.id} is too long, <strong>the ideal length is between ${lengths.normal} and ${lengths.max} characters.</strong>`
			break;
	}


	return result
})

</script>

<style lang="scss">
.el-progress {
	width: 100%;
}
</style>