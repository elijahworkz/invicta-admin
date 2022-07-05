<template>
	<div class="app-body">
		<main>
			<slot/>
		</main>
	</div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => document.body.classList.add('app-ready'))
</script>