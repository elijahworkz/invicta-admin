<template>
	<FieldBase :form-id="formId" :field-props="props">
		<el-input v-model="fieldValue" v-bind="data.props" :disabled="data.readOnly" />
	</FieldBase>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import FieldBase from '@/components/form/FieldBase.vue'
import { useResourceForm } from '@/services/form'
import { useFormField } from '@/services/form/field'
import slugify from 'speakingurl'

const props = defineProps({
	formId: String,
	data: Object,
	path: String
})
const field = useFormField(props)
const fieldValue = field.value()

const resourceForm = useResourceForm(props.formId)

const slugified = computed(() => slugify(resourceForm.get(props.data.source)))

watch(slugified, (value) => fieldValue.value = value)
</script>