<template>
	<FieldBase :form-id="formId" :field-props="props">
		<el-select
			v-model="fieldValue"
			v-bind="data.props"
			:value-key="data.props?.remote ? 'id' : null"
			:teleported="false"
			:remote-method="getOptions"
			:disabled="data.readOnly">
				<el-option
					v-for="(item, index) in options"
					:key="index"
					:value="item[valueField]"
					:label="item[labelField]"
				/>
		</el-select>
	</FieldBase>
</template>

<script setup>
import { ref, onMounted } from 'vue'	
import FieldBase from '@/components/form/FieldBase.vue'
import { useFormField } from '@/services/form/field'

const props = defineProps({
	formId: String,
	data: Object,
	path: String
})

const field = useFormField(props)
const fieldValue = field.value([])
const options = ref([])

const valueField = props.data.valueField || 'value'
const labelField = props.data.labelField || 'label' 

onMounted(() => {

	if (Array.isArray(props.data.options)) {
		options.value = props.data.options
	} else if (!props.data.props?.remote) {
		getOptions()
	}
})

function getOptions() {
	Invicta.axios.get(props.data.options)
	.then(({data}) => {
		options.value = data
	})
}
</script>