<template>
	<slot/>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => document.body.classList.add('app-ready'))
</script>