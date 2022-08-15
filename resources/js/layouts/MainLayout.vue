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
import { onMounted, computed, watch } from 'vue'
import { usePage } from '@inertiajs/inertia-vue3'
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
</script>