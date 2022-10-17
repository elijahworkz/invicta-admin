<template>
	<Head :title="menu.title"/>
	<div class="py-6 px-10">
		<div class="w-1/2 mx-auto">

			<div class="flex items-end justify-between mb-4">
				<div>
					<Link :href="indexUrl" 
						class="breadcrumb">
						<el-icon><ArrowLeft /></el-icon>Navigation</Link>
					<h1 class="mb-1">{{ menu.title }}</h1>
				</div>
				<div class="nav-actions">
					
					<el-dropdown @command="handleCommand" class="mr-2">
						<el-button>
						New Item<el-icon class="el-icon--right"><arrow-down /></el-icon>
						</el-button>
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item
									v-for="(resource, handle) in resources"
									:command="handle">{{ resource.title }}</el-dropdown-item>
								<el-dropdown-item command="custom">Custom Link</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>

					<el-button type="primary" @click="saveNavigation" :disabled="!dirtyState">Save Changes</el-button>
				</div>
			</div>

			<NavTree 
				:list="treeItems" 
				:child-actions="childActions" 
				@add-child="addChild"
				@edit-item="editItem" />

		</div>
	</div>

	<Drawer v-if="drawer.state" :style="{ width: '400px' }" @close="drawer.state = false">
		<ItemsSelector
			v-if="drawer.context == 'list'"
			:columns="{ title: { label: 'Title', sortable: true }}"
			:exclude="excludeItems[currentResource]"
			:request-url="itemsUrl"
			:title-field="titleField"
			:resource-handle="currentResource"
			@selected="updateItems" 
			@cancel="drawer.state = false" />


		<NavItemForm 
			v-if="drawer.context == 'form'"
			:mode="formMode"
			:item-data="formItem"
			@saved="updateItem"
			@close="drawer.state = false"
		/>
	</Drawer>	
</template>

<script setup>
import { ArrowLeft, ArrowDown } from '@element-plus/icons-vue'

const props = defineProps({
	indexUrl: String,
	actionUrl: String,
	menu: Object,
	resources: Object
})

const drawer = reactive({
	state: false,
	context: 'list'
})

const itemsUrl = ref('')
const titleField = ref()
const currentResource = ref('link')
const currentItem = ref(null)

const dirtyState = ref(false)

/* Build Menu Items */
const treeItems = ref(props.menu.tree || [])

const excludeItems = computed(() => {
	return treeItems.value.reduce((obj, item) => {
		obj[item.handle] = obj[item.handle] || []
		obj[item.handle].push(item.id)
		return obj
	}, {})
})

const updateChildItems = (tree, items) => {
	tree.forEach(item => {
		if (item.id == currentItem.value.id 
			&& item.handle == currentItem.value.handle
			&& item.label == currentItem.value.label) {
			console.log('debugging items', item.id, currentItem.value.id, item.handle, currentItem.value.handle)
			item.children.push(...items)
		} else if (item.children.length) {
			console.log('nav items have children')
			updateChildItems(item.children, items)
		}
	})
	return tree
}

const updateItems = (selected) => {
	drawer.state = false

	let items = selected.map(item => {
		return { 
			label: item[titleField.value],
			url: item?.url,
			id: item?.id,
			handle: currentResource.value,
			type: props.resources[currentResource.value]?.title || item?.type,
			css: item?.css,
			external: item?.external,
			children: [] 
		}
	})

	if (currentItem.value) {
		treeItems.value = updateChildItems(treeItems.value, items)
	} else {
		treeItems.value = [...treeItems.value, ...items]
	}

	currentItem.value = null
	currentResource.value = 'custom'
	dirtyState.value = true
}

/* Action Commands */

const childActions = map(props.resources, (item, handle) => {
	return { name: item.title, action: handle }
})
childActions.push({ name: 'Custom Link', action: 'custom', divider: true })
childActions.push({ name: 'Remove Item', action: 'remove', danger: true })
childActions.push({ name: 'Change Comment Name', action: 'remove', danger: true })

const handleCommand = (command) => {
	if (command == 'custom') {
		addCustomLink()
	} else {
		selectItems(command)
	}
	currentResource.value = command
}

const addChild = (event) => {
	console.log('adding child', event)
	currentItem.value = event.item
	currentResource.value = event.action

	if (event.action == 'custom') {
		addCustomLink()
	} else {
		selectItems(event.action)
	}
}

function selectItems(handle) {
	drawer.context = 'list'
	titleField.value = props.resources[handle].titleField
	itemsUrl.value = `/resource/${handle}/items`
	drawer.state = true
}

/* Setup Item Form */
const formMode = ref('create')
const formItem =  ref({})

const newItem = {
	label: '',
	url: '',
	css: '',
	external: false,
}

const addCustomLink = () => {
	formMode.value = 'create'
	formItem.value = {...newItem}
	drawer.context = 'form'
	drawer.state = true
}

const updateItem = (item) => {
	drawer.state = false
	titleField.value = 'label'

	item.type = item.url == '' ? 'Text' : 'Link'

	if (formMode.value == 'create') {
		updateItems([item])
	}
	dirtyState.value = true
}

const editItem = (item) => {
	console.log('editing item' , item)

	formMode.value = 'edit'
	formItem.value = item
	drawer.context = 'form'
	drawer.state = true
}

/* Save Navigation */

const saveNavigation = () => {
	Inertia.post(props.actionUrl, { tree: treeItems.value })
}
</script>