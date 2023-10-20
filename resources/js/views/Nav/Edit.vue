<template>
	<Head :title="resource.meta.title || resource.meta.createTitle"/>
	<div class="py-6 px-10">
		<FormBase
			form-id="new-navigation"
			:resource="resource"
			:action-url="actionUrl"
			:breadcrumb="{url: indexUrl, text: 'Back'}"
			:post-submit-actions="['back', 'create']"
		/>
	</div>
</template>

<script setup>
defineOptions({
	beforeRouteEnter: async function (to) {
		let {data} = await Invicta.axios.get(`api${to.path}`)
		to.meta.data = data
	}
})

defineProps({
	title: String,
	resource: Object,
	indexUrl: String,
	actionUrl: String,
})
</script>