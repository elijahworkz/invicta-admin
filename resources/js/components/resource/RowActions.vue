<template>
	<div class="actions flex items-center justify-end">
		<el-popover placement="bottom-end" trigger="click" v-if="actions.length" popper-class="actions-popover">
			<template #reference>
				<span title="More actions" class="action-icon">
					<SvgIcon :icon="mdiDotsHorizontal" :width="18" />
				</span>
			</template>
			<template #default>
				<ul>
					<li v-for="action in actions" @click="handleAction(action)" class="el-dropdown-menu__item">{{ action.name }}</li>
				</ul>
			</template>
		</el-popover>			

		<span class="action-icon" @click="$emit('edit', id)" title="Edit Item"><Edit /></span>
		<span class="action-icon" @click="$emit('delete', [id])" title="Delete Item"><Delete /></span>

	</div>
</template>

<script setup>
import { ref } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import { mdiDotsHorizontal } from '@mdi/js'

const props = defineProps({
	id: Number,
	actions: Array
})

const handleAction = (action) => {
	Invicta.emit('show-action-modal', { action, selected: [props.id] })
}
</script>

<style lang="scss">
.actions-popover {
	padding: 0 !important;

	.el-dropdown-menu__item {

		&:hover {
			background-color: var(--el-color-primary-light-9);
		    color: var(--el-color-primary);
		}
	}
}
</style>

