<template>
	<el-table-column		
		:prop="id"
		v-bind="props"
		:align="align(props)"
		:header-align="align(props, true)"
		:sortable="props.sortable ? 'custom' : false">

		<template #default="scope">
			<i v-if="props.boolean" class="icon-status" :class="{ 'success' : scope.row[id] }"></i>
			<div v-else v-html="scope.row[id]"/>
		</template>

	</el-table-column>
</template>

<script setup>
defineProps({
	id: String,
	props: Object
})

const align = (props, header = false) => props.boolean ? 'center' : (header ? props.headerAlign : props.align)
</script>

<style lang="scss">
.icon-status {
	border-radius: 7px;
	display: inline-block;
	height: 7px;
	width: 7px;
	flex-shrink: 0;
	background: var(--color-light-back-darker); //#dde3e9;

	&.success {
		background: var(--el-color-success)
	}

}
</style>