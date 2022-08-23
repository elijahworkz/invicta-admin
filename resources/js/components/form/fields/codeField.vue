<template>
	<FieldBase :form-id="formId" :field-props="props" :class="{'is-error': jsonError}">
		<codemirror
			v-model="stringValue"
			:style="{height: 'auto', width: '100%'}"
			:autofocus="true"
			:indent-with-tab="true"
			:tab-size="4"
			:extensions="extensions"
		/>
	</FieldBase>
</template>

<script setup>
import { ref, watch } from 'vue'
import FieldBase from '@/components/form/FieldBase.vue'
import { Codemirror } from 'vue-codemirror'
import { json } from '@codemirror/lang-json'
import { oneDark } from '@codemirror/theme-one-dark'
import { useFormField } from '@/services/form/field'
import { ElMessage } from 'element-plus'
import { debounce } from '@/utils/functions'

const props = defineProps({
	formId: String,
	data: Object,
	path: String
})
const field = useFormField(props)
const value = field.value()

const jsonError = ref(false)

const stringValue = ref(JSON.stringify(value.value, null, "\t"))

watch(stringValue, debounce(_code => {
	try { 
		value.value = JSON.parse(_code)
		jsonError.value = false
	} catch (error) {
		jsonError.value = true
		ElMessage.error('You have some errors in your JSON')
		console.log('error in json', error.message)
	}
}, 500))

const extensions = [json(), oneDark]
</script>

<style lang="scss">
.cm-editor {
	.is-error  & {
		border: 2px solid var(--el-color-danger)
	}
}
</style>