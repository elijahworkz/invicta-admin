<template>
	<Head :title="resource.title"/>
	<div class="py-6 px-10">
		<div class="flex items-end justify-between mb-4">
			<div>
				<h1 class="mb-1">{{ resource.title }}</h1>
				<Search :currentSearch="resource.meta.search"/>
			</div>
			<el-button type="primary" size="large">Create User</el-button>
		</div>
		<el-card body-style="padding: 0px">
		<div class="flex items-center justify-start p-3">
			<div class="mr-4">Total: <strong>{{ resource.meta.total }}</strong></div>
			<div><FilterBadges :badges="resource.meta.filterBadges" /></div>
			<div class="ml-auto"><Filters/></div>
			<div v-if="rowsSelected" class="ml-3" title="Delete Selected">
				<el-button type="danger" text bg :icon="Delete" />
			</div>
		</div>

			<ResourceTable 
				:key="resource.slug"
				:data="resource.data"
				:table-props="resource.table" 
				:columns="resource.columns"
				:edit-url="resource.meta.path"
				@select="handleSelect" />

		</el-card>
					<div class="flex items-center justify-between pt-3">
				<div>Total: <strong>{{ resource.meta.total }}</strong></div>
				<el-pagination 
					background 
					small 
					layout="jumper, prev, pager, next, sizes"
					:current-page="resource.meta.current_page"
					:page-size="resource.meta.per_page"
					:total="resource.meta.total"
					@update:page-size="changePerPage"
					@update:current-page="changePage"
				/>
			</div>
	</div>
</template>

<script setup>
import { ref, unref } from 'vue'
import { usePage } from '@inertiajs/inertia-vue3'
import { useResource } from '@/services'
import Search from '@/components/resource/Search.vue'
import ResourceTable from '@/components/resource/ResourceTable.vue'
// import ResourceTable from '@/components/shared/data-table/Table.vue'
import Filters from '@/components/resource/Filters.vue'
import FilterBadges from '@/components/resource/FilterBadges.vue'
import { Delete } from '@element-plus/icons-vue'

const props = defineProps({
	resource: Object
})

const { pageUrl } = usePage().props.value
const resourceIndex = useResource()
resourceIndex.init(pageUrl)

/* Pagination Setup */

const changePerPage = (event) => Invicta.emit('page-size-change', event)
const changePage = (event) => Invicta.emit('page-change', event)

const rowsSelected = ref(false)
const handleSelect = (selection) => { 
	console.log('have selection', selection)
	rowsSelected.value = selection.length ? true : false
}
</script>

<style lang="scss">

</style>