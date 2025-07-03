<template>
	<el-dialog
		v-model="open"
		:title="action.name"
		width="30%">

		<FormBase
			v-if="hasForm"
			:key="formId"
			:headless="true"
			:form-id="formId"
			:resource="action"
			:action-url="actionsUrl"
			:params="actionData"
			:save-tabs="false"
			@submitted="afterSubmit"
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
let action = reactive({
	name: 'Action',
	class: '',
	blueprint: null,
	dangerous: false,
	redirect: false
})

const counter = ref(0)
const formId = ref()
const selected = ref([])
const hasForm = ref(false)

const actionData = computed(() => ({
	class: action.class,
	selected: selected.value,
}))

const actionType = computed(() => {
	return action.dangerous ? 'danger' : 'primary'
})

const actionButtonTitle = computed(() => {
	return action.action_button ?? 'Run Action'
})

Invicta.on('show-action-modal', (event) => {
	console.log('opening the action modal', event)
	let item = event.selected[0]
	selected.value = event.selected || []
	action = event.action
	hasForm.value = event.action.blueprint !== null
	formId.value = `action.${action.class}.${item ?? action.type}`
	open.value = true
})

const resource = computed(() => ({
	blueprint: action.blueprint
}))

const processAction = () => {
	// Check if action has fields
	if (hasForm.value) {
		// console.log('we have form - form will submit')
		const resourceForm = useResourceForm(formId.value)
		resourceForm.submit()
	} else {

		// console.log('no form call')
		let data = { ...actionData.value, fields: [], validation: [] }

		if (action.redirect) {
      const selected = actionData.value.selected.map((val) => `selected[]=${val}`);
			let url = `${action.redirect}?class=${actionData.value.class}&${selected.join('&')}`
			// console.log('trying to redirect', url)
			window.open(url, '_blank')
		} else {
			// console.log('processing action', props.actionsUrl)
			Invicta.fetch.post(props.actionsUrl, data)
				.then(({data}) => {
					Invicta.message(data.message)
					Invicta.emit('refresh-resource')
				})
		}
		open.value = false
	}
}

const afterSubmit = () => {
	Invicta.emit('refresh-resource')
	open.value = false
}
</script>
