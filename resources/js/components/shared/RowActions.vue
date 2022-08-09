<template>
	<div class="flex items-center justify-end">
		<span class="action-icon opacity-50">
			<svg width="12" viewBox="0 0 24 24"><circle cx="3" cy="12" r="3"/><circle cx="12" cy="12" r="3"/><circle cx="21" cy="12" r="3"/></svg>
		</span>
		<div class="actions-wrap">
			<div class="action-buttons flex items-center">
				<el-icon class="action-icon button" @click="$emit('edit', id)"><Edit/></el-icon>
				<el-icon class="action-icon button" @click="$emit('delete', id)"><Delete/></el-icon>
<!-- 				<el-button-group size="small">
					<el-button text :icon="Edit" title="Edit" @click="$emit('action', { action: 'edit', id })" />
					<el-button text :icon="Delete" title="Delete" @click="$emit('action', { action: 'delete', id })"/>
				</el-button-group> -->
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'

defineProps({
	id: Number
})

const open = ref(false)
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