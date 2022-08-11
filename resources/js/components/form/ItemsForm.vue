<template>
	<div class="w-9/12 pt-12 mx-auto">
		<FormBase 
			v-if="resource"
			:form-id="formId"
			:resource="resource"
			:action-url="resource.meta.actionUrl"
			:post-submit-actions="['close', 'edit', 'create']">
			<template #form-actions>
				<el-button class="ml-auto mr-2" text @click="$emit('cancel')">Cancel</el-button>
			</template>
		</FormBase>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import FormBase from './FormBase.vue'

const props = defineProps({
	requestUrl: String
})

const resource = ref(null)
const formId = ref(null)

onMounted(() => {
	Invicta.axios.get(props.requestUrl)
		.then(({data}) => {
			resource.value = data
			formId.value = data.meta.id
				? `${data.meta.handle}.${data.meta.id}`
				: `${data.meta.handle}.new`
		})
})
</script>