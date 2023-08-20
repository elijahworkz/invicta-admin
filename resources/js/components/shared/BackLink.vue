<template>
	<Link :href="data.url" class="breadcrumb">
		<el-icon><ArrowLeft /></el-icon> {{ data.text }}
	</link>
</template>

<script setup>
import { ArrowLeft } from '@element-plus/icons-vue'
defineProps({
	data: Object
})
</script>