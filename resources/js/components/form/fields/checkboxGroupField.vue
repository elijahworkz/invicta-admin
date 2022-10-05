<template>
	<FieldBase :form-id="formId" :field-props="props" class="checkbox-group" :class="{'stacked': data.stacked}">
		<el-checkbox v-for="(item, index) in value" v-model="value[index]" :label="options[index]" />
	</FieldBase>
</template>

<script setup>
const props = defineProps({
	formId: String,
	data: Object,
	path: String
})
const field = useFormField(props)
const value = field.value()

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

<style lang="scss">
.checkbox-group {
	&.stacked {
		.el-checkbox {
			width: 100%;
		}
	}
}
</style>

