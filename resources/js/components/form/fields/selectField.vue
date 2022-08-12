<template>
	<FieldBase :form-id="formId" :field-props="props">
		<el-select
			v-model="fieldValue"
			v-bind="data.props">
				<el-option
					v-for="item in data.options"
					:key="item.value"
					:value="item.value"
					:label="item.label"
				/>
		</el-select>
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
const fieldValue = field.value([])

</script>