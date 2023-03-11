<template>
	<Head title="Invicta Admin"/>
	<div class="py-6 px-10">
		<h1>Welcome, {{ user }}</h1>
	</div>
</template>

<script setup>
const user = Invicta.user.name
</script>