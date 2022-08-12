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
import { ref, onMounted, computed, watch } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-vue3'
import Loading from '@/components/shared/Loading.vue'
import Header from '@/components/app/Header.vue'
import Sidebar from '@/components/app/Sidebar.vue'

onMounted(() => document.body.classList.add('app-ready'))

const notification = computed(() => usePage().props.value.flash.message)

watch(notification, (value) => {
	if (value) {
		Invicta.message({
			type: 'type' in value ? value.type : 'info',
			title: 'title' in value ? value.title : null,
			message: 'message' in value ? value.message : null
		})
	}
})

const loading = ref(false)

// const user = Invicta.getConfig('auth')
Inertia.on('start', () => {
	loading.value = true
})

Inertia.on('finish', () => {
	loading.value = false
})
</script>