<template>
	<Head title="Permissions"/>
	<div class="py-6 px-10">
		<el-form
			class="invicta-form w-2/3"
			:model="form"
		>
			<div class="flex items-end justify-between mb-4">
				<div>
					<h1 class="mb-1">Permissions</h1>
				</div>
				<el-button type="primary" @click="submit">Save</el-button>
			</div>
			<div class="w-full">
				<div v-for="tree in trees" class="pb-6">
					<header v-if="tree.label" class="text-base font-bold pb-2">{{ tree.label }}</header>
					<el-card>
						<div class="px-5">
							<CheckTree :initial-items="tree.children" :disabled="false" :depth="1"/>
						</div>
					</el-card>
				</div>
			</div>
		</el-form>
	</div>
</template>

<script setup>
// import { useForm } from '@inertiajs/vue3'

const props = defineProps({
	tree: Object,
	permissions: Object,
	actionUrl: String
})

// const form = useForm({
// 	permissions: []
// })

const trees = ref([])

onMounted(() => {
	parsePermissionTree(props.tree)
})

function parsePermissionTree(data) {

	data.map((group) => {
		trees.value.push({
			label: group.label,
			checked: true,
			children: group.permissions.map((permission) => parsePermissionItem(permission))
		})
	})
}

function parsePermissionItem(permissionItem) {
	return {
		label: permissionItem.label,
		value: permissionItem.permission,
		checked: props.permissions.length ? props.permissions.includes(permissionItem.permission) : false,
		children: permissionItem.children ? permissionItem.children.map((children) => parsePermissionItem(children)) : []
	}
}

const checkedPermission = computed(() => {
	const value = checked(trees.value)
	return pickBy(value, isString)
})

function submit() {
	form.permissions = checkedPermission
	form.post(props.actionUrl, {
		onFinish: () => form.reset('password')
	})
}
</script>