<template>
	<Header/>
	<div class="app-body">
		<aside class="app-sidebar"><Sidebar/></aside>
		<main class="app-main">
			<el-scrollbar>
				<slot/>
			</el-scrollbar>
		</main>
	</div>
</template>

<script setup>
import { onMounted } from 'vue'
import Header from '@/components/app/Header.vue'
import Sidebar from '@/components/app/Sidebar.vue'

onMounted(() => document.body.classList.add('app-ready'))

const user = Invicta.getConfig('auth')
</script>