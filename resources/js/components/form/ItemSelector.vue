<template>
	<div class="w-full">
		<header class="p-4">
			<Search />
		</header>
		
		<main>
			<el-scrollbar>
				<ResourceTable 
					:data="itemsResource.resource"
					:columns="columns"
					@select="handleSelect"
				/>
			</el-scrollbar>
		</main>

		<footer class="p-4 flex items-center justify-between">
			<el-pagination 
				background 
				small 
				layout="jumper, prev, pager, next"
				:current-page="itemsResource.currentPage"
				:page-size="itemsResource.perPage"
				:total="itemsResource.total"
				@update:page-size="changePerPage"
				@update:current-page="changePage"
			/>
			<el-button type="primary" @click="$emit('select', selectedItems)">Select</el-button>
		</footer>
	</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import ResourceTable from '@/components/resource/ResourceTable.vue'
import Search from '@/components/resource/Search.vue'
import { useResource } from '@/services'

const props = defineProps({
	exclude: Array,
	requestUrl: String,
	titleField: String,
})

const itemsResource = useResource()
const resource = itemsResource.resource

const columns = {
	id: { label: 'ID', sortable: true, align: 'center', width: 70 },
	title: { label: 'Title', sortable: true },
	created_at: { label: 'Created'}
}

onMounted(() => {
	console.log('looking', props.requestUrl)
	let params = {
		paginate: true,
		title: props.titleField,
		exclude: props.exclude,
	}

	Invicta.axios.get(props.requestUrl, { params })
		.then(({data}) => {
			itemsResource.init(props.requestUrl, data)
		})
})

/* Pagination Setup */
const changePerPage = (event) => Invicta.emit('page-size-change', event)
const changePage = (event) => Invicta.emit('page-change', event)

/* Handle Selection */
const selected = ref([])
const handleSelect = (selection) => {
	selected.value = selection
}

const selectedItems = computed(() => {
	return selected.value.map(item => {
		return { id: item.id, [props.titleField]: item.title }
	})
})
</script>