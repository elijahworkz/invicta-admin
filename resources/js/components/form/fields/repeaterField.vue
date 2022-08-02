<template>
	<label class="el-form-item__label">{{ field.label() }}</label>
	<RepeaterBase 
		v-model="rows" 
		item-name="row" 
		:item-title="getTitle" 
		:default-row="defaultRow"
		panel-class="group">

		<template v-slot:default="slotProps">

			<FormField 
				v-for="field in data.fields" 
				:field-data="field" 
				:data-path="dataPath(field.id, slotProps.index)"/>

		</template>

	</RepeaterBase>
</template>

<script setup>
import { computed } from 'vue'
import RepeaterBase from '@/components/form/RepeaterBase.vue'
import FormField from '@/components/form/FormField.vue'
import { useResourceForm, getFields } from '@/services/form'
import { useFormField } from '@/services/form/field'
import get from 'lodash/get'

const props = defineProps({
	data: Object,
	path: String
})
const { data, path } = props
const resourceForm = useResourceForm()
const field = useFormField(props)

// let's create default from the fields we got
const defaultRow = computed(() => getFields(data.fields))

let rows = field.value([defaultRow.value])

function getTitle(item, index) {
	return resourceForm.get(`${path}.${index}.${data.title}`, `${data.title} #${index}`)
}

const dataPath = (id, index) => `${path}.${index}.${id}`
</script>