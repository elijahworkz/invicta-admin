<template>
	<div>
		Some info should be here like total, search if enabled, filters and filter badges
		<FiltersSearch 
			v-if="resource" 
			:currentSearch="resource.meta.search" 
			:handle="resource.handle" 
			:filters="resource.meta.filters" />
		<div class="bg-white px-2 pt-2"><FilterBadges :badges="tableResource.filterBadges" /></div>
	</div>

	<div class="flex items-center justify-center h-full" v-if="loading">
		<Loading />
	</div>

	<ResourceTable
		v-else
		:key="data.id"
		:data="tableResource.resource"
		:columns="tableResource.columns"
		:can-edit="false"
		:can-delete="false"
		:has-detail="false"
		:no-select="true" />

			<div class="pagination px-2">
				<el-pagination 
					background 
					small 
					layout="prev, pager, next, jumper"
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
			console.log('got this from data')
			tableResource.init(props.data.resourceUrl, data)
			resource.value = data
			loading.value = false
		})
})
</script>