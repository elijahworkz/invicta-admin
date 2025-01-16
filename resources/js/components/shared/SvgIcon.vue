<template>
	<span v-if="rawSvg" v-html="icon" />
	<svg v-else
		viewBox="0 0 24 24"
		:width="width"
		:height="height"
		:style="style">
		<path fill="currentColor" :d="path" />
	</svg>
</template>

<script setup>
const props = defineProps({
	icon: String,
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
})

const rawSvg = props.icon && props.icon.includes('viewBox')
const defaultSvg = 'M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z'

const path = props.icon ? props.icon : defaultSvg
</script>