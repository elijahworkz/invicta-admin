<template>
	<Header/>
	<div class="app-body">
		<aside><Sidebar/></aside>
		<main>
			<slot/>
		</main>
	</div>
</template>

<script setup>
import { onMounted } from 'vue'
import Header from '@/components/layout/Header.vue'
import Sidebar from '@/components/layout/Sidebar.vue'

onMounted(() => document.body.classList.add('app-ready'))
</script>