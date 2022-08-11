<template>
	<head class="app-header">
		<span class="sidebar-toggle" title="Minimize sidebar" @click="toggleSidebar">
			<SvgIcon :icon="mdiMenuOpen" />
		</span>
		<div class="app-branding">Invicta Admin</div>
		{{ $page.props.flash.message }}
		<div class="ml-auto">
			<Link href="/admin/logout" method="post" as="button">Logout</Link>
		</div>
	</head>
</template>

<script setup>
import { mdiMenuOpen } from '@mdi/js';
const toggleSidebar = () => {
	document.body.classList.toggle('sidebar-mini')
	Invicta.emit('close-sidebar-submenus')
}
</script>