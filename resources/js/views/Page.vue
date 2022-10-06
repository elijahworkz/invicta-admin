<template>
	<component :is="PageComponent" :props="$page.props" />
</template>

<script setup>
import PagePlaceholder from '@/components/shared/PagePlaceholder.vue'

const props = defineProps({
	page: String
})

const PageComponent = computed(() => {

	if (props.page && Invicta.componentExists(props.page)) {
		return Invicta.app.component(props.page)
	}
	return PagePlaceholder
})

</script>