<template>
	<div class="w-full flex flex-col">
		<header class="p-3">
			<div class="flex items-center justify-between gap-2">
				<el-select v-if="resources.length" 
					v-model="currentResource" 
					value-key="handle" 
					:teleported="false"
					@change="requestResourceItems">
					<el-option
						v-for="resource in resources"
						:key="resource.handle"
						:label="resource.label"
						:value="resource"/>
				</el-select>
				<Search v-if="currentResource.handle" :handle="currentResource.handle" />
				<Filters v-if="currentResource.handle" :resource-handle="currentResource.handle" />
			</div>
		</header>

		<div class="bg-white px-2 pt-2"><FilterBadges :badges="itemsResource.filterBadges" /></div>
		
		<main>
			<div class="flex items-center justify-center h-full" v-if="loading">
				<Loading />
			</div>

			<el-scrollbar v-else>
				<ResourceTable
					:resource-handle="currentResource.handle"
					:data="itemsResource.resourceData"
					:columns="columns"
					:columns-select="false"
					:no-actions="true"
					:single-select="singleSelect"
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
					@update:page-size="itemsResource.pageSizeChange"
					@update:current-page="itemsResource.pageChange"
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
const props = defineProps({
	resourceHandle: String,
	exclude: Array,
	requestUrl: String,
	titleField: String,
	select: {
		type: Array,
		default: [],
	},
	columns: {
		type: Object,
		default: () => {
			return {
				id: { label: 'ID', sortable: true, align: 'center', width: 70 },
				title: { label: 'Title', sortable: true },
				created: { label: 'Created'}
			}
		}
	},
	singleSelect: {
		type: Boolean,
		default: false,
	},
	resources: {
		type: Array,
		default: []
	},
	where: String
})

const emit = defineEmits(['selected'])

const loading = ref(false)
const itemsResource = useResource(props.resourceHandle)

/* Setup multiple resources selection */
const currentResource = ref({
	handle: props.resourceHandle
})

const titleField = computed(() => {
	return props.resources.length
		? currentResource.value.titleField
		: props.titleField
})

onMounted(() => {
	if (props.resources.length) {
		currentResource.value = props.resources[0]
	}
	itemsResource.pageChange(1)
	requestResourceItems()
})

/* Handle Selection */
const selected = ref([])
const handleSelect = (selection) => {
	selected.value = selection
}

const selectedItems = computed(() => {
	return selected.value.map(item => {
		return { id: item.id, [titleField.value]: item.title, item: toRaw(item) }
	})
})

const submitSelected = () => {
	Invicta.emit('clear-filters')
	emit('selected', selectedItems.value)
}

function requestResourceItems() {
	loading.value = true

	let params = {
		paginate: true,
		title: titleField.value,
		exclude: props.exclude,
	}

	if (props.select.length) {
		params.select = props.select
	}

	if (props.where != '') {
		params.where = props.where
	}

	let requestUrl = props.resources.length
		? `api/resource/${currentResource.value.handle}/items`
		: props.requestUrl

	Invicta.axios.get(requestUrl, { params })
		.then(({data}) => {
			itemsResource.init(requestUrl, data, true)
			loading.value = false
		})	
}
</script>