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
import { usePage, router } from '@inertiajs/vue3'

onMounted(() => document.body.classList.add('app-ready'))

const notification = computed(() => usePage().props.flash.message)

watch(notification, (value) => {
	if (value) {
		Invicta.message({
			type: 'type' in value ? value.type : 'info',
			title: 'title' in value ? value.title : null,
			message: 'message' in value ? value.message : null
		})
	}
})

router.on('error', (data) => {
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