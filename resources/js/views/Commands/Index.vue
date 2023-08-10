<template>
	<Head title="Cache"/>
	<div class="py-6 px-10 max-w-5xl mx-auto">
		<div class="mb-4">
			<h1>Registered Commands</h1>
			<p class="info">List of registered artisan, or shell commands</p>
		</div>

		<el-card v-for="command in commands" class="mb-4 command">
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
			<div class="details mt-2" v-if="command.output">
				<div class="terminal">{{ command.output }}</div>
			</div>
		</el-card>
	</div>
</template>

<script setup>
defineProps({
	commands: Object,
})

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
		})
}
</script>

<style lang="scss">
.command {
	svg {
		width: 24px;
	}
}
.details {
	.terminal {
		background: #313f46;
		color: #e6e6e6;
		border-radius: 6px;
		padding: 10px;
	}
}
</style>