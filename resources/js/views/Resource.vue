<template>
	<Head :title="resource.title"/>
	<div class="py-6 px-10">
		<div class="flex items-end justify-between mb-4">
			<div>
				<h1 class="mb-1">{{ resource.title }}</h1>
				<Search :currentSearch="resource.meta.filters.search"/>
			</div>
			<el-button type="primary" size="large">Create User</el-button>
		</div>
		<el-card body-style="padding: 0;">
			<div class="flex items-center justify-between p-3">
				<div>Total: <strong>{{ resource.meta.total }}</strong></div>
				<el-pagination 
					small 
					background
					layout="prev, next, jumper"
					:current-page="resource.meta.current_page"
					:page-size="resource.meta.per_page"
					:total="resource.meta.total"
					@update:page-size="changePerPage"
					@update:current-page="changePage"
				/>
			</div>
			<div class="flex items-center justify-between p-3">
				<div>Filters, badges etc</div>
				<Filters/>
			</div>

			<ResourceTable :data="resource.data" :table-props="resource.table" :columns="resource.columns" />

		</el-card>
					<div class="flex items-center justify-between pt-3">
				<div>Total: <strong>{{ resource.meta.total }}</strong></div>
				<el-pagination 
					background 
					small 
					layout="prev, pager, next, sizes"
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
import { usePage } from '@inertiajs/inertia-vue3'
import { useResource } from '@/services'
import Search from '@/components/resource/Search.vue'
import ResourceTable from '@/components/resource/ResourceTable.vue'
import Filters from '@/components/resource/Filters.vue'

const props = defineProps({
	resource: Object
})

console.log(usePage().props.value);

const { pageUrl } = usePage().props.value
const { requestQuery } = useResource(props.resource, pageUrl)

/* Pagination Setup */

const changePerPage = (event) => Invicta.emit('page-size-change', event)
const changePage = (event) => Invicta.emit('page-change', event)

console.log(requestQuery)
</script>

<style lang="scss">

</style>