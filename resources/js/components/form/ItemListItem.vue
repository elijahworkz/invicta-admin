<template>
	<div class="px-2">{{ item[titleField] }}</div>
</template>

<script setup>
defineProps({
	item: Object,
	titleField: String
})
</script>