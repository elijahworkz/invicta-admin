<template>
	<FieldBase :form-id="formId" :field-props="props">
		<el-select
			v-model="fieldValue"
			v-bind="data.props"
			:teleported="false"
			:disabled="data.readOnly">
				<el-option
					v-for="item in options"
					:key="item.value"
					:value="item.value"
					:label="item.label"
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

onMounted(() => {

	if (Array.isArray(props.data.options)) {
		options.value = props.data.options
	} else {

		Invicta.axios.get(props.data.options)
			.then(({data}) => {
				options.value = data
			})
	}
})
</script>