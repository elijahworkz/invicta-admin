<template>
	<router-link :to="data" class="breadcrumb">
		<el-icon><ArrowLeft /></el-icon> {{ data.text }}
	</router-link>
</template>

<script setup>
import { ArrowLeft } from '@element-plus/icons-vue'
defineProps({
	data: Object
})
</script>