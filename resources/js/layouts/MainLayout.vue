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
import { Inertia } from '@inertiajs/inertia'
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

Inertia.on('error', (data) => {
  		let errors = data.detail.errors
  		Invicta.setErrors(errors)
})

/*
	We use watch instead of triggering in event listener 
	in order to catch errors from api calls 
 */
watch(Invicta.errors, (_errors) => {
	if (_errors) {
		let offset = 0
		for (let _error in _errors) {
			Invicta.message({
				type: 'error',
				title: 'Error',
				message: _errors[_error],
				duration: 0,
				offset
			})
			offset += 70
		}
	}
})
</script>