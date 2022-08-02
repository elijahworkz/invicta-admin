<template>
	<Header/>
	<div class="app-body">
	<aside class="app-sidebar"><Sidebar/></aside>
	<main class="app-main">
		<!-- <div v-if="loading" class="flex items-center justify-center h-full"><Loading/></div> -->
		<el-scrollbar>
			<slot/>
		</el-scrollbar>
	</main>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import Loading from '@/components/shared/Loading.vue'
import Header from '@/components/app/Header.vue'
import Sidebar from '@/components/app/Sidebar.vue'

onMounted(() => document.body.classList.add('app-ready'))

const loading = ref(false)

// const user = Invicta.getConfig('auth')
Inertia.on('start', () => {
	loading.value = true
})

Inertia.on('finish', () => {
	loading.value = false
})
</script>