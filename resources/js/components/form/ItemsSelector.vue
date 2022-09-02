<template>
	<div class="w-full flex flex-col">
		<header class="p-3">
			<div class="flex items-center justify-between gap-2">
				<Search />
				<Filters :resource-handle="resourceHandle" />
			</div>
		</header>
		<div class="bg-white px-2 pt-2"><FilterBadges :badges="itemsResource.filterBadges" /></div>
		
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

		<footer>
			<div class="pagination px-2">
				<el-pagination 
					background 
					small 
					layout="prev, pager, next, jumper"
					:current-page="itemsResource.currentPage"
					:page-size="itemsResource.perPage"
					:pager-count="5"
					:total="itemsResource.total"
					@update:page-size="changePerPage"
					@update:current-page="changePage"
				/>
			</div>
			<div class="button-row">
				<div class="mr-2">Total: <strong>{{itemsResource.total }}</strong></div>
				<el-button class="ml-auto mr-2" text @click="$emit('cancel')">Cancel</el-button>
				<el-button type="primary" @click="submitSelected">Select</el-button>
			</div>
		</footer>
	</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import ResourceTable from '@/components/resource/ResourceTable.vue'
import Search from '@/components/resource/Search.vue'
import Filters from '@/components/resource/Filters.vue'
import FilterBadges from '@/components/resource/FilterBadges.vue'
import Loading from '@/components/shared/Loading.vue'
import { useResource } from '@/services'

const props = defineProps({
	resourceHandle: String,
	exclude: Array,
	requestUrl: String,
	titleField: String,
	navItems: {
		type: Boolean,
		default: false,
	},
	columns: {
		type: Object,
		default: () => {
			return {
				id: { label: 'ID', sortable: true, align: 'center', width: 70 },
				title: { label: 'Title', sortable: true },
				created_at: { label: 'Created'}
			}
		}
	}
})

const emit = defineEmits(['update'])

const loading = ref(false)
const itemsResource = useResource()

onMounted(() => {

	loading.value = true

	let params = {
		paginate: true,
		title: props.titleField,
		exclude: props.exclude,
		nav_items: props.navItems
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

const submitSelected = () => {
	Invicta.emit('clear-filters')
	emit('update', selectedItems.value)
}
</script>