<template>
	<main class="app-empty">
		<slot/>
	</main>
</template>

<script setup>
onMounted(() => document.body.classList.add('app-ready'))
</script>