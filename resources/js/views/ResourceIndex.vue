<template>
	<Head :title="resource.title"/>
	<div class="py-6 px-10">
		<div class="flex items-end justify-start mb-4">
			<div>
				<h1 class="mb-1">{{ resource.title }}</h1>
				<FiltersSearch :currentSearch="resource.meta.search" :handle="resource.handle" :filters="resource.meta.filters" />
			</div>
			<div class="ml-auto flex items-center">
				<LocaleSwitch v-if="resource.locales" :locales="resource.locales" @change="resourceIndex.setLocale" />
				<Actions
					v-if="globalActions.length"
					:actions="globalActions"
				/>
				<el-button v-if="resource.sortable"><Link :href="`${resource.meta.path}/reorder`">Reorder</Link></el-button>
				<el-button v-show="canCreate" type="primary" size="large"><Link :href="`${resource.meta.path}/create`">Create new</Link></el-button>
			</div>
		</div>
		<el-card body-style="padding: 0px;">
			<div class="flex items-center justify-start p-3">
				<div class="mr-2">Total: <strong>{{ resource.meta.total }}</strong></div>
				<div><FilterBadges :badges="resource.meta.filterBadges" /></div>
				<div class="ml-auto flex items-center">
					<Actions
						v-if="bulkActions.length && selectedRows.length"
						:actions="bulkActions"
						:selected="selectedRows"
					/>
					<!-- <Filters :resource-handle="resource.handle" :filters="resource.meta.filters" /> -->
					<div v-show="canDelete" class="ml-3" title="Delete Selected">
						<el-button :icon="Delete" @click="handleBulkDelete" :disabled="!selectedRows.length" />
					</div>
				</div>
			</div>

			<ResourceTable
				:key="resource.slug"
				:resource-handle="resource.handle"
				:data="resource.data"
				:table-props="resource.table"
				:columns="resource.columns"
				:can-edit="canEdit"
				:can-delete="canDelete"
				:has-detail="resource.hasDetail"
				@select="handleSelect"
				@show="handleShow"
				@edit="handleEdit"
				@delete="handleDelete" />

			<div class="flex items-center justify-between p-3 mt-2">
				<div>Total: <strong>{{ resource.meta.total }}</strong></div>
				<el-pagination
					background
					small
					layout="jumper, prev, pager, next, sizes"
					:current-page="resource.meta.current_page"
					:page-size="resource.meta.per_page"
					:total="resource.meta.total"
					@update:page-size="resourceIndex.pageSizeChange"
					@update:current-page="resourceIndex.pageChange"
				/>
			</div>

		</el-card>
	</div>

	<ActionsModal :actions-url="actionsUrl"	/>

	<Drawer v-if="drawer" @close="drawer = false">
		<el-scrollbar>
			<div class="px-8 pb-4 pt-12 w-full">
				<FormBase
					class="mx-auto"
					:form-id="resourceFormId"
					:resource="resourceItem"
					:action-url="resourceItem.meta.actionUrl"
					:api="apiSubmit"
					:post-submit-actions="['close']">
				</FormBase>
			</div>
		</el-scrollbar>
	</Drawer>
</template>

<script setup>
import { Delete } from '@element-plus/icons-vue'

const props = defineProps({
	resource: Object,
	canCreate: Boolean,
	canEdit: Boolean,
	canDelete: Boolean,
})

const { pageUrl } = usePage().props.value
const resourceIndex = useResource(props.resource.handle)

console.log('I want to see what is inside', resourceIndex)
resourceIndex.init(pageUrl)
resourceIndex.setActiveFilters(props.resource.meta.filters)

/* Setup drawer */
const drawer = ref(false)
const resourceFormId = ref()
const resourceItem = ref()
const apiSubmit = ref(false)

/* Handle Actions */
const actions = ref([])
const actionsUrl = `/resource/${props.resource.handle}/actions`
onMounted(() => {
	Invicta.axios.get(actionsUrl)
		.then(({data}) => {
			actions.value = data
		})
})

const globalActions = computed(() => {
	return actions.value.filter((el) => el.type == 'global')
})

const bulkActions = computed(() => {
	return actions.value.filter((el) => el.type == 'bulk')
})

Invicta.on('action-called', (event) => {
	
	if (event.action.modal) {
		Invicta.emit('show-action-modal', event)
	} else {

		apiSubmit.value = {
			class: event.action.class,
			selected: event.selected
		}

		Invicta.axios.get(`/resource/${props.resource.handle}/actions/blueprint/${event.selected[0]}`, { params: {...event.action}})
			.then(({data}) => {
				resourceItem.value = data
				resourceFormId.value = `${data.handle}.${event.action.class}`
				drawer.value = true
				// console.log('I got some info about the edit item', data)
			})
	}
})

/* Setup Selection */
const selectedRows = ref([])
const handleSelect = (selection) => {
	selectedRows.value = selection.map(row => row.id)
}

// Handle Show (detail view)
const handleShow = (item) => {
	if (! props.resource.indexEdit) {
		Inertia.visit(`${props.resource.meta.path}/${item}`)
	} else {
		// if we want to show details in drawer ?
	}
}

// Handle Edit
const handleEdit = (item) => {

	if (! props.resource.indexEdit) {
		Inertia.visit(`${props.resource.meta.path}/${item}/edit`)
	} else {

		apiSubmit.value = false

		Invicta.axios.get(`resource/${props.resource.handle}/${item}`)
			.then(({data}) => {
				resourceFormId.value = `${props.resource.handle}.${data.item.id}`
				resourceItem.value = data
				drawer.value = true
			})
	}

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
		Inertia.delete(props.resource.meta.path, {data: { selected }})
	})
	.catch(() => console.log('cancel'))
}

const handleBulkDelete = () => {
	if (selectedRows.value.length) {
		handleDelete(selectedRows.value)
	}
}

Invicta.on('refresh-resource', () => {
	console.log('you want to refresh')
	Inertia.reload()
})

Invicta.on('resource-form-submitted', () => {
	drawer.value = false
	Inertia.reload()
})
</script>