<template>
	<div v-if="data.content != ''" class="info-panel mb-4" v-html="data.content"/>
</template>

<script setup>
defineProps({
	formId: String,
	data: Object,
	path: String
})
</script>
