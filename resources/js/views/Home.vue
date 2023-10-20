<template>
	<div class="py-6 px-10">
		<h1>Welcome, {{ user }}</h1>
	</div>
</template>

<script setup>
Invicta.pageTitle('Home')
const user = Invicta.user.name
</script>