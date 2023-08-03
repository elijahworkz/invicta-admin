<template>
	<div class="mb-2">
		<div class="flex items-center" v-if="! loading">
			<FiltersSearch 
				v-if="resource && data.searchFilter" 
				:currentSearch="resource.meta.search" 
				:handle="tableResource.handle" 
				:filters="resource.meta.filters" />
			<strong class="ml-auto">Total: {{ tableResource.total }}</strong>
		</div>

		<div class="my-3" v-if="! loading">
			<FilterBadges :badges="tableResource.filterBadges" />
		</div>

		<div class="flex items-center justify-center h-full py-10" v-if="loading">
			<Loading />
		</div>

		<ResourceTable
			v-else-if="resource"
			:key="data.id"
			:resource-handle="tableResource.handle"
			:data="tableResource.resourceData"
			:table-props="resource.meta.table"
			:columns="resource.meta.columns"
			:columns-select="false"
			:can-edit="false"
			:can-delete="false"
			:has-detail="false"
			:no-select="true"/>

		<el-pagination
			v-if="resource && resource.meta.last_page > 1"
			background 
			small 
			layout="prev, pager, next, jumper"
			class="mt-2 justify-end"
			:current-page="tableResource.currentPage"
			:page-size="tableResource.perPage"
			:pager-count="5"
			:total="tableResource.total"
			@update:page-size="tableResource.pageSizeChange"
			@update:current-page="tableResource.pageChange"
		/>
	</div>
</template>

<script setup>
const props = defineProps({
	formId: String,
	data: Object,
	path: String
})

const loading = ref(false)
const resource = ref()
const tableResource = useResource(props.data.id)

onMounted(() => {
	loading.value = true

	Invicta.axios.get(props.data.resourceUrl)
		.then(({data}) => {
			tableResource.init(props.data.resourceUrl, data, true)
			resource.value = data
			loading.value = false
		})
})
</script>