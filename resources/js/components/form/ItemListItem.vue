<template>
	<el-link :underline="false" class="px-2" @click="$emit('edit', item.id)">{{ item[titleField] }}</el-link>
</template>

<script setup>
defineProps({
	item: Object,
	titleField: String
})
</script>