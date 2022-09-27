<template>
	<FieldBase :form-id="formId" :field-props="props">
		<el-select
			v-model="fieldValue"
			filterable
			:placeholder="data.props?.placeholder"
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
import { useFormField } from '@/services/form/field'
import FieldBase from '@/components/form/FieldBase.vue'

const props = defineProps({
	formId: String,
	data: Object,
	path: String
})

const field = useFormField(props)
const fieldValue = field.value([])
const options = ref([])

onMounted(() => {
	Invicta.axios.get("/fields/resource-link/options")
		.then(({data}) => {
			options.value = data
		})
})

</script>