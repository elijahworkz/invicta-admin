<template>
	<Head :title="title"/>
	<div class="p-10 w-1/2 mx-auto">
		<div class="flex items-end justify-start mb-4">
			<div>
				<h1 class="mb-1">{{ title }}</h1>
			</div>
			<div class="ml-auto">
				<el-button type="primary" v-if="canCreate"><Link :href="createUrl">Create new</Link></el-button>
			</div>
		</div>
		<el-card body-style="padding: 0px" v-if="navs.data.length">
			<table class="list-table">
				<tbody>
					<tr v-for="nav in navs.data">
						<td>
							<Link v-if="canEdit" :href="`${editUrl}/${nav.id}`">{{ nav.title }}</Link>
							<span v-else>{{ nav.title }}</span>
						</td>
						<td>
							{{ nav.handle }}
						</td>
						<td class="w-1">
							<ActionsDropdown :actions="actions" :item="nav.id" @selected="handleAction" />
						</td>
					</tr>
				</tbody>
			</table>
		</el-card>

		<div v-else class="opacity-10 ">
			<svg viewBox="0 0 24 24" width="200" class="mx-auto">
    			<path fill="currentColor" d="M11,10H5L3,8L5,6H11V3L12,2L13,3V4H19L21,6L19,8H13V10H19L21,12L19,14H13V20A2,2 0 0,1 15,22H9A2,2 0 0,1 11,20V10Z" />
			</svg>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import ActionsDropdown from '@/components/shared/ActionsDropdown.vue'
import { usePage } from '@inertiajs/inertia-vue3'
import { useResource } from '@/services'
import { Delete } from '@element-plus/icons-vue'

const props = defineProps({
	title: String,
	navs: Object,
	createUrl: String,
	editUrl: String,
	canCreate: Boolean,
	canEdit: Boolean,
	canDelete: Boolean
})


/* Handle Actions */
const actions = [
	{ name: 'Edit', divider: true, action: 'edit' },
	{ name: 'Delete', class: '!text-red-600', action: 'delete' },
].filter(item => {
	switch(item.action) {
		case 'edit':
			return props.canEdit
		case 'delete':
			return props.canDelete
	}
	return true
})

const handleAction = (event) => {
	console.log('got event', event)

	if (event.action == 'edit') {
		// handleEdit()
	}

	if (event.action == 'delete') {
		handleDelete(event.item)
	}
}

function handleDelete (item) {
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

</script>