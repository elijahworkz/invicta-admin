<template>
	<div v-for="item in items">
		<el-checkbox v-model="item.checked" :disabled="disabled" :value="item.value">{{ item.label }}</el-checkbox>
		<CheckTree
			v-if="item.children && item.children.length"
			:depth="depth + 1"
			:initial-items="item.children"
			:disabled="!item.checked" 
		/>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ICheckTree } from '@/interfaces'

const props = defineProps<{
	initialItems: ICheckTree[],
	disabled: boolean,
	depth: number
}>()

const items = ref<ICheckTree[]>(props.initialItems)

watch(() => props.disabled, (disabled) => {
	if (disabled) {
		items.value.map(item => item.checked = false)
	}
})
</script>