<template>
	<Head :title="resource.meta.pageTitle"/>
	<div class="py-6 px-10">
		<FormBase
			:key="resource.meta?.id || 'new'"
			:form-id="`${resource.meta.handle}.${resource.meta?.id || 'new'}`"
			:resource="resource"
			:action-url="resource.meta.actionUrl"
			:breadcrumb="{ url: resource.meta.indexUrl, text: resource.meta.indexTitle }">
		</FormBase>
	</div>
</template>

<script setup>
defineProps({
	resource: Object
})
</script>