<template>
	<FieldBase :form-id="formId" :field-props="props" class="related-field">
		<ItemsList
			:list="listValue"
			:sortable="sortable"
			:items-url="relatedUrl"
			:field-data="data"
			:resource="relationship"
			:item-id="resourceForm.id"
			:options="data.options"
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

const relatedUrl = `/resource/${resourceForm.meta.handle}/relationship/${props.data.id}`
const relationship = props.path.split('.').pop() // determine relationship from the path
const sortable = props.path !== relationship // if path and relationsip don't match - probably needs sorting

/* Build list to display */
const sortedIds = computed(() => resourceForm.get(props.path, false))

const listValue = computed(() => {
	let related = resourceForm.get(relationship, [])
	
	if (sortable && sortedIds.value.length) {
		return sortedIds.value.map(id => related.find(item => item.id === id))
	}
	return related
})

/* Update related value and possibly elsewhere */
function updateRelated(value) {
	if (sortable) {
		let ids = value.map(item => item.id)
		resourceForm.set(props.path, ids)
	}
	resourceForm.set(relationship, value)
}

</script>