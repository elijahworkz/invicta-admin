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

onMounted(() => {
	Invicta.axios.get(relatedUrl, { params: { item: itemId } })
		.then(({data}) => {
			let list = map(data, (item, key) => {
				return { id: parseInt(key), title: item}
			})
			resourceForm.set(relationship, list)
		})
})

/* Update related value and possibly elsewhere */
function updateRelated(value) {
	resourceForm.set(relationship, value)
}

</script>