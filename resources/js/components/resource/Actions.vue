<template>
	<el-dropdown trigger="click" @command="handleCommand" class="mr-2">
		<el-button>
			Actions <el-icon class="el-icon--right"><ArrowDown /></el-icon>
		</el-button>
		<template #dropdown>
			<el-dropdown-item
				v-for="action in actions"
				:command="action">
				{{ action }}
			</el-dropdown-item>
		</template>
	</el-dropdown>
	<el-dialog
		v-model="actionModal"
		:title="actionName">
		Are you sure you want to run this action?
		<template #footer>
				<el-button @click="actionModal = false">Cancel</el-button>
				<el-button type="primary" @click="actionModal = false">Run Action</el-button>
		</template>
	</el-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'

const props = defineProps({
	actions: Array,
	rows: Array,
	actionsUrl: String
})

const actionModal = ref(false)
const actionName = ref('Action')

const ids = computed(() => {
	return props.rows.map(row => row.id)
})

const handleCommand = (command) => {
	actionModal.value = true
	actionName.value = command.name
	console.log('have command', command)

}

const processAction = (actionClass) => {
	let data = {
		class: actionClass,
		ids,
		fields
	}
	Invicta.axios.post(actionsUrl, data)
}
</script>