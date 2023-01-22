<template>
	<head class="app-header">
		<span class="sidebar-toggle" title="Minimize sidebar" @click="toggleSidebar">
			<SvgIcon :icon="mdiMenuOpen" />
		</span>
		<div class="app-branding">Invicta Admin</div>
		<div class="ml-auto flex items-center">
			<Impersonator v-if="$page.props.auth.impersonator" />
			<div class="font-bold mr-2 leading-0">{{ $page.props.auth.user.name }}</div>
			<el-dropdown>
				<el-button :icon="MoreFilled" size="small" text></el-button>
				<template #dropdown>
					<el-dropdown-item>
						<Link href="/admin/logout" method="post" as="button" class="text-gray-400">Logout</Link>
					</el-dropdown-item>
				</template>
			</el-dropdown>
		</div>
	</head>
</template>

<script setup>
import { mdiMenuOpen, mdiLogoutVariant } from '@mdi/js'
import { MoreFilled } from '@element-plus/icons-vue'

const toggleSidebar = () => {
	document.body.classList.toggle('sidebar-mini')
	Invicta.emit('close-sidebar-submenus')
}
</script>