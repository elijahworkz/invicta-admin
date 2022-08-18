<template>
	<Head title="Permissions"/>
	<div class="py-6 px-10">
		<el-form
			class="invicta-form w-2/3"
			:model="form"
		>
			<div class="flex items-end justify-between mb-4">
				<div>
					<h1 class="mb-1">Permissions</h1>
				</div>
				<div class="resource-actions">
					<el-button
						type="primary"
						@click="submit"
					>
						Save
					</el-button>
				</div>
			</div>
		</el-form>
	</div>
</template>

<script setup>
import FormBase from '@/components/form/FormBase.vue'
import {useForm} from "@inertiajs/inertia-vue3";

defineProps({
	actionUrl: String
})

const form = useForm({
	permissions: []
})

</script>