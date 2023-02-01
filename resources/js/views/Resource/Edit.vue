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
const props = defineProps({
	resource: Object
})
const resource = toRaw(props.resource)

// if ('id' in resource.meta && Invicta.echo) {
	let channel = `resource.${resource.meta.handle}.${resource.meta.id}`
	console.log('I see an echo and editing action', channel)
	window.Echo.channel('web-events')
		// .here(users => {
		// 	console.log('entering the editor', users)
		// })
		.listen('CommentAdded', (resource) => {
			console.log('I hear this event', resource)
		})
// }
</script>