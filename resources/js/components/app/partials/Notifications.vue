<template>
	<div class="pr-3 mr-3 notifications" :class="{'empty': !notifications.length}" @click="drawer = true">
		<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 21H14C14 22.1 13.1 23 12 23S10 22.1 10 21M21 19V20H3V19L5 17V11C5 7.9 7 5.2 10 4.3V4C10 2.9 10.9 2 12 2S14 2.9 14 4V4.3C17 5.2 19 7.9 19 11V17L21 19M17 11C17 8.2 14.8 6 12 6S7 8.2 7 11V18H17V11Z" fill="currentColor" /></svg>
		<span class="active"></span>
	</div>

	<Drawer v-if="drawer" @close="drawer = false" :style="{width: '30%'}">
		<div class="w-full flex flex-col notifications-list">
			<header class="flex justify-between p-2 bg-white">
				<h1>Notifications</h1>

				<el-button text bg circle @click="drawer = false" :icon="Close"/>
			</header>
			<main v-if="notifications.length">
				<div class="text-right">Mark all as read</div>
				<el-scrollbar v-if="notifications.length">
					<div v-for="notification in notifications">
						{{ notification }}
					</div>
				</el-scrollbar>

			</main>
			<div v-else class="p-3">You have no notifications</div>
		</div>
	</Drawer>
</template>

<script setup>
import { Close } from '@element-plus/icons-vue'

const notifications = [] //usePage().props.notifications
const drawer = ref(false)

</script>

<style lang="scss">
.notifications {
	border-right: 1px solid var(--el-border-color);
	position: relative;

	.active {
		display: block;
		width: 10px;
		height: 10px;
		position: absolute;
		top: 1px;
		right: 13px;
		border-radius: 20px;
		background: var(--el-color-danger);
		border: 2px solid #fff;
	}

	&.empty {

		.active {
			display: none;
		}

		svg {
			opacity: .6;
		}
	}
}
</style>