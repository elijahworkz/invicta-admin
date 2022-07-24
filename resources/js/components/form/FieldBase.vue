<template>
	<el-form-item>
		<template #label>{{ field.label() }}</template>
		<span class="info info-top" v-if="infoTop">{{ infoTop }}</span>

		<slot />

		<span class="info" v-if="infoBottom">{{ infoBottom }}</span>
	</el-form-item>
</template>

<script setup>
import { useFormField } from '@/services/form/field'

const props = defineProps({
	fieldProps: Object
})

const { id } = props.fieldProps.data
const field = useFormField(props.fieldProps)

// const value = field.value()
const infoTop = field.has('info') && field.check('info_position', 'top') ? field.get('info') : false
const infoBottom = field.has('info') && field.check('info_position', 'bottom') ? field.get('info') : false
</script>