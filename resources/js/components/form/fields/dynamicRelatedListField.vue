<template>
	<FieldBase :form-id="formId" :field-props="props" class="related-field">
		<ItemsList
			:list="listValue"
			:sortable="false"
			:items-url="relatedUrl"
			:field-data="data"
			:resource="relationship"
			:item-id="itemId"
			:options="{ addItems: true, createItems: true}"
			@updated="updateRelated"
		/>
	</FieldBase>
</template>

<script setup>
const props = defineProps({
	formId: String,
	data: Object,
	path: String
})

const resourceForm = useResourceForm(props.formId)

const itemId = resourceForm.id
const relationship = props.data.id //resourceForm.get(props.data.id) // determine relationship
const relatedUrl = `/resource/${resourceForm.meta.handle}/relationship/${relationship}`

/* Build list to display */
const listValue = computed(() => resourceForm.get(relationship, []))
const titleField = 'titleField' in props.data 
	? props.data.titleField
	: 'title'

onMounted(() => {
	let params = {
		item: itemId,
		title: titleField
	}

	Invicta.axios.get(relatedUrl, { params })
		.then(({data}) => {
			let list = map(data, (item, key) => {
				return { id: parseInt(key), [titleField]: item}
			})
			resourceForm.set(relationship, list)
		})
})

/* Update related value and possibly elsewhere */
function updateRelated(value) {
	resourceForm.set(relationship, value)
}

</script>