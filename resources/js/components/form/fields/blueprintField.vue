<template>
	<FieldBase :form-id="formId" :field-props="props">
		<el-select
			v-model="value" 
			@change="changeBlueprint"
			:disabled="field.disabled">
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
import { useRouter } from 'vue-router'

const props = defineProps({
	formId: String,
	data: Object,
	path: String
})

const router = useRouter()
const field = useFormField(props)
const value = field.value()

const changeBlueprint = (value) => {
	let redirect = 'redirect' in props.data
		? props.data.redirect
		: true

	if (redirect) {
		const url = new URL(location.href);
		url.searchParams.set('blueprint', value);

		location.assign(url.search);
	}
}
</script>