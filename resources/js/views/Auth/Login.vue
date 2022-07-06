<template>
	<Head title="Login"/>
	
	<el-form
		ref="loginForm"
		:model="form"
		:rules="rules"
		label-position="top"
		status-icon
	>
		<el-form-item label="Email" prop="email">
			<el-input v-model="form.email" />
		</el-form-item>

		<el-form-item label="Password" prop="password">
			<el-input type="password" v-model="form.password" show-password />
		</el-form-item>

		<el-form-item label="Remember me">
			<el-checkbox v-model="remember" />
		</el-form-item>

		<div v-if="form.errors.email" v-text="form.errors.email" class="text-crimson"></div>

		<div class="flex items-center justify-end mt-4">
			<Link v-if="resetUrl" :href="resetUrl" class="underline text-sm text-gray-600 hover:text-gray-900">Forgot your password?</Link>

			<el-form-item>
				<el-button @click="submit(loginForm)">Log in</el-button>
			</el-form-item>
		</div>
	</el-form>
</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout.vue'

export default {
	layout: EmptyLayout
}
</script>

<script setup>
import { useForm } from '@inertiajs/inertia-vue3'

const props = defineProps({
	loginUrl: String,
	resetUrl: String,
	status: String,
})

const form = useForm({
	email: '',
	password: '',
	remember: false
})

const submit = () => {
	form.post(props.loginUrl)
}
</script>
<style lang="scss">

</style>