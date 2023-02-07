<template>
	<span v-if="data" class="badge" :class="badgeType">{{ badgeContent }}</span>
</template>

<script setup>
const props = defineProps({
	data: {
		type: Object,
		default: () => ({
			content: null,
			event: null
		})
	}
})

let badgeContent = props.data?.content || null
let badgeType = props.data?.type || 'info'

if (window.Echo && props.data?.event) {
	window.Echo.private('invicta-admin')
		.listen(props.data.event, (event) => {
			console.log('I got this message', event)
			badgeContent = badgeContent + 1

			if (typeof event == 'object' && 'message' in event) {
				Invicta.message({
					type: 'info',
					title: event.message,
				})
			}
		})
}
</script>