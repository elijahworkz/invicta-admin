<template>
	<head class="app-header">
		<span class="sidebar-toggle" title="Minimize sidebar">
			<SvgIcon :icon="mdiChevronDoubleLeft" @click="toggleSidebar"/>
		</span>
		<div class="app-branding">Invicta Admin</div>
		<div class="ml-auto">
			<Link href="/admin/logout" method="post" as="button">Logout</Link>
		</div>
	</head>
</template>

<script setup>
import { mdiChevronDoubleLeft } from '@mdi/js';
const toggleSidebar = () => document.body.classList.toggle('sidebar-mini')
</script>

<style lang="scss">
.sidebar-toggle {
	opacity: .5;
	cursor: pointer;
	margin-left: -5px;
	margin-right: 8px;

	svg {
		transition: all .2s;

		.sidebar-mini & {
			transform: rotate(180deg);
		}
	}
}
</style>