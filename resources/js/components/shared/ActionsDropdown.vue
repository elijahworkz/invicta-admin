<template>
	<div class="actions flex items-center">
		<el-popover
			ref="actionsDropdown"
			v-if="actions.length"
			trigger="click"
			popper-class="actions-popover">
			<template #reference>
				<span title="More actions" class="action-icon">
					<SvgIcon :icon="mdiDotsHorizontal" :width="18" />
				</span>
			</template>
			<template #default>
				<ul>
					<template v-for="action in actions">
						<li @click="handleActionClick(action)" 
							class="el-dropdown-menu__item"
							:class="action.class">
							{{ action.name }}
						</li>
						<li v-if="action.divider" class="divider"></li>
					</template>
				</ul>
			</template>
		</el-popover>
	</div>
</template>

<script setup>
import { ref, unref } from 'vue'
import { mdiDotsHorizontal } from '@mdi/js'
const props = defineProps({
	actions: Array,
	item: Number | Object
})
const emit = defineEmits(['selected'])
const actionsDropdown = ref()

const handleActionClick = (event) => {
	unref(actionsDropdown).hide()

	emit('selected', { action: event.action, item: props.item })
}
</script>