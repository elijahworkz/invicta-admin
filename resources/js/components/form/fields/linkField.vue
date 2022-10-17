<template>
	<FieldBase :form-id="formId" :field-props="props">
		<el-select
			v-model="fieldValue"
			filterable
			:placeholder="data.props?.placeholder"
			:disabled="field.disabled">
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