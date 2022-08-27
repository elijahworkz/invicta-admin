<template>
	<el-link :underline="false" @click="$emit('edit', item.id)">{{ item[titleField] }}</el-link>
</template>

<script setup>
defineProps({
	item: Object,
	titleField: String
})
</script>