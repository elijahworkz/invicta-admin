<template>
	<Teleport to="#drawer">
		<transition name="drawer">
		<div class="overlay" v-show="show">

				<div class="content" ref="drawerBody">
					<slot/>
				</div>
			</div>
		</transition>
	</Teleport>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onClickOutside } from '@vueuse/core'

const emit = defineEmits(['close'])

const show = ref(false)
const drawerBody = ref(null)

onMounted(() => show.value = true)

onClickOutside(drawerBody, (event) => {
	// console.log(event)
	emit('close', true)
})
</script>

<style lang="scss">

</style>