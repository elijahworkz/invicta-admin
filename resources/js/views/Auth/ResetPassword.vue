<template>
	<Head title="Reset password"/>
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
					<el-input type="password" v-model="form.password" show-password autocomplete="new-password"/>
					<div class="el-form-item__error" v-if="form.errors.password" v-text="form.errors.password"></div>
				</el-form-item>

				<el-form-item label="Confirm Password" prop="password_confirmation">
					<el-input type="password" v-model="form.password_confirmation" show-password
							  autocomplete="new-password"/>
					<div class="el-form-item__error" v-if="form.errors.password_confirmation"
						 v-text="form.errors.password_confirmationemail"></div>
				</el-form-item>

				<el-form-item class="justify-center">
					<el-button type="primary" native-type="submit">Reset Password</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</el-space>

</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout.vue'


export default {
	layout: EmptyLayout
}
</script>

<script setup>
import { defineProps } from 'vue'
import { useForm } from "@inertiajs/vue3";

const props = defineProps({
	actionUrl: String,
	email: String,
	token: String
})

const form = useForm({
	token: props.token,
	email: props.email,
	password: '',
	password_confirmation: ''
})

const appName = Invicta.getConfig('appName')

const submit = () => {
	form.post(props.actionUrl, {
		onFinish: () => form.reset('password', 'password_confirmation')
	})
}

</script>

<style lang="scss">
</style>