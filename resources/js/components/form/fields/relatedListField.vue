<template>
	<FieldBase :field-props="props" class="related-field">
		<ItemsList
			:list="listValue"
			:sortable="sortable"
			:items-url="relatedUrl"
			:field-data="data"
			@updated="updateRelated"
		/>
	</FieldBase>
</template>

<script setup>
import { ref, computed } from 'vue'
import FieldBase from '@/components/form/FieldBase.vue'
import ItemsList from '@/components/form/ItemsList.vue'
import { useResourceForm } from '@/services/form'

const resourceForm = useResourceForm()

const props = defineProps({
	data: Object,
	path: String
})

const loading = ref(false)
const relatedUrl = `/resource/${resourceForm.meta.slug}/relationship/${props.data.id}`
const relationship = props.path.split('.').pop() // determine relationship from the path
const sortable = props.path !== relationship // if path and relationsip don't match - probably needs sorting

/* Build list to display */
const sortedIds = resourceForm.get(props.path, false)

const listValue = computed(() => {
	let related = resourceForm.get(relationship, [])
	if (sortable && sortedIds) {
		let sortedList = sortedIds.map(id => related.find(item => item.id === id))
		related = sortedList
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

<style lang="scss">
.related-field {
	.el-select,
	.items-stack {
		width: 100%;
	}
}
</style>