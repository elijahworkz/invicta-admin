<template>

	<Head title="Forgot password"/>

	<el-space direction="vertical">
		<h1 class="app-branding-auth">{{ appName }}</h1>

		<el-card class="auth-card">
			<div class="info">
				<h2 class="title">Forgot Your Password?</h2>
				<p>Enter your email address so we can send a reset password link.</p>
			</div>

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

import {computed, defineProps} from 'vue'
import {useForm, usePage} from "@inertiajs/inertia-vue3";

const props = defineProps({
	storeUrl: String,
	status: String
})


const form = useForm({
	email: ''
})

const appName = computed(() => usePage().props.value.appName)

const submit = () => {
	form.post(props.storeUrl, {
		onFinish: () => {
			form.reset('email')
		}
	})
}

</script>

<style lang="scss">

.info {
	text-align: center;
	margin: 0 0 15px 0;

	.title {
		font-size: 20px;
		margin: 0 0 5px 0;
	}
}

</style>