<template>
	<div class="output mt-2 relative">
		<div class="terminal" :class="{'error': command.error}">
			<span class="cursor-pointer absolute top-3 right-2.5">
				<el-icon @click="reset"><Close /></el-icon>
			</span>
			<pre>{{ output }}</pre>
		</div>
	</div>
</template>

<script setup>
import { Close, Setting } from '@element-plus/icons-vue'
const props = defineProps({
	command: Object,
})

const output = computed(() => {
	return props.command.output || props.command.error
})

const reset = () => {
	delete props.command.output
	delete props.command.error
}
</script>