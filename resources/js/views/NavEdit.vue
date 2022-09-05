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

					<el-button type="primary">Save Changes</el-button>
				</div>
			</div>

			<NavTree :list="treeItems" :child-actions="childActions" @add-child="addChild" />

		</div>
	</div>

	<Drawer v-if="drawer.state" :style="{ width: '400px' }" @close="drawer.state = false">
		<ItemsSelector
			v-if="drawer.context == 'list'"
			:columns="{ title: { label: 'Title', sortable: true }}"
			:exclude="excludeItems[currentResource]"
			:request-url="itemsUrl"
			:title-field="titleField"
			:nav-items="true"
			:resource-handle="currentResource"
			@update="updateItems" 
			@cancel="drawer.state = false" />

<!-- 		<ItemsForm
			v-if="drawer.context == 'form'"
			:request-url="formUrl"
			:create-with="populateWith"
			@cancel="drawer.state = false" /> -->
	</Drawer>	
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import NavTree from '@/components/nav/NavTree.vue'
import ItemsSelector from '@/components/form/ItemsSelector.vue'
import map from 'lodash/map'
import { ArrowLeft, ArrowDown } from '@element-plus/icons-vue'

const props = defineProps({
	indexUrl: String,
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
		if (item.id == currentItem.value.id && item.handle == currentItem.value.handle) {
			item.children.push(...items)
		} else if (item.children.length) {
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
			id: item.id,
			handle: currentResource.value,
			type: props.resources[currentResource.value].title, 
			children: [] 
		}
	})

	if (currentItem.value) {
		treeItems.value = updateChildItems(treeItems.value, items)
	} else {
		treeItems.value = [...treeItems.value, ...items]
	}

	currentItem.value = null
	currentResource.value = 'link'
}

/* Action Commands */

const childActions = map(props.resources, (item, handle) => {
	return { name: item.title, action: handle }
})
childActions.push({ name: 'Custom Link', action: 'link', divider: true })
childActions.push({ name: 'Remove Item', action: 'remove', class: '!text-red-600' })

const handleCommand = (command) => {
	if (command == 'link') {
		drawer.context = 'form'
		drawer.state = true
	} else {
		selectItems(command)
	}
	currentResource.value = command
}

const addChild = (event) => {
	console.log('adding child', event)
	currentItem.value = event.item
	currentResource.value = event.action
	selectItems(event.action)
}

function selectItems(handle) {
	drawer.context = 'list'
	titleField.value = props.resources[handle].titleField
	itemsUrl.value = `/resource/${handle}/items`
	drawer.state = true
}
</script>