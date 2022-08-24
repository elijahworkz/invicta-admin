<template>
	<el-dropdown trigger="click" @command="handleCommand" class="mr-2">
		<el-button>
			Actions <el-icon class="el-icon--right"><ArrowDown /></el-icon>
		</el-button>
		<template #dropdown>
			<el-dropdown-item
				v-for="action in actions"
				:command="action">
				{{ action.name }}
			</el-dropdown-item>
		</template>
	</el-dropdown>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'

const props = defineProps({
	actions: Array,
	selected: Array
})

const handleCommand = (command) => {
	console.log('have command', command)
	Invicta.emit('show-action-modal', { action: command, selected: props.selected })
}
</script>