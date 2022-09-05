<template>
	<popover class="actions-popover">
		<template #trigger>
			<span title="More actions" class="action-icon">
				<SvgIcon :icon="mdiDotsHorizontal" :width="18" />
			</span>
		</template>
		<template #default><slot /></template>
	</popover>
</template>

<script setup>
import Popover from '@/components/shared/Popover.vue'
import { mdiDotsHorizontal } from '@mdi/js'

defineProps({
	disabled: {
		type: Boolean,
		default: false,
	},
	placement: {
		type: String,
		default: 'bottom-end'
	},
	scroll: {
		type: Boolean,
		default: false
	}
})
</script>