<template>
	<el-table-column
		:prop="id"
		v-bind="props"
		:align="align(props)"
		:header-align="align(props, true)"
		:sortable="props.sortable ? 'custom' : false"
		:column-key="props.editLink ? 'no-select' : null">

		<template #default="scope">
			<i v-if="props.boolean" class="icon-status" :class="{ 'success' : scope.row[id] }"></i>
			<div v-else-if="props.list">
				{{ buildList(scope.row[id], props.titleField) }}
			</div>
			<div
				v-else-if="props.editLink && canEdit"
				@click.prevent="$emit('edit', scope.row.id)"
				class="edit-link"
				v-html="scope.row[id]">
			</div>
			<div v-else v-html="scope.row[id]"/>
		</template>

	</el-table-column>
</template>

<script setup>
defineProps({
	id: String,
	props: Object,
	canEdit: Boolean
})

const align = (props, header = false) => props.boolean ? 'center' : (header ? props.headerAlign : props.align)

function buildList(item, titleField) {
	if (Array.isArray(item)) {
		return item.map(i => i[titleField]).join(', ')
	}

	return (typeof item === 'object') ? item[titleField] : item
}
</script>