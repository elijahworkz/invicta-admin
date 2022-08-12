<template>
	<Head :title="resource.name"/>
	<div class="py-6 px-10">
		<FormBase
			:form-id="`${resource.meta.handle}.${resource.meta.id}`"
			:resource="resource"
			:action-url="resource.meta.actionUrl"
			:breadcrumb="{ url: resource.meta.indexUrl, text: resource.meta.indexTitle }"
		/>
	</div>
</template>

<script setup>
import FormBase from '@/components/form/FormBase.vue'

defineProps({
	resource: Object
})


</script>