<template>
	{{ handle }}
	<component :is="indexComponent" :handle="handle" />
</template>

<script setup>
const props = defineProps({
	handle: String
})

console.log('I am in ResourceIndex')

const indexComponent = computed(() => {
	let folder = props.handle !== 'assets' ? 'resource' : 'assets'
	return defineAsyncComponent(() => import(`@/components/${folder}/Index.vue`))
})

</script>