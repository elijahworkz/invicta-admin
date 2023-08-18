<template>
	<Head :title="title"/>
	<div class="py-6 px-10">
		<div class="flex items-end justify-start mb-4">
			<div class="flex-auto mr-4">
				<h1 class="mb-1">{{ title }}</h1>
				<div class="max-w-sm">
					<Search :currentSearch="resource.meta.search" :handle="settings.handle" />
				</div>
				<!-- <FiltersSearch :currentSearch="resource.meta.search" :handle="settings.handle" :filters="resource.meta.filters" /> -->
			</div>
			<div class="ml-auto flex items-center">
				<LocaleSwitch v-if="settings.locales" 
					:locales="settings.locales"
					:handle="settings.handle" />
				<Actions
					v-if="globalActions.length"
					:global="true"
					:actions="globalActions"
					name="Resource Actions"
				/>
				<el-button v-if="settings.sortable"><Link :href="`${resource.meta.path}/reorder`">Reorder</Link></el-button>
				<el-button v-show="settings.canCreate" type="primary"><Link :href="`${resource.meta.path}/create`">Create new</Link></el-button>
			</div>
		</div>
		<el-card body-style="padding: 0px;">
			<div class="flex items-center justify-start p-3">
				<div class="mr-2 leading-none">Total: <strong>{{ resourceIndex.total }}</strong></div>
				<div><FilterBadges :badges="resourceIndex.filterBadges" /></div>

				<div class="ml-auto leading-none flex items-center">
					<el-link v-if="canResetFilters" @click="resetFilters" :underline="false" type="danger" class="mr-2">Clear all filters</el-link>
					<Filters :resource-handle="settings.handle" :filters="resource.meta.filters" />
				</div>
			</div>

			<div class="bg-slate-100 px-3 py-2 flex items-center justify-between" v-if="selectedRows.length">
				<div class="flex items-center leading-none">
					<span class="mr-2 text-sm">{{ selectedText }}</span> 
					<el-link v-if="! selectedAll" 
						type="primary" 
						:underline="false" 
						@click="selectAll"
						class="mr-2">Select all {{ resourceIndex.total }}</el-link>
					<el-link :underline="false" type="info" @click="deselect">Deselect all</el-link>
				</div>
				<div class="ml-auto flex items-center">
					<Actions
						v-if="bulkActions.length"
						name="Bulk Actions"
						:actions="bulkActions"
						:selected="selectedRows"
						:selected-all="selectedAll"
					/>
					<!-- <Filters :resource-handle="resource.handle" :filters="resource.meta.filters" /> -->
					<div v-show="settings.canDelete" class="ml-3" title="Delete Selected">
						<el-button :icon="Delete" @click="handleBulkDelete" />
					</div>
				</div>
			</div>

			<ResourceTable
				ref="resourceTableRef"
				:key="settings.slug"
				:resource-handle="settings.handle"
				:data="resourceIndex.resourceData"
				:table-props="resource.meta.table"
				:columns="resource.meta.columns"
				:can-edit="settings.canEdit"
				:can-delete="settings.canDelete"
				:has-detail="settings.hasDetail"
				@select="handleSelect"
				@show="handleShow"
				@edit="handleEdit"
				@delete="handleDelete" />

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
		<el-scrollbar>
			<div class="px-8 pb-4 pt-12 w-full">
				<FormBase
					class="mx-auto"
					:form-id="resourceFormId"
					:resource="resourceItem"
					:action-url="indexFormActionUrl"
					:api="apiSubmit"
					:post-submit-actions="['close']">
				</FormBase>
			</div>
		</el-scrollbar>
	</Drawer>
</template>

<script setup>
import { Delete } from '@element-plus/icons-vue'

const { title, resource, settings } = usePage().props
const resourceIndex = useResource(settings.handle)

resourceIndex.init(settings.resourceUrl, resource)
resourceIndex.setActiveFilters(resource.meta.filters)
resourceIndex.setSearch(resource.meta.search)

const resourceTableRef = ref()

/* Setup drawer */
const drawer = ref(false)
const resourceFormId = ref()
const resourceItem = ref()
const apiSubmit = ref(false)

/* Handle Actions */
const actions = ref([])
const actionsUrl = `${settings.resourceUrl}/actions`
const indexFormActionUrl = ref(actionsUrl)

onMounted(() => {
	Invicta.on('action-called', actionCalled)

	Invicta.axios.get(actionsUrl)
		.then(({data}) => {
			actions.value = data
		})
})

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

		Invicta.axios.get(`${actionsUrl}/blueprint/${item}`, { params: {class: action.class}})
			.then(({data}) => {
				resourceItem.value = data
				resourceFormId.value = `${data.handle}.${action.class}`
				indexFormActionUrl.value = actionsUrl
				drawer.value = true
			})
	}
}

/* Setup Selection */
const selectedAll = ref(false)
const selectedRows = ref([])
const handleSelect = (selection) => {
	selectedAll.value = false
	selectedRows.value = selection.map(row => row.id)
}

const selectAll = async () => {
	let result = await resourceIndex.selectAll()
	selectedAll.value = true
	selectedRows.value = result.data
}

const selectedText = computed(() => {
	let records = selectedAll.value 
		? resourceIndex.total 
		: selectedRows.value.length
	return `${records} records selected`
})

const deselect = () => {
	selectedAll.value = false
	resourceTableRef.value.clearSelection()
	selectedRows.value = []
}

// Handle Show (detail view)
const handleShow = (item) => {
	if (! settings.indexEdit) {
		router.visit(`${resource.meta.path}/${item}`)
	} else {
		// if we want to show details in drawer ?
	}
}

// Handle Edit
const handleEdit = (item) => {

	if (! settings.indexEdit) {
		router.visit(`${resource.meta.path}/${item}/edit`)
	} else {

		apiSubmit.value = false
		let itemUrl = `${settings.resourceUrl}/${item}`

		Invicta.axios.get(itemUrl)
			.then(({data}) => {
				resourceFormId.value = `${settings.handle}.${data.item.id}`
				resourceItem.value = data
				indexFormActionUrl.value = `${resource.meta.path}/${item}`
				drawer.value = true
			})
	}
}

// Handle filters
const canResetFilters = computed(() => !isEmpty(resourceIndex.activeFilters))

const resetFilters = () => {
	Invicta.emit('clear-filters', settings.handle)
}

/* Handle Delete Actions */
const handleDelete = (selected) => {
	ElMessageBox.confirm(
		'This action will permanently delete records from database. Are you sure you want to continue?',
		'Deleting',
		{
			confirmButtonText: 'Delete',
			cancelButtonText: 'Cancel',
			confirmButtonClass: 'el-button--danger'
		}
	).then(() => {
		Invicta.axios.delete(settings.resourceUrl, { data: { selected }})
			.then(({data}) => {
				Invicta.message(data.message)
				resourceIndex.getResource()
			})
	})
	.catch((error) => {
		console.log('cancel', error)
	})
}

const handleBulkDelete = () => {
	if (selectedRows.value.length) {
		handleDelete(selectedRows.value)
	}
}

Invicta.on('refresh-resource', () => {
	console.log('you want to refresh')
	resourceIndex.getResource()
})

Invicta.on('resource-form-submitted', () => {
	drawer.value = false
	resourceIndex.getResource()
})
</script>