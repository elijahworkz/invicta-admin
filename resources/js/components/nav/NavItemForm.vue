<template>
	<div class="p-4 w-full">
		<header class="mb-4 flex items-center justify-between">
			<h1>{{ title }}</h1>

			<el-button :icon="Close" text circle bg @click="$emit('close')" />
		</header>
		<el-form
			label-position="top"
			class="invicta-form"
			>
			<el-form-item label="Label">
				<el-input size="large" v-model="itemForm.label"/>
				<div class="info info-bottom opacity-60">Navigation label.</div>
			</el-form-item>

			<el-form-item label="Url">
				<el-input size="large" v-model="itemForm.url" :disabled="resource" />
				<div class="info info-bottom opacity-60">Leave blank to make simple text item.</div>
			</el-form-item>

			<el-form-item label="CSS class">
				<el-input size="large" v-model="itemForm.css"/>
				<div class="info info-bottom opacity-60">Set custom CSS classes.</div>
			</el-form-item>

			<el-form-item label="Open in new tab">
				<el-switch size="large" v-model="itemForm.external" />
				<div class="info info-bottom opacity-60">Open link in the new tab.</div>
			</el-form-item>

			<div class="text-right">
				<el-button type="primary" size="large" @click="$emit('saved', itemForm)">Save Item</el-button>
			</div>

		</el-form>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Close } from '@element-plus/icons-vue'

const props = defineProps({
	mode: String,
	itemData: Object,
})
const title = computed(() => props.mode == 'create' ? 'Create Item' : 'Edit Item')
const itemForm = ref(props.itemData)
const resource = ref(false)

onMounted(() => {

	if ('id' in props.itemData && props.itemData.id) {
		resource.value = true
		let itemUrl = `/resource/${props.itemData.handle}/${props.itemData.id}/uri`
		Invicta.axios.get(itemUrl)
			.then(({data}) => {
				itemForm.value.url = data
			})
	} else {
		resource.value = false
	}
})
</script>