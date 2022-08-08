<template>
	<Head title="Login"/>
	<el-space direction="vertical">
		<h1 class="app-branding-auth">{{ appName }}</h1>
		<el-card class="auth-card">
			<el-form
				:model="form"
				label-position="top"
				@submit.prevent="submit"
			>
				<el-form-item label="Email" prop="email">
					<el-input v-model="form.email" autofocus autocomplete="username"/>
					<div class="el-form-item__error" v-if="form.errors.email" v-text="form.errors.email"></div>
				</el-form-item>


				<el-form-item label="Password" prop="password">
					<el-input type="password" v-model="form.password" show-password autocomplete="current-password"/>
					<div class="el-form-item__error" v-if="form.errors.password" v-text="form.errors.password"></div>
				</el-form-item>


				<el-form-item class="form-footer">
					<el-checkbox v-model="remember" label="Remember me"/>

					<el-button type="primary" native-type="submit">Log in</el-button>

				</el-form-item>
			</el-form>
		</el-card>

		<Link v-if="resetUrl" :href="resetUrl" class="underline text-sm text-gray-600 hover:text-gray-900">Forgot your
			password?
		</Link>
	</el-space>
</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout.vue'

export default {
	layout: EmptyLayout
}
</script>

<script setup>

import {useForm} from '@inertiajs/inertia-vue3'

const props = defineProps({
	storeUrl: String,
	resetUrl: String,
})

const form = useForm({
	email: '',
	password: '',
	remember: false
})

const appName = Invicta.getConfig('appName')

const submit = () => {
	form.post(props.storeUrl, {
		onFinish: () => form.reset('password')
	})
}
</script>

<style lang="scss">

form {
	.form-footer {
		.el-form-item__content {
			justify-content: space-between;
		}

	}
}

</style>