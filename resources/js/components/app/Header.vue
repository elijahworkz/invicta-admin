<template>
	<head class="app-header">
		<span class="sidebar-toggle" title="Minimize sidebar" @click="toggleSidebar">
			<SvgIcon :icon="mdiMenuOpen" />
		</span>
		<div class="app-branding">Invicta Admin</div>
		<div class="ml-auto flex items-center">
			<Impersonator v-if="$page.props.auth.impersonator" />
			<div class="font-bold mr-2">{{ $page.props.auth.user.name }}</div>
			<el-tooltip content="Logout">
			<Link href="/admin/logout" method="post" as="button">Logout</Link>
			</el-tooltip>
		</div>
	</head>
</template>

<script setup>
import { mdiMenuOpen } from '@mdi/js'
import Impersonator from './partials/Impersonator.vue'

const toggleSidebar = () => {
	document.body.classList.toggle('sidebar-mini')
	Invicta.emit('close-sidebar-submenus')
}
</script>