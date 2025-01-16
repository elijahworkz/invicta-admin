<template>
	<draggable
		:list="list"
		:disabled="!sortable"
		:animation="150"
		handle=".drag-handle"
		item-key="index"
		class="items-stack w-full"
		@change="$emit('updated', list)">
		<template #item="{element, index}">
			<div class="item flex items-center justify-start mb-2 border rounded">
				<DragHandle v-if="sortable" class="text-gray-300 hover:text-gray-400 mr-1"/>

				<component
					:is="ItemListComponent"
					:item="element"
					:index="index"
					:title-field="titleField"
					:can-edit="canEditItem"
					@edit="handleEditItem"
					class="ml-1"
				/>

				<div class="ml-auto flex items-center">
					<span v-if="element.locale" class="mr-2 text-gray-400">{{ element.locale }}</span>

					<span v-if="options.addItems" class="action-icon" title="Remove Item">
						<SvgIcon
							:icon="mdiLinkOff"
							@click="removeRow(element.id)"
							:width="16" />
					</span>
				</div>
			</div>
		</template>
		<template #footer>
			<div class="flex mt-4">
	   	 		<el-button v-if="canCreateItem" type="primary" text bg size="small" @click="handleCreateItem">
	   	 			<SvgIcon :icon="mdiLinkPlus" :width="15" class="mr-1" /> Create new
	   	 		</el-button>
	   	 		<el-button v-if="options.addItems" type="primary" text bg size="small" @click="handleAddItem">
		   	 		<SvgIcon :icon="mdiLink" :width="15" class="mr-1" /> Add existing
		   	 	</el-button>
	   	 	</div>
  		</template>
	</draggable>

	<Drawer v-if="drawer.state" @close="drawer.state = false">
		<ItemsSelector
			v-if="drawer.context == 'list'"
			:exclude="excludeItems"
			:resource-handle="resource"
			:request-url="itemsUrl"
			:title-field="titleField"
			:select="select"
			:where="where"
			@selected="updateItems"
			@cancel="drawer.state = false" />

		<ItemsForm
			v-if="drawer.context == 'form'"
			:request-url="formUrl"
			:create-with="populateWith"
			@cancel="drawer.state = false"
			@submit="drawer.state = false" />
	</Drawer>
</template>

<script setup>
import draggable from 'vuedraggable'
import ItemListItem from './ItemListItem.vue'
import { mdiLink, mdiLinkOff, mdiLinkPlus,  } from '@mdi/js'

const props = defineProps({
	list: {
		type: Array,
		default: [],
		required: true
	},
	itemsUrl: String,
	fieldData: Object,
	resource: String,
	itemId: Number,
	sortable: Boolean,
	editable: {
		type: Boolean,
		default: false,
	},
	options: {
		type: Object,
		default: () => {
			return {addItems: false, createItems: true}
		}
	},
	select: {
		type: Array,
		default: [],
	},
	where: String
})
const emit = defineEmits(['updated', 'form-submitted'])

const baseRequestUrl = `api/resource/${props.resource}`
const drawer = reactive({
	state: false,
	context: 'list'
})

const canCreateItem = computed(() => props.options.createItems && Invicta.can(`create ${props.resource}`))
const canEditItem = props.editable && Invicta.can(`edit ${props.resource}`)

const titleField = 'titleField' in props.fieldData ? props.fieldData.titleField : 'title'

const ItemListComponent = computed(() => {

	if (props.fieldData.itemComponent && Invicta.componentExists(props.fieldData.itemComponent)) {
		return props.fieldData.itemComponent
	}
	return ItemListItem
})

const excludeItems = computed(() => {
	return props.list.map(item => {
		return item.id
	})
})

function removeRow(id) {
	props.list.splice(props.list.findIndex(i => i.id == id), 1)
	emit('updated', props.list)
}

const updateItems = (selected) => {
	drawer.state = false

	let cloneList = toRaw(props.list)
	let cloneSelected = toRaw(selected)

	let updated = [...cloneList, ...cloneSelected]
	emit('updated', updated)
}

/* Handle Drawer Actions */
const formUrl = ref('')

const handleEditItem = (item) => {
	drawer.context = 'form'
	drawer.state = true

	formUrl.value = `${baseRequestUrl}/${item}/edit`
}

const handleAddItem = () => {
	drawer.context = 'list'
	drawer.state = true
}

const populateWith = computed(() => {
	if ('createWith' in props.fieldData) {
		let createWith = props.fieldData.createWith
		let field = (typeof createWith === 'object')
			? createWith.field
			: createWith

		let value = props.itemId

		if (typeof createWith === 'object') {
			value = 'multiple' in createwith && createWith.multiple
				? [{ id: props.itemId }]
				: { id: props.itemId }
		}

		return {
			field,
			value
		}
	}
	
	return null
})

const handleCreateItem = () => {
	drawer.context = 'form'
	drawer.state = true

	formUrl.value = `${baseRequestUrl}/create`
}
</script>

<style lang="scss">
[draggable=true] {
	border-color: var(--el-color-primary-light-7);
	color: var(--el-color-primary-light-3);
}
.items-stack {
	.item {
		line-height: 1.5;
		padding: 5px;
	}
}
</style>