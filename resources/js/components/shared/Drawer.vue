<template>
	<Teleport to="#drawer">
		<transition
			enter-active-class="transition ease-out duration-200 transform "
			enter-from-class="opacity-0"
			enter-to-class="opacity-100"
			leave-active-class="ease-in duration-200"
			leave-from-class="opacity-100"
			leave-to-class="opacity-0"
		>
			<div class="overlay">

				<div class="content" ref="drawerBody">
					<slot/>
				</div>
			</div>
		</transition>
	</Teleport>
</template>

<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

defineProps({
	show: Boolean
})

const emit = defineEmits(['close'])

const drawerBody = ref(null)

onClickOutside(drawerBody, (event) => {
	// console.log(event)
	emit('close', true)
})
</script>

<style lang="scss">

</style>