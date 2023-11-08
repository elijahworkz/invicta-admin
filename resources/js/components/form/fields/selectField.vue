<template>
	<FieldBase :form-id="formId" :field-props="props">
		<el-select
			v-model="fieldValue"
			v-bind="data.props"
			:value-key="data.valueKey || null"
			:teleported="false"
			:remote-method="getOptions"
			:disabled="field.disabled">
				<el-option
					v-if="optionsReady"
					v-for="(item, index) in options"
					:key="index"
					:value="item[valueField]"
					:label="item[labelField]"
				/>
		</el-select>
	</FieldBase>
</template>

<script setup>
const props = defineProps({
	formId: String,
	data: Object,
	path: String
})
const optionsReady = ref(false)

const resourceForm = useResourceForm(props.formId)
const field = useFormField(props)
const fieldValue = field.value()
const options = ref([])

const valueField = props.data.valueField || 'value'
const labelField = props.data.labelField || 'label'

if (Array.isArray(props.data.options)) {
	options.value = props.data.options
	optionsReady.value = true
} else if (!props.data.props?.remote) {
	
	options.value = resourceForm.remoteData.get(props.data.options)

	if (Array.isArray(options.value)) {
		optionsReady.value = true
	} else {	
		Invicta.on(props.data.options, () => {
			options.value = resourceForm.remoteData.get(props.data.options)
			optionsReady.value = true
		})
	}
}


function getOptions() {
	Invicta.axios.get(props.data.options)
	.then(({data}) => {
		options.value = data
		optionsReady.value = true
	})
}
</script>