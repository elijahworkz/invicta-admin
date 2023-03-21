<template>
	<Head title="Cache"/>
	<div class="py-6 px-10">
		<el-form :model="form" class="invicta-form w-2/4">
			<h1 class="mb-4">Cache Manager</h1>

			<el-card class="py-0">
				<div class="p-6">
					<h2>Application Cache</h2>

					<div class="fieldset">
						<p>Clear all cache</p>
						<el-button class="field-row-1/4" type="primary" @click="submit">Clear</el-button>
					</div>
				</div>
				<div class="p-6" style="background: var(--el-border-color-lighter)">
					<h2>Content Cache</h2>
					<div class="fieldset mt-2">
						<label>Clear cache by tag:</label>
						<el-input v-model="form.tag" type="text" class="field-row-1/3"></el-input>
						<el-button class="field-row-1/4" type="primary" @click="submit(form)" :disabled="!form.tag">
							Clear
						</el-button>
					</div>
					<div class="fieldset mt-2">
						<label>Clear cache by key:</label>
						<el-input v-model="form.key" type="text" class="field-row-1/3"></el-input>
						<el-button class="field-row-1/4" type="primary" @click="submit(form)" :disabled="!form.key">
							Clear
						</el-button>
					</div>
				</div>
			</el-card>
		</el-form>
	</div>
</template>

<script setup>
import { useForm } from "@inertiajs/vue3";

const actionUrl = 'api/cache/clear'

const form = useForm({
	'tag': '',
	'key': ''
})

const reset = () => {
	form.tag = ''
	form.key = ''
}

const submit = (form = null) => {
	Invicta.axios.post(actionUrl, form)
		.then(({data}) => {
			Invicta.message({
				type: 'success',
				title: data.message
			})
			reset()
		})
		.catch(error => {
			reset()
		})
}

</script>

<style lang="scss">
h2 {
	font-size: var(--el-font-size-large);
}

.invicta-form {
	.el-card.py-0 {
		padding: 0;
	}
}
</style>