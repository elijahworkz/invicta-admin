<template>
	<div class="py-6 px-10">
		<FormBase
			form-id="new-navigation"
			:resource="resource"
			:action-url="actionUrl"
			:breadcrumb="{name: 'navIndex', text: 'Back'}"
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

const props = defineProps({
	title: String,
	resource: Object,
	indexUrl: String,
	actionUrl: String,
})

Invicta.pageTitle(props.title)
</script>