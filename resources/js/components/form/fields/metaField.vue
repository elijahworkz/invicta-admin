<template>
	<FieldBase :form-id="formId" :field-props="props">
		<el-input v-model="fieldValue" type="textarea" v-bind="data.props" :disabled="data.readOnly" />
		<el-progress class="mt-2" :percentage="validation.percentage" :stroke-width="3" text-inside="true" :status="validation.status"/>
		<span class="info" v-if="validation.caption" v-html="validation.caption"/>
	</FieldBase>
</template>

<script setup>
import {watch, computed} from "vue";
import { useFormField } from '@/services/form/field'
import { useResourceForm } from '@/services/form'
import FieldBase from '@/components/form/FieldBase.vue'

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
	if(props.data.props && props.data.props.source) {
		return resourceForm.get(props.data.props.source)
	}
	return null
})

function updateValue(newVal) {
	if(resourceForm.mode == 'create') {
		let postfix = props.data.props && props.data.props.postfix ? props.data.props.postfix : ''
		fieldValue.value = newVal + postfix

		console.log(fieldValue.value);
	}
}

watch(source, (newVal) => {
	updateValue(newVal)
})

const validation = computed(() => {

	const length = fieldValue.value.length

	const result = {}

	result.percentage = Math.ceil(length * 100 / lengths.max)

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