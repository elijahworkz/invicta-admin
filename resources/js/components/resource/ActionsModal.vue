<template>
	<el-dialog
		v-model="open"
		:title="action.name"
		width="30%">

		<FormBase
			v-if="hasForm"
			:headless="true"
			:form-id="formId"
			:resource="resource"
			:action-url="actionsUrl"
			:api="api"
		/>

		<div v-else>Are you sure you want to run this action?</div>

		<template #footer>
				<el-button @click="open = false">Cancel</el-button>
				<el-button :type="actionType" @click="processAction">{{actionButtonTitle}}</el-button>
		</template>		
	</el-dialog>
</template>

<script setup>
const props = defineProps({
	actionsUrl: String,
})

const emit = defineEmits(['close'])

const open = ref(false)
const action = ref({
	name: 'Action',
	blueprint: [],
	dangerous: false
})

const selected = ref([])
const actionData = computed(() => ({
	class: action.value.class,
	selected: selected.value,
}))
const api = computed(() => action.value.blueprint.fields?.length ? actionData.value : false)

const hasForm = computed(() => ! isEmpty(action.value.blueprint))
const formId = ref()
const actionType = computed(() => {
	return action.value.dangerous ? 'danger' : 'primary'
})

const actionButtonTitle = computed(() => {
	return action.value.action_button ?? 'Run Action'
})

Invicta.on('show-action-modal', (event) => {
	action.value = event.action
	formId.value = `action.${event.action.name}`
	selected.value = event.selected
	open.value = true
})

const resource = computed(() => ({
	blueprint: action.value.blueprint
}))

const processAction = () => {

	// Check if action has fields
	if (api.value) {

		console.log('we have form - form will submit')
		const resourceForm = useResourceForm(formId.value)
		resourceForm.apiSubmit()
	} else {

		console.log('no form call')
		let data = { ...actionData.value, fields: [], validation: [] }

		Invicta.axios.post(props.actionsUrl, data)
			.then(({data}) => {
				Invicta.message(data.message)
				Invicta.emit('refresh-resource')
			})
	}

	open.value = false
}
</script>