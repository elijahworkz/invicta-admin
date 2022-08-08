<template>

	<Head title="Forgot password"/>

	<el-space direction="vertical">
		<h1 class="app-branding-auth">{{ appName }}</h1>

		<el-card class="auth-card">
			<header class="mb-4">
				<div class="text-center mb-2 text-xl">Forgot Your Password?</div>
				<p>Enter your email address so we can send a reset password link.</p>
			</header>

			<div v-if="$page.props.flash.message" class="mb-4 font-medium text-sm text-green-600">
				{{ $page.props.flash.message }}
			</div>

			<el-form
				:model="form"
				label-position="top"
				@submit.prevent=submit
			>
				<el-form-item label="Email Address" prop="email">
					<el-input v-model="form.email" autofocus autocomplete="username"/>
					<div class="el-form-item__error" v-if="form.errors.email" v-text="form.errors.email"></div>
				</el-form-item>
				<el-form-item class="justify-center">
					<el-button type="primary" native-type="submit">Submit</el-button>
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

import {defineProps} from 'vue'
import {useForm} from "@inertiajs/inertia-vue3";

const props = defineProps({
	actionUrl: String,
	status: String
})


const form = useForm({
	email: ''
})

const appName = Invicta.getConfig('appName')

const submit = () => {
	form.post(props.actionUrl, {
		onFinish: () => {
			form.reset('email')
		}
	})
}

</script>

<style lang="scss">
</style>