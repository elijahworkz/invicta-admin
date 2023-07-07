<template>
	<Head :title="title"/>
	<div class="py-6 px-10 asset-library">
		<div class="flex items-end justify-start mb-4">
			<div>
				<h1 class="mb-1">{{ title }}</h1>
				<Search :currentSearch="resource.meta.search" :handle="settings.handle" />
			</div>
			<div class="ml-auto">
				<Actions
					v-if="bulkActions.length && selectedRows.length"
					:actions="bulkActions"
					:selected="selectedRows"
					name="Bulk Actions"
				/>
				<Actions
					v-if="globalActions.length"
					:global="true"
					:actions="globalActions"
					name="Global Actions"
				/>
				<el-button-group class="mr-2" >
					<el-button @click="setLayout('list')" title="List view" :active="layout == 'list'">
						<SvgIcon :icon="mdiFormatListText" :width="16" />
					</el-button>
					<el-button @click="setLayout('grid')" title="Grid view" :active="layout == 'grid'">
						<SvgIcon :icon="mdiViewGridOutline" :width="16" />
					</el-button>
				</el-button-group>

				<Uploader v-show="settings.canCreate" :multiple="settings.multiUpload" />
			</div>
		</div>
		<el-card body-style="padding: 0px">

			<ListView v-if="layout == 'list'"
				:settings="settings"
				:columns="resource.meta.columns"
				@select="handleSelect"
				@edit="handleEdit" />

			<GridView v-if="layout == 'grid'" 
				:resource="resourceIndex.resourceData"
				:settings="settings"
				@edit="handleEdit" />

			<div class="flex items-center justify-between p-3 mt-2">
				<div>Total: <strong>{{ resourceIndex.total }}</strong></div>
				<el-pagination
					background
					small
					layout="jumper, prev, pager, next, sizes"
					:current-page="resourceIndex.currentPage"
					:page-size="resourceIndex.perPage"
					:total="resourceIndex.total"
					@update:page-size="resourceIndex.pageSizeChange"
					@update:current-page="resourceIndex.pageChange"
				/>
			</div>

		</el-card>
	</div>

	<ActionsModal :actions-url="actionsUrl" />

	<Drawer v-if="drawer" @close="drawer = false">
		<AssetForm :asset="currentAsset" @close="drawer = false"/>
	</Drawer>
</template>

<script setup>
import { UploadFilled } from '@element-plus/icons-vue'
import { mdiViewGridOutline, mdiFormatListText } from '@mdi/js';

const { title, resource, settings } = usePage().props
const resourceIndex = useResource(settings.handle)
resourceIndex.init(settings.resourceUrl, resource)

/* Layout Setup */
const layout = ref()

onMounted(() => {
	layout.value = Invicta.remember('media-layout') || 'grid'

	Invicta.on('action-called', actionCalled)

	Invicta.axios.get(actionsUrl)
		.then(({data}) => {
			actions.value = data
		})
})
const setLayout = (type) => {
	layout.value = type
	Invicta.remember('media-layout', type)
}

/* Setup Selection */
const selectedRows = ref([])
const handleSelect = (selection) => {
	selectedRows.value = selection //.map(row => row.id)
}

/* Handle Actions */
const actions = ref([])
const actionsUrl = `${settings.resourceUrl}/actions`

onUnmounted( () => {
	Invicta.off('action-called', actionCalled)
})

const globalActions = computed(() => {
	return actions.value.filter((el) => el.type == 'global')
})

const bulkActions = computed(() => {
	return actions.value.filter((el) => el.type == 'bulk')
})

const actionCalled = ({action, selected}) => {
	// console.log('action-called', action, action.modal);
	if (action.modal) {
		Invicta.emit('show-action-modal', {action, selected})
	} else {

		apiSubmit.value = {
			class: action.class
		}

		let item = null
		if (selected.length) {
			apiSubmit.value.selected = selected
			item = selected[0]
		}

		Invicta.axios.get(`${actionsUrl}/blueprint/${item}`, { params: {...action}})
			.then(({data}) => {
				resourceItem.value = data
				resourceFormId.value = `${data.handle}.${action.class}`
				drawer.value = true
			})
	}
}

/* Editing */
const drawer = ref(false)
const currentAsset = ref()

const handleEdit = (item) => {
	let asset = (typeof item === 'number')
		? resource.data.filter(i => i.id == item)[0]
		: item
	drawer.value = true
	currentAsset.value = asset
}

Invicta.on('refresh-resource', () => {
	resourceIndex.getResource()
})

</script>