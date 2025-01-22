<template>
	<div class="w-full flex flex-col asset-library">
		<header class="p-3">
			<div class="flex items-center justify-between">
				<Search class="flex-1" handle="assets" @update="itemsResource.setSearch" />
				<div class="ml-2">
					<el-button-group>
						<el-button @click="setLayout('list')" title="List view" :active="layout == 'list'">
							<SvgIcon :icon="mdiFormatListText" :width="16" />
						</el-button>
						<el-button @click="setLayout('grid')" title="Grid view" :active="layout == 'grid'">
							<SvgIcon :icon="mdiViewGridOutline" :width="16" />
						</el-button>
					</el-button-group>
				</div>
			</div>
		</header>

		<main :class="{loading: loading, 'assets grid': layout == 'grid'}">

			<ResourceTable
				v-if="!loading && layout == 'list'"
				resource-handle="assets"
				:data="itemsResource.data.resourceData"
				:columns="itemsResource.static.settings.columns"
				:no-actions="true"
				:single-select="true"
				@single-select="handleSelect"
			/>

			<GridView v-if="!loading && layout == 'grid'" 
				:resource="itemsResource.data.resourceData"
				:selector="true"
				@asset-selected="gridSelect"/>

			<Loading v-if="loading" />

		</main>

		<footer>
			<div class="pagination px-2">
				<el-pagination 
					background 
					size="small" 
					layout="prev, pager, next, jumper"
					v-model:current-page="itemsResource.data.currentPage"
					v-model:page-size="itemsResource.data.perPage"
					:total="itemsResource.data.total"
					@current-change="itemsResource.setPage"
				/>
			</div>
            <label class="text-secondary">Show</label>
            <el-input-number size="small" v-model="itemsResource.data.perPage" controls-position="right" />
			<div class="button-row" v-if="layout == 'list'">
				<div class="mr-2">Total: <strong>{{itemsResource.total }}</strong></div>
				<el-button class="ml-auto mr-2" text @click="$emit('cancel')">Cancel</el-button>
				<el-button type="primary" @click="submitSelected">Select</el-button>
			</div>
		</footer>		
	</div>
</template>

<script setup>
import { mdiViewGridOutline, mdiFormatListText } from '@mdi/js';

const emit = defineEmits(['selected'])

const itemsResource = useFormResource('assets')
const loading = ref(false)

/* Layout Setup */
const layout = ref()

onMounted(() => {

	if (itemsResource.data.currentPage > 1) {
		itemsResource.setPage(1)
	}

	loading.value = true
	layout.value = Invicta.remember('media-layout') || 'grid'

	Invicta.axios.get('api/resource/assets', {params: {settings: true}})
		.then(({data}) => {
			loading.value = false
			console.log('I got this data', data)
			itemsResource.initForm('api/resource/assets', data)
		})
})

const setLayout = (type) => {
	layout.value = type
	Invicta.remember('media-layout', type)
}

/* Handle Selection */
const selected = ref([])

const handleSelect = (item) => {
	// console.log('selected item', item)
	selected.value = {
		id: item.id,
		src: item.src,
		path: item.path,
		name: item.img_name,
		alt: item.alt,
		width: item.width,
		height: item.height
	}
}

const gridSelect = (asset) => {
	handleSelect(asset)
	submitSelected()
}

function submitSelected() {
	console.log('i shoudld submit selected asset', selected.value)
	emit('selected', selected.value)
}
</script>

<style lang="scss">
#drawer {
	main {
		&.assets {
			background: var(--color-primary-back) !important;
		}
	}
}
</style>
