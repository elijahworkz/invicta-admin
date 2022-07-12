<template>

		<el-table :data="data" style="width: 100%" table-layout="auto">
			<el-table-column type="selection" fixed />
			<el-table-column
				v-for="(column, prop) in columns"
				:prop="prop"
				:label="column.label"
				:width="column.width"
				:min-width="column.minWidth"
				:align="column.align"
				:header-align="column.headerAlign"
				:sortable="column.sortable ? 'custom' : false"
				:resizable="column.resizable"
				:class-name="column.className"
				:label-class-name="column.labelClassName"
				:fixed="column.fixed">

				<template #default="scope"><div v-html="scope.row[prop]"></div></template>

			</el-table-column>
			<el-table-column fixed="right">Action buttons here</el-table-column>
		</el-table>
</template>

<script setup>

const props = defineProps({
	data: Array,
	columns: Object
})
</script>

<style lang="scss">

</style>