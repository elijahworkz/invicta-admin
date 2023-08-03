<template>
	<FieldBase :form-id="formId" :field-props="props">
			<el-input v-model="data.content" v-bind="data.props" :disabled="true">
				<template #append v-if="isSupported && data.content !== ''">
					<el-button :icon="DocumentCopy" @click="copy(data.content); success()" v-if="! copied" title="Click to copy to clipboard"/>
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

const { copy, copied, isSupported } = useClipboard()

function success() {
	Invicta.message({type:'success', title: 'Copied to clipboard!'})
}
</script>