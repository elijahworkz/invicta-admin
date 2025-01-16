<template>
	<FieldBase :form-id="formId" :field-props="props">
		<component :is="repeaterBase" 
			:list="listValue" 
			:item-name="itemName" 
			:item-title="getTitle" 
			:default-row="defaultRow"
			:disable-draggable="disableDraggable"
			:read-only="field.disabled"
			panel-class="group"
			@updated="updateValue">

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

// let rows = field.value([defaultRow.value])

/* Build list to display */
const listValue = computed(() => {
	return resourceForm.get(props.path, [defaultRow.value])
})

const itemName = field.get('itemName', 'row')

function getTitle(item, index) {
	let titleField = 'titleField' in data ? data.titleField : 'title'
	let pathArray = [path, index, titleField]
	return resourceForm.get(pathArray.join('.'), `${titleField} #${index}`)
}

const dataPath = (id, index) => `${path}.${index}.${id}`

/* Update value */
function updateValue(value) {
	let clone = [...toRaw(value)]
	resourceForm.set(props.path, clone)
}
</script>