<template>
	<div class="w-full flex flex-col">
		<header class="p-4">
			<Search />
		</header>
		
		<main>
			<div class="flex items-center justify-center h-full" v-if="loading">
				<Loading />
			</div>

			<el-scrollbar v-else>
				<ResourceTable 
					:data="itemsResource.resource"
					:columns="columns"
					:no-actions="true"
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
			<el-button class="ml-auto mr-2" text @click="$emit('cancel')">Cancel</el-button>
			<el-button type="primary" @click="$emit('update', selectedItems)">Select</el-button>
		</footer>
	</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import ResourceTable from '@/components/resource/ResourceTable.vue'
import Search from '@/components/resource/Search.vue'
import Loading from '@/components/shared/Loading.vue'
import { useResource } from '@/services'

const props = defineProps({
	exclude: Array,
	requestUrl: String,
	titleField: String,
})

const loading = ref(false)
const itemsResource = useResource()

const columns = {
	id: { label: 'ID', sortable: true, align: 'center', width: 70 },
	title: { label: 'Title', sortable: true },
	created_at: { label: 'Created'}
}

onMounted(() => {

	loading.value = true

	let params = {
		paginate: true,
		title: props.titleField,
		exclude: props.exclude,
	}

	Invicta.axios.get(props.requestUrl, { params })
		.then(({data}) => {
			itemsResource.init(props.requestUrl, data)
			loading.value = false
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