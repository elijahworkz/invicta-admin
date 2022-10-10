<template>
	<FieldBase :form-id="formId" :field-props="props">
	<!-- <label class="el-form-item__label">{{ field.label() }}</label> -->
	<component :is="repeaterBase" 
		v-model="rows" 
		item-name="row" 
		:item-title="getTitle" 
		:default-row="defaultRow"
		:disable-draggable="disableDraggable"
		panel-class="group">

		<template v-slot:default="slotProps">
			<FormField 
				v-for="field in data.fields"
				:form-id="formId"
				:field-data="field" 
				:data-path="dataPath(field.id, slotProps.index)"/>

		</template>
	</component>
</FieldBase>
</template>

<script setup>
import InlineRepeater from '@/components/form/InlineRepeater.vue'
import CollapseRepeater from '@/components/form/CollapseRepeater.vue'

const props = defineProps({
	formId: String,
	data: Object,
	path: String
})
const { data, path } = props
const resourceForm = useResourceForm(props.formId)
const field = useFormField(props)

const repeaterBase = computed(() => {
	let inline = field.get('inline', false)
	return inline ? InlineRepeater : CollapseRepeater
})

const disableDraggable = !field.get('draggable', true)

// let's create default from the fields we got
const defaultRow = computed(() => getFields(data.fields))

let rows = field.value([defaultRow.value])

function getTitle(item, index) {
	return resourceForm.get(`${path}.${index}.${data.title}`, `${data.title} #${index}`)
}

const dataPath = (id, index) => `${path}.${index}.${id}`
</script>