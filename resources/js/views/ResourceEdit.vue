<template>
	<Head :title="resource.meta.pageTitle"/>
	<div class="py-6 px-10">
		<FormBase
			:form-id="`${resource.meta.handle}.${resource.meta?.id || 'new'}`"
			:resource="resource"
			:action-url="resource.meta.actionUrl"
			:breadcrumb="{ url: resource.meta.indexUrl, text: resource.meta.indexTitle }">
		</FormBase>
	</div>
</template>

<script setup>
import FormBase from '@/components/form/FormBase.vue'

defineProps({
	resource: Object
})
</script>