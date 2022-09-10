<template>
	<FieldBase :form-id="formId" :field-props="props">
		<el-select
			v-model="value" @change="changeBlueprint">
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
import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-vue3'
import { useFormField } from '@/services/form/field'
import FieldBase from '@/components/form/FieldBase.vue'

const props = defineProps({
	formId: String,
	data: Object,
	path: String
})

const field = useFormField(props)
const value = field.value()

const changeBlueprint = (value) => {
	const { pageUrl } = usePage().props.value
	
	Inertia.get(pageUrl, { blueprint: value })
}
</script>