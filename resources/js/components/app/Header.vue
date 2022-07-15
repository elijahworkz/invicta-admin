<template>
	<head class="app-header">
		<span class="sidebar-toggle" title="Minimize sidebar" @click="toggleSidebar">
			<!-- <el-icon><DArrowLeft /></el-icon> -->
			<!-- <el-icon><Menu /></el-icon> -->
			<SvgIcon :icon="mdiMenuOpen" />
		</span>
		<div class="app-branding">Invicta Admin</div>
		<div class="ml-auto">
			<Link href="/admin/logout" method="post" as="button">Logout</Link>
		</div>
	</head>
</template>

<script setup>
import { DArrowLeft, Menu } from '@element-plus/icons-vue'
import { mdiChevronDoubleLeft, mdiMenuOpen } from '@mdi/js';
const toggleSidebar = () => {
	document.body.classList.toggle('sidebar-mini')
	Invicta.emit('close-sidebar-submenus')
}
</script>

<style lang="scss">

</style>