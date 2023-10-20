<template>
	<div class="py-6 px-10 asset-library">
		<div class="flex items-end justify-start mb-4">
			<div>
				<h1 class="mb-1">{{ resourceIndex.data.settings?.title ?? 'Assets' }}</h1>
				<Search :currentSearch="route.query.search" @update="resourceIndex.setSearch"/>
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

				<Uploader v-show="resourceIndex.data.settings?.canCreate" :multiple="resourceIndex.data.settings?.multiUpload" />
			</div>
		</div>
		<div class="el-card" v-if="resourceIndex.data.settings">

			<ListView v-if="layout == 'list'"
				@select="handleSelect"
				@edit="handleEdit" />

			<GridView v-if="layout == 'grid'" 
				:resource="resourceIndex.data.resourceData"
				:settings="resourceIndex.data.settings"
				@edit="handleEdit" />

			<div class="flex items-center justify-between p-3 mt-2">
				<div>Total: <strong>{{ resourceIndex.data.total }}</strong></div>
				<el-pagination
					background
					small
					layout="jumper, prev, pager, next, sizes"
					:current-page="resourceIndex.data.currentPage"
					:page-size="resourceIndex.data.perPage"
					:total="resourceIndex.data.total"
					@update:page-size="resourceIndex.pageSizeChange"
					@update:current-page="resourceIndex.pageChange"
				/>
			</div>

		</div>
	</div>

	<ActionsModal :actions-url="actionsUrl" />

	<Drawer v-if="drawer" @close="drawer = false" :style="{width: '60%'}">
		<div class="px-8 pb-4 pt-12 w-full">
			<FormBase
				class="mx-auto"
				:form-id="assetFormId"
				:resource="assetItem"
				:action-url="indexFormActionUrl"
				:post-submit-actions="['close']">
			</FormBase>
		</div>
	</Drawer>
</template>

<script setup>
import { UploadFilled } from '@element-plus/icons-vue'
import { mdiViewGridOutline, mdiFormatListText } from '@mdi/js';

import { useRoute } from 'vue-router'
const route = useRoute()

const resourceIndex = useResource('assets')
resourceIndex.initIndex(route)

const assetFormId = ref()

/* Handle Actions */
const actions = ref([])
const actionsUrl = `api${route.path}/actions`
const assetFormActionUrl = ref(actionsUrl)

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
const assetItem = ref()

// const handleEdit = (item) => {
// 	console.log('handle asset edit', item, resource)
// 	// let asset = (typeof item === 'number')
// 	// 	? resource.data.filter(i => i.id == item)[0]
// 	// 	: item
// 	drawer.value = true
// 	currentAsset.value = item
// }

// Handle Edit
const handleEdit = (item) => {

	// apiSubmit.value = false
	let itemUrl = `api${route.path}/${item}/edit`

	Invicta.axios.get(itemUrl)
		.then(({data}) => {
			assetFormId.value = `assets.${data.item.id}`
			assetItem.value = data
			assetFormActionUrl.value = itemUrl
			drawer.value = true
		})
}

Invicta.on('refresh-resource', () => {
	resourceIndex.getResource()
})

</script>