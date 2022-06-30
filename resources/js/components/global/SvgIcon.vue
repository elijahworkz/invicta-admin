<template>
	<component :is="icon" :width="width" :height="height" :style="style" />
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue'

const props = defineProps({
	name: {
		type: String,
		default: 'question'
	},
	thin: {
		type: Boolean,
		default: false
	},
	width: {
		type: Number,
		default: 24
	},
	height: {
		type: Number,
		default: 24	
	},
	style: {
		type: Object,
		default: () => {} // eslint-disable-line no-unused-labels
	}
});

const name = props.thin ? `thinline/${props.name}` : props.name
const icon = computed(() => defineAsyncComponent(() => import(`../../assets/icons/${name}.svg`))).value
</script>