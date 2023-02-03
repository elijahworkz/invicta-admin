<template>
	<div class="w-9/12 pt-12 mx-auto">
		<FormBase 
			v-if="resource"
			:form-id="formId"
			:resource="resource"
			:action-url="resource.meta.actionUrl"
			:post-submit-actions="['close', 'edit', 'create']"
			@form-ready="prepopulateFields">
			<template #form-actions>
				<el-button class="ml-auto mr-2" text @click="$emit('cancel')">Cancel</el-button>
			</template>
		</FormBase>
	</div>
</template>

<script setup>
const props = defineProps({
	requestUrl: String,
	createWith: Object
})

const resource = ref(null)
const formId = ref(null)
const { createWith } = props

onMounted(() => {
	Invicta.axios.get(props.requestUrl)
		.then(({data}) => {
			resource.value = data
			formId.value = data.meta.id
				? `${data.meta.handle}.${data.meta.id}`
				: `${data.meta.handle}.new`


		})
})

const prepopulateFields = () => {
	if (createWith) {
		const resourceForm = useResourceForm(formId.value)

		console.log('I see createWith', createWith, createWith.field, createWith.value, resourceForm.form)

		// resource.value.blueprint.fields[3]['readOnly'] = true

		resourceForm.set(createWith.field, createWith.value)
		resourceForm.setReadOnly(createWith.field)
	}
}
</script>