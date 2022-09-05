<template>
	<el-table-column
		:prop="id"
		v-bind="props"
		:align="align(props)"
		:header-align="align(props, true)"
		:sortable="props.sortable ? 'custom' : false">

		<template #default="scope">
			<i v-if="props.boolean" class="icon-status" :class="{ 'success' : scope.row[id] }"></i>
			<div v-else-if="props.list">
				{{ buildList(scope.row[id], props.titleField) }}
			</div>
			<Link
				v-else-if="props.editLink && canEdit"
				:href="`${editUrl}/${scope.row.id}`"
				class="edit-link">
					<div v-html="scope.row[id]"/>
			</Link>
			<div v-else v-html="scope.row[id]"/>
		</template>

	</el-table-column>
</template>

<script setup>
defineProps({
	id: String,
	props: Object,
	editUrl: String,
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