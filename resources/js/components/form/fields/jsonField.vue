<template>
	<span class="el-form-item__label" v-if="!seamless">{{ label() }}</span>
	<span class="info info-top" v-if="!seamless && info">{{ info }}</span>
	<div :class="{'seamless': seamless}" class="group fieldset">
		<FormField 
			v-for="field in data.fields" 
			:form-id="formId" 
			:field-data="field" 
			:data-path="groupPath(field.id)" />
	</div>
</template>

<script setup>
const props = defineProps({
	formId: String,
	data: Object,
	path: String
})

const { data, path } = props
const { get, label } = useFormField(props)

const seamless = get('seamless', true)
const info = get('info', false)

const groupPath = (id) => `${path}.${id}`
</script>