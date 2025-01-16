<template>
	<div v-for="item in items" :style="{'padding-left': 18 * (depth -1) + 'px'}">
		<el-checkbox 
			v-model="item.checked"
			:name="item.value"
			:disabled="disabled" 
			:value="item.value">
			{{ item.label }}
		</el-checkbox>
		<CheckTree
			v-if="item.children && item.children.length"
			:depth="depth + 1"
			:initial-items="item.children"
			:disabled="!item.checked"
		/>
	</div>
</template>

<script setup>
const props = defineProps({
	initialItems: Array,
	disabled: Boolean,
	depth: Number
})

const items = ref(props.initialItems)

watch(() => props.disabled, (disabled) => {
	if (disabled) {
		items.value.map(item => item.checked = false)
	}
})
</script>