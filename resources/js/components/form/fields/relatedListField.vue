<template>
	<FieldBase :field-props="props" class="related-field">
		<ItemsList
			:list="listValue"
			:sortable="sortable"
			:items-url="relatedUrl" 
			:title-field="titleField"
			@updated="updateRelated"
		/>
	</FieldBase>
</template>

<script setup>
import { ref, computed } from 'vue'
import FieldBase from '@/components/form/FieldBase.vue'
import ItemsList from '@/components/form/ItemsList.vue'
import { useResourceForm } from '@/services/form'

const props = defineProps({
	data: Object,
	path: String
})

const loading = ref(false)

const relatedPath = props.path.split('.').pop()
const sortable = props.path !== relatedPath

const resourceForm = useResourceForm()

const sortedIds = resourceForm.get(props.path, false)

const listValue = computed(() => {
	let related = resourceForm.get(relatedPath, [])
	if (sortable && sortedIds) {
		let sortedList = sortedIds.map(id => related.find(item => item.id === id))
		related = sortedList
	}
	return related
})

const titleField = props.data.titleField
const relatedUrl = `/resource/${resourceForm.meta.slug}/relationship/${props.data.id}`

function updateRelated(value) {
	if (sortable) {
		let ids = value.map(item => item.id)
		resourceForm.set(props.path, ids)
	}
	resourceForm.set(relatedPath, value)
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