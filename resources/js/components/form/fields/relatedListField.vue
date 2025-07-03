<template>
	<FieldBase :form-id="formId" :field-props="props" class="related-field">
		<ItemsList :list="listValue" :sortable="sortable" :editable="editable" :items-url="relatedUrl"
			:field-data="data" :resource="relationship" :item-id="resourceForm.settings.id"
			:options="data.options" @updated="updateRelated" />
	</FieldBase>
</template>

<script setup>
const props = defineProps({
	formId: String,
	data: Object,
	path: String
})

const resourceForm = useResourceForm(props.formId)

const relatedUrl = `/api/resource/${resourceForm.settings.handle}/relationship/${props.data.id}`
const relationship = props.path.split('.').pop() // determine relationship from the path
const sortable = props.path !== relationship // if path and relationsip don't match - probably needs sorting
const editable = Invicta.can(`edit ${relationship}`)

/* Build list to display */
const sortedIds = computed(() => resourceForm.get(props.path, false))

const listValue = computed(() => {
	let related = resourceForm.get(relationship, [])

	if (sortable && sortedIds.value.length) {
		return sortedIds.value.map(id => related.find(item => item.id === id))
	}
	return related
})

Invicta.on('resource-form-submitted', reloadRelated)

/* Update related value and possibly elsewhere */
function updateRelated(value) {
	if (sortable) {
		let ids = value.map(item => item.id)
		resourceForm.set(props.path, ids)
	}
	resourceForm.set(relationship, value)
}

/* We need to reload related list after form action (create or update) */
function reloadRelated() {
	console.log('we need to make a call here - where?', resourceForm.settings, props.data.id)
	if (!resourceForm.settings.id)
		return false
	let url = `/api/resource/${resourceForm.settings.handle}/${resourceForm.settings.id}/relationship/${props.data.id}`
	Invicta.fetch.get(url)
		.then((data) => {
			console.log('I got this new data here', data)
			updateRelated(data)
		})
}
</script>
