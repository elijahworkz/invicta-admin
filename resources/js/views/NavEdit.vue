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
import FormBase from '@/components/form/FormBase.vue'

defineProps({
	title: String,
	resource: Object,
	indexUrl: String,
	actionUrl: String,
})
</script>