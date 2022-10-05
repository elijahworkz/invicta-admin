<template>
	<FieldBase :form-id="formId" :field-props="props" class="related-field">
		<ItemsList
			:list="listValue"
			:sortable="true"
			:items-url="itemsUrl"
			:field-data="data"
			:resource="data.resource"
			:options="{ addItems: true, createItems: true, actions: ['edit', 'delete']}"
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

// const encodedModel = btoa(JSON.stringify(props.data.model))
const itemsUrl = `/resource/${props.data.resource}/items`

/* Build list to display */
const listValue = computed(() => {
	return resourceForm.get(props.path, [])
})


/* Update related value and possibly elsewhere */
function updateRelated(value) {
	resourceForm.set(props.path, value)
}

</script>