<template>
	<div v-if="data.content != ''" class="info-panel" v-html="data.content"/>
</template>

<script setup>
defineProps({
	formId: String,
	data: Object,
	path: String
})
</script>
