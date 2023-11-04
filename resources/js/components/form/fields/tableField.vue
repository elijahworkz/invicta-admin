<template>
	<div class="mb-2">
		<div class="flex items-center justify-between" v-if="resource && data.searchFilter">
			<Search
				size="default"
				class="max-w-sm"
				:currentSearch="resource.meta.search"
				:key="tableResource.static.settings.handle"
				@update="tableResource.setSearch"/>

			<Filters 
				v-if="tableResource.static.filters" 
				:resource-handle="tableResource.static.settings.handle" 
				:filters="tableResource.static.filters" 
				:active-filters="tableResource.data.activeFilters"
				/>
		</div>

		<div class="my-3" v-if="! loading">
			<FilterBadges :badges="tableResource.data.filterBadges" />
		</div>

		<div class="flex items-center justify-center h-full py-10" v-if="loading">
			<Loading />
		</div>

		<ResourceTable
			v-else-if="resource"
			:key="data.id"
			:resource-handle="tableResource.static.settings.handle"
			:data="tableResource.data.resourceData"
			:table-props="tableResource.static.settings.table"
			:columns="tableResource.static.settings.columns"
			:columns-select="false"
			:can-edit="false"
			:can-delete="false"
			:has-detail="false"
			:no-select="true"
			v-loading="tableResource.data.loading" />

		<div class="flex items-center justify-between p-3 mt-2">
			<div>Total: <strong>{{ tableResource.data.total }}</strong></div>
			<el-pagination
				v-if="resource && resource.meta.last_page > 1"
				background
				small
				layout="prev, pager, next, jumper"
				:current-page="tableResource.data.currentPage"
				:page-size="tableResource.data.perPage"
				:pager-count="5"
				:total="tableResource.data.total"
				@update:page-size="tableResource.setPageSize"
				@update:current-page="tableResource.setPage"
			/>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	formId: String,
	data: Object,
	path: String
})
// console.log('i got table Field', props.data.id)

const loading = ref(false)
const resource = ref()
const tableResource = useFormResource(props.data.id)

onMounted(() => {
	loading.value = true

	Invicta.axios.get(props.data.resourceUrl, {params: {settings: true}})
		.then(({data}) => {
			tableResource.initForm(props.data.resourceUrl, data)
			resource.value = data
			loading.value = false

			if (props.data.searchFilter) {
				tableResource.getResourceFilters(tableResource.static.settings.handle)
			}
		})
})
</script>