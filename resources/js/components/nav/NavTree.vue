<template>
	<draggable
		:list="list"
		tag="ul"
		:group="{ name: 'g1'}"
		item-key="label">

		<template #item="{ element, index }">
			<li>
				<div class="item flex items-center justify-start border rounded bg-white mb-1 p-2">
					<DragHandle class="mr-2 text-gray-300 hover:text-gray-400" />
					{{ element.label }}
					<div class="ml-auto item-type">{{ element.type }}</div>

					<ActionsDropdown :actions="actions" :item="index" @selected="handleAction" class="ml-3" />
				</div>

				<NavTree :list="element.children" />
			</li>
		</template>
	</draggable>
</template>

<script setup>
import { ref } from 'vue'
import draggable from 'vuedraggable'
import DragHandle from '@/components/shared/DragHandle.vue'
import ActionsDropdown from '@/components/shared/ActionsDropdown.vue'

const props = defineProps({
	list: Array
})

/* Menu Items actions */
const actions = [
	{ name: 'Add Child Item', action: 'addChild' },
	{ name: 'Remove Item', action: 'remove' },
]

const handleAction = (event) => {
	console.log('got event', event)

	if (event.action == 'addChild') {
		// handleEdit()
	}

	if (event.action == 'remove') {
		props.list.splice(event.item, 1)
	}
}

</script>

<style lang="scss">
ul {
	> li > ul {
		margin-left: 25px;
	}

	.item-type {
		text-transform: uppercase;
		opacity: .5;
		font-size: 10px;
	}
}
</style>