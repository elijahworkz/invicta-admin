<template>
	<MainLayout>
		<router-view></router-view>
	</MainLayout>
</template>

<script setup>
import MainLayout from '@/layouts/MainLayout.vue'

onMounted(() => {
	document.body.classList.add('app-ready')
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
				duration: 5000,
				offset
			})
			offset += 80
		}
	}
})

</script>