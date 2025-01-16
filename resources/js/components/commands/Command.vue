<template>
	<el-card class="command">
		<div class="flex">
			<SvgIcon :icon="command.icon" class="command-icon mr-2 opacity-50" />
			<div>
				<h3 class="text-lg">{{ command.name }}</h3>
				<p>{{ command.description }}</p>
			</div>
			<el-button 
				:type="command.dangerous ? 'danger' : 'primary'" 
				class="self-center w-32 ml-auto" 
				@click="startCommand(command)" 
				:loading="command.running">{{ command.actionButton }}</el-button>
		</div>
		<Output v-if="showOutput" :command="command" />
	</el-card>
</template>

<script setup>
const props = defineProps({
	data: Object
})

const command = reactive(props.data)

function startCommand(command) {
	command.running = true

	if (command.dangerous) {
		ElMessageBox.confirm(
			command.dangerous,
			command.name,
			{
				confirmButtonText: command.actionButton,
				cancelButtonText: 'Cancel',
				confirmButtonClass: 'el-button--danger'
			}
		).then(() => {
			runCommand(command)
		})
		.catch(() => command.running = false)
	} else {
		runCommand(command)
	}
}

function runCommand(command) {
	Invicta.axios.get(command.runUrl)
		.then(({data}) => {
			Invicta.message(data.message)
			command.running = false
			command.output = data.output
			command.error = data.error
		})
}

const showOutput = computed(() => {
	return command.output || command.error
})
</script>