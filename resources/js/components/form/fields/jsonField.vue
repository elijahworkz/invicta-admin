<template>
	<label class="el-form-item__label" v-if="!seamless">{{ label() }}</label>
	<span class="info info-top" v-if="!seamless && info">{{ info }}</span>
	<div :class="{'seamless': seamless}" class="group fieldset">
		<FormField v-for="field in data.fields" :field-data="field" :data-path="groupPath(field.id)" />
	</div>
</template>

<script setup>
import FormField from '@/components/form/FormField.vue'
import { useFormField } from '@/services/form/field'

const props = defineProps({
	data: Object,
	path: String
})

const { data, path } = props
const { get, label } = useFormField(props)

const seamless = get('seamless', true)
const info = get('info', false)

const groupPath = (id) => `${path}.${id}`
</script>