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
import { useFormField } from '@/services/form/field'
import filter from 'lodash/filter'

const props = defineProps({
	data: Object,
	path: String
})
const { data, path } = props
const field = useFormField(props)

// let's create default from the fields we got
const defaultRow = computed(() => {

	return getFields(data.fields)
	// return filter(data.fields, (o) => o.hasOwnProperty('id'))
	// return data.fields.reduce((obj, item) => {
	// 	if (item.fields) {

	// 	}
	// 	obj[item.id] = ''
	// 	return obj
	// }, {})
})

function getFields(fields) {

	return fields.reduce((obj, item) => {
		if (item.fields) {
			let nested = getFields(item.fields)
			return {...obj, ...nested}
		} else {
			obj[item.id] = ''
			return obj
		}
	},{})
}

let rows = field.value([defaultRow.value])

function getTitle(item, index) {
	return field.get(data.title, `${data.title} #${index}`)

	console.log(item, data.title, title, item[data.title])
	return title
	return Object.prototype.hasOwnProperty.call(item, data.title)
		? item[data.title]
		: `${data.title} #${index}`
}

const dataPath = (id, index) => `${path}.${index}.${id}`
</script>