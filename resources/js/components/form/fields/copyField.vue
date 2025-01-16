<template>
	<FieldBase :form-id="formId" :field-props="props">
			<el-input v-model="value" v-bind="data.props" :disabled="true">
				<template #append v-if="isSupported && value !== ''">
					<el-button :icon="DocumentCopy" @click="copy(value); success()" v-if="! copied" title="Click to copy to clipboard"/>
					<el-button :icon="Check" type="success" v-else @click="copied = false" />
				</template>
			</el-input>
	</FieldBase>
</template>

<script setup>
import { DocumentCopy, Check } from '@element-plus/icons-vue'

const props = defineProps({
	formId: String,
	data: Object,
	path: String
})
const field = useFormField(props)
const value = field.value(props.data.content)

const { copy, copied, isSupported } = useClipboard()

function success() {
	Invicta.message({type:'success', title: 'Copied to clipboard!'})
}
</script>