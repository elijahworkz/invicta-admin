<template>
	<el-link v-if="canEdit" 
		:underline="false" 
		class="px-2" 
		@click="$emit('edit', item.id)">{{ item[titleField] }}</el-link>
	<div v-else class="px-2">{{ item[titleField] }}</div>
</template>

<script setup>
defineProps({
	item: Object,
	titleField: String,
	canEdit: Boolean
})
</script>