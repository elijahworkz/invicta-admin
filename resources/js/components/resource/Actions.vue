<template>
	<el-dropdown trigger="click" @command="handleCommand" class="mr-2">
		<el-button size="large">
			{{ name }} <el-icon class="el-icon--right"><ArrowDown /></el-icon>
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
import { ArrowDown } from '@element-plus/icons-vue'

const props = defineProps({
	name: {
		type: String,
		default: 'Actions'
	},
	global: {
		type: Boolean,
		default: false,
	},
	actions: Array,
	selected: {
		type: Array,
		default: []
	},
})

const handleCommand = (command) => {
	console.log('have command', command)

	let actionData = {
		action: command,
		selected: props.selected.length ? props.selected : []
	}

	Invicta.emit('action-called', actionData)
}
</script>