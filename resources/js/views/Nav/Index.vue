<template>
	<div class="p-10 w-2/3 mx-auto">
		<div class="flex items-end justify-start mb-4">
			<div>
				<h1 class="mb-1">{{ title }}</h1>
			</div>
			<div class="ml-auto">
				<el-button type="primary" v-if="canCreate"><router-link :to="{ name: 'navCreate' }">Create new</router-link></el-button>
			</div>
		</div>
		<el-card v-if="navs.length">
			<table class="list-table">
				<tbody>
					<tr v-for="nav in navs" :class="{'warning-row': nav.error}">
						<td>
							<router-link v-if="canEdit" :to="{ name: 'navEditItems', params: { id: nav.id }}">{{ nav.title }}</router-link>
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
import { useRouter } from 'vue-router'
import { Delete } from '@element-plus/icons-vue'

defineOptions({
	beforeRouteEnter: async function (to) {
		let {data} = await Invicta.axios.get(`api${to.path}`)
		to.meta.data = data
	}
})

const router = useRouter()
const props = defineProps({
	title: String,
	navs: Object,
	editUrl: String,
	canCreate: Boolean,
	canEdit: Boolean,
	canDelete: Boolean
})

Invicta.pageTitle(props.title)

/* Handle Actions */
const actions = [
	{ name: 'Edit', divider: true, action: 'edit' },
	{ name: 'Delete',  action: 'delete', danger: true },
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
		router.push({ name: 'navEdit', props: { id: event.item }})
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
		Invicta.axios.post(``)
		router.delete(`${props.editUrl}/${item}`)
	})
	.catch(() => console.log('cancel'))
}

</script>