<template>
	<div class="flex items-center justify-end">
		<span class="action-icon opacity-50">
			<svg width="12" viewBox="0 0 24 24"><circle cx="3" cy="12" r="3"/><circle cx="12" cy="12" r="3"/><circle cx="21" cy="12" r="3"/></svg>
		</span>
		<div class="actions-wrap">
			<div class="action-buttons flex items-center">
				<el-icon 
					v-for="action in actions"
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

defineProps({
	id: Number,
	actions: Array
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
</script>