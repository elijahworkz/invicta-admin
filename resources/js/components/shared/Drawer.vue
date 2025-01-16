<template>
	<Teleport to="#drawer">
		<transition name="drawer">
			<div class="overlay" v-show="show" :id="id">
				<div class="content" ref="drawerBody" :style="style">
					<slot/>
				</div>
			</div>
		</transition>
	</Teleport>
</template>

<script setup>
// import { onClickOutside } from '@vueuse/core'

defineProps({
	style: Object
})
const emit = defineEmits(['close'])

const show = ref(false)
const drawerBody = ref(null)

const id = ref()

onMounted(() => {
	id.value = uniqueId('stack-')
	show.value = true
})

onClickOutside(drawerBody, (event) => {

	if (event.target.id == id.value) {
		emit('close', true)
	}
})
</script>