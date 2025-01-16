<template>
	<div class="pulse" v-if="type == 'text'">{{ text }}</div>
	<div class="spinner" v-if="type == 'spinner'"></div>
</template>

<script setup>
defineProps({
	type: {
		type: String,
		default: 'text',
	},
	text: {
		type: String,
		default: 'loading data...'
	}
})
</script>

<style lang="scss">
.spinner {
    margin: 0px auto;
    position: relative;
    text-indent: -9999em;
    border-top: 2px solid var(--el-border-color-light);
    border-right: 2px solid var(--el-border-color-light);
    border-bottom: 2px solid var(--el-border-color-light);
    border-left: 2px solid var(--el-color-primary);
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: button-spin 1.1s infinite linear;
    animation: button-spin 1.1s infinite linear;
}

.spinner,
.spinner:after {
    border-radius: 50%;
    width: 20px;
    height: 20px;
}

@keyframes button-spin {
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
}
</style>