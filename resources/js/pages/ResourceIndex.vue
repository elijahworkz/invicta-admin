<template>
	<component :is="indexComponent" :handle="handle" />
</template>

<script setup>
const props = defineProps({
	handle: String
})

const indexComponent = computed(() => {
	let folder = props.handle !== 'assets' ? 'resource' : 'assets'
	return defineAsyncComponent(() => import(`@/components/${folder}/IndexPage.vue`))
})

</script>