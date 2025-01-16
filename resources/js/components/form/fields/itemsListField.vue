<template>
	<FieldBase :form-id="formId" :field-props="props" class="related-field">
		<ItemsList
			:list="listValue"
			:sortable="true"
			:items-url="itemsUrl"
			:field-data="data"
			:resource="data.resource"
			:options="options"
			:select="data.select"
			:where="data.where"
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

const itemsUrl = `/api/resource/${props.data.resource}/items`

const options = computed(() => {
	return 'actions' in props.data
		? props.data.actions
		: {
			addItems: true,
			createItems: true,
		}
})

/* Build list to display */
const listValue = computed(() => {
	return resourceForm.get(props.path, [])
})


/* Update related value and possibly elsewhere */
function updateRelated(value) {
	let clone = [...toRaw(value)]
	resourceForm.set(props.path, clone)
}

</script>