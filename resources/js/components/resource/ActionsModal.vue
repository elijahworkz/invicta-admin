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
			:params="actionData"
			:key="formKey"
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
const action = reactive({
	name: 'Action',
	class: '',
	blueprint: [],
	dangerous: false,
	redirect: false
})

const counter = ref(0)
const formId = ref()
const selected = ref([])

const actionData = computed(() => ({
	class: action.class,
	selected: selected.value,
}))
// const formParams = computed(() => action.blueprint?.fields?.length ? actionData.value : {})
const hasForm = computed(() => ! isEmpty(action.blueprint))
const formKey = computed(() => `${formId.value}.${selected.value.join('')}.${counter.value}`)

const actionType = computed(() => {
	return action.dangerous ? 'danger' : 'primary'
})

const actionButtonTitle = computed(() => {
	return action.action_button ?? 'Run Action'
})

Invicta.on('show-action-modal', (event) => {
	let item = event.selected[0]
	action.class = event.action.class
	action.name = event.action.name
	action.dangerous = event.action.dangerous
	action.redirect = event.action.redirect
	selected.value = event.selected || []
	formId.value = `action.${event.action.class}.${item}`

	Invicta.axios.get(`${props.actionsUrl}/blueprint/${item}`, { params: {class: event.action.class}})
		.then(({data}) => {
			action.blueprint = data.blueprint
			open.value = true
			counter.value++
		})
})

Invicta.on('resource-form-submitted', () => open.value = false)

const resource = computed(() => ({
	blueprint: action.blueprint
}))

const processAction = () => {

	// Check if action has fields
	if (hasForm) {

		// console.log('we have form - form will submit')
		const resourceForm = useResourceForm(formId.value)
		resourceForm.submit()

	} else {

		// console.log('no form call')
		let data = { ...actionData.value, fields: [], validation: [] }

		if (action.redirect) {
			let url = `${action.redirect}?class=${actionData.value.class}&selected[]=${actionData.value.selected.join(',')}`
			window.open(url, '_blank')
		} else {

			Invicta.axios.post(props.actionsUrl, data)
				.then(({data}) => {
					Invicta.message(data.message)
					Invicta.emit('refresh-resource')
				})
		}

		open.value = false
	}

}
</script>