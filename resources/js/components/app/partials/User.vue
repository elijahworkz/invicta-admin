<template>
	<div class="user flex items-center">
		<span class="avatar">
			{{ $page.props.auth.user.initials }}
		</span>
		<div class="font-bold mr-2 leading-0">
			{{ $page.props.auth.user.name }}
		</div>
	</div>
</template>

<script setup>
const user = usePage().props.auth.user
const userAvatar = ref()
const textColor = ref()

userAvatar.value = user.data?.avatar 
	? `url(${user.data.avatar.src})`
	: 'var(--el-color-primary-dark-2)'

textColor.value = user.data?.avatar
	? 'transparent'
	: '#fff'
</script>

<style lang="scss">
.user {
	gap: 10px;

	.avatar {
		background: v-bind('userAvatar') no-repeat center;
		background-size: cover;
		border-radius: 50%;
		color: v-bind('textColor');
		line-height: 30px;
		width: 30px;
		text-align: center;
		font-size: 12px;
		font-weight: 600;

		img {
			max-width: 100%;
		}
	}
}
</style>