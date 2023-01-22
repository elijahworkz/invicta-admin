<template>

	<Head title="Forgot password"/>

	<div class="auth-form">
		<h1 class="auth-header">{{ appName }}</h1>

		<el-card class="auth-card">
			<header class="mb-6">
				<div class="text-center mb-2 text-xl">Forgot Your Password?</div>
				<p>Enter your email address so we can send a reset password link.</p>
			</header>

			<div v-if="$page.props.flash.message" class="mb-2">
				<el-alert :title="$page.props.flash.message" type="success" />
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
				<footer>
					<el-button type="primary" native-type="submit">Submit</el-button>
				</footer>
			</el-form>

		</el-card>
	</div>

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