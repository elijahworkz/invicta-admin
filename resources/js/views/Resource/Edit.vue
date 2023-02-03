<template>
	<Head :title="resource.meta.pageTitle"/>
	<div class="py-6 px-10">
		<FormBase
			:key="resource.meta?.id || 'new'"
			:form-id="formId"
			:resource="resource"
			:action-url="resource.meta.actionUrl"
			:breadcrumb="{ url: resource.meta.indexUrl, text: resource.meta.indexTitle }"
			:read-only="readOnly">
		</FormBase>
	</div>
</template>

<script setup>
const props = defineProps({
	resource: Object
})

const user = usePage().props.auth.user
const activeUsers = ref([])


const resource = toRaw(props.resource)
const channel = computed(() => {
	return `resource.${props.resource.meta.handle}.${props.resource.meta.id}`
})

const formId = `${resource.meta.handle}.${resource.meta?.id || 'new'}`
// const formKey = computed(() => {
// 	let key = resource.meta?.id || 'new'
// 	return `${key}-${activeUsers.value.length}`
// })
const readOnly = false
// const readOnly = computed(() => {
// 	return false //activeUsers.value.length > 1 && activeUsers.value[0].id !== user.id
// })



</script>