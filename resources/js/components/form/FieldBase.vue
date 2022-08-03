<template>
	<el-form-item>
		<template #label>
			{{ field.label() }}
			<div class="info info-top opacity-60" v-if="info && infoPosition == 'top'">{{ info }}</div>
		</template>

		<slot />

		<span class="info" v-if="info && infoPosition == 'bottom'">{{ info }}</span>
	</el-form-item>
</template>

<script setup>
import { useFormField } from '@/services/form/field'

const props = defineProps({
	fieldProps: Object
})

const { id } = props.fieldProps.data
const field = useFormField(props.fieldProps)

const info = field.get('info', false)
const infoPosition = field.get('info_position', 'top')
</script>