<template>
	<FieldBase :form-id="formId" :field-props="props">
		<el-input v-model="fieldValue" type="textarea" v-bind="data.props" :disabled="data.readOnly" />
		<el-progress class="mt-2" :percentage="validation.percentage" :stroke-width="3" text-inside="true" :status="validation.status"/>
		<span class="info" v-if="validation.caption" v-html="validation.caption"/>
	</FieldBase>
</template>

<script setup>
import FieldBase from '@/components/form/FieldBase.vue'
import { useFormField } from '@/services/form/field'
import { useResourceForm } from '@/services/form'
import {ref, watch, computed} from "vue";

const props = defineProps({
	formId: String,
	data: Object,
	path: String
})

const lengths = {
	normal: props.data.props && props.data.props.length_normal ? props.data.props.length_normal : 20,
	max: props.data.props && props.data.props.lengths_max ? props.data.props.lengths_max : 70,
}

const validation = ref({
	percentage: 0,
	status: "exception",
	caption: `Your meta ${props.data.id} could be longer.`
})

const field = useFormField(props)
const fieldValue = field.value()

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
	}
}

watch(source, (newVal) => {
	updateValue(newVal)
})

watch(fieldValue, (newVal) => {

	const length = newVal.length

	validation.value.percentage = Math.ceil(length * 100 / lengths.max)

	switch (true) {
		case length < lengths.normal:
			validation.value.status = "warning"
			validation.value.caption = `Your meta ${props.data.id} could be longer.`
			break;
		case length >= lengths.normal && length <= lengths.max:
			validation.value.status = "success"
			validation.value.caption = `Your meta ${props.data.id} is a good length.`
			break;
		case length > lengths.max:
			validation.value.status = "exception"
			validation.value.caption = `Your meta ${props.data.id} is too long, <strong>the ideal length is between ${lengths.normal} and ${lengths.max} characters.</strong>`
			break;
	}
})

</script>

<style lang="scss">
.el-progress {
	width: 100%;
}
</style>