<template>
	<Head :title="resource.title"/>
	<div class="py-6 px-10 asset-library">
		<div class="flex items-end justify-start mb-4">
			<div>
				<h1 class="mb-1">{{ resource.title }}</h1>
				<Search :currentSearch="resource.meta.search" />
			</div>
			<div class="ml-auto">
				<el-button-group class="mr-2" >
					<el-button @click="setLayout('list')" title="List view" :active="layout == 'list'">
						<SvgIcon :icon="mdiFormatListText" :width="16" />
					</el-button>
					<el-button @click="setLayout('grid')" title="Grid view" :active="layout == 'grid'">
						<SvgIcon :icon="mdiViewGridOutline" :width="16" />
					</el-button>
				</el-button-group>

				<Uploader v-show="canCreate" :multiple="multiUpload" />
			</div>
		</div>
		<el-card body-style="padding: 0px">

			<ListView v-if="layout == 'list'"
				:resource="resource"
				:can-edit="canEdit"
				:can-delete="canDelete"
				@edit="handleEdit" />

			<GridView v-if="layout == 'grid'" 
				:resource="resource.data" 
				:multiple="multiUpload" 
				@edit="handleEdit" />

			<div class="flex items-center justify-between p-3 mt-2">
				<div>Total: <strong>{{ resource.meta.total }}</strong></div>
				<el-pagination
					background
					small
					layout="jumper, prev, pager, next, sizes"
					:current-page="resource.meta.current_page"
					:page-size="resource.meta.per_page"
					:total="resource.meta.total"
					@update:page-size="itemsResource.pageSizeChange"
					@update:current-page="itemsResource.pageChange"
				/>
			</div>

		</el-card>
	</div>

	<Drawer v-if="drawer" @close="drawer = false">
		<AssetForm :asset="currentAsset" />
	</Drawer>
</template>

<script setup>
import { ref, onMounted, computed, unref } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-vue3'
import { useResource } from '@/services'
import Search from '@/components/resource/Search.vue'
import Uploader from '@/components/assets/Uploader.vue'
import ListView from '@/components/assets/ListView.vue'
import GridView from '@/components/assets/GridView.vue'
import AssetForm from '@/components/assets/AssetForm.vue'
import clone from 'lodash/clone'
import { UploadFilled } from '@element-plus/icons-vue'
import { mdiViewGridOutline, mdiFormatListText } from '@mdi/js';

const props = defineProps({
	resource: Object,
	multiUpload: Boolean,
	canCreate: Boolean,
	canEdit: Boolean,
	canDelete: Boolean,
})

const { pageUrl } = usePage().props.value
const resourceIndex = useResource()
resourceIndex.init(pageUrl)

/* Layout Setup */
const layout = ref()

onMounted(() => {
	layout.value = Invicta.remember('media-layout') || 'grid'
})
const setLayout = (type) => {
	layout.value = type
	Invicta.remember('media-layout', type)
}

/* Editing */
const drawer = ref(false)
const currentAsset = ref()

const handleEdit = (item) => {
	let asset = (typeof item === 'number')
		? props.resource.data.filter(i => i.id == item)[0]
		: item
	drawer.value = true
	currentAsset.value = asset
}

Invicta.on('refresh-resource', () => {
	Inertia.reload()
})

</script>