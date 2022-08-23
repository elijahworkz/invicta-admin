<template>
	<div class="flex items-center justify-end">
		<span class="action-icon opacity-50">
			<svg width="12" viewBox="0 0 24 24"><circle cx="3" cy="12" r="3"/><circle cx="12" cy="12" r="3"/><circle cx="21" cy="12" r="3"/></svg>
		</span>
		<div class="actions-wrap">
			<div class="action-buttons flex items-center">

				<el-icon 
					v-for="action in actions"
					v-show="isShowAction(action)"
					class="action-icon button"
					@click="$emit(action, id)">
						<component :is="actionIcon(action)"/>
				</el-icon>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'

const props = defineProps({
	id: Number,
	actions: Array,
	can: Object
})

const open = ref(false)

const actionIcon = (action) => {
	switch (action) {
		case 'edit':
			return Edit
		case 'delete':
			return Delete
	}
}

const isShowAction = (action) => ! props.can || props.can[action] === undefined || props.can[action]

</script>

<style lang="scss">
.actions-wrap {
	position: absolute;
	right: 0;
	top: 0;
	bottom: 0;
	height: 100%;
	opacity: 0;
	transition: all .2s;
	padding: 0 0 0 30px;

	.hover-row  & {
		background: linear-gradient(90deg, rgba(255,255,255,0) 0%, var(--el-fill-color-light) 5%);
		opacity: 1;
	}
	.has-actions:hover & {
		background: #fff;
		opacity: 1;
	}

	.action-buttons,
	.el-button-group {
		display: flex;
		height: 100%;
		align-items: center;
	}

	.el-button--small {
		padding: 5px 8px;
	}
}
</style>