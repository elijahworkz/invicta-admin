<template>
	<el-dialog
		v-model="open"
		:title="action.name"
		width="30%">

		<FormBase
			v-if="action.fields.length"
			:headless="true"
			:form-id="formId"
			:resource="resource"
			:action-url="actionsUrl"
		/>

		<div v-else>Are you sure you want to run this action?</div>

		<template #footer>
				<el-button @click="open = false">Cancel</el-button>
				<el-button :type="actionType" @click="processAction">Run Action</el-button>
		</template>		
	</el-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { useResourceForm } from '@/services/form'
import { onKeyStroke } from '@vueuse/core'
import FormBase from '@/components/form/FormBase.vue'

const props = defineProps({
	actionsUrl: String,
})

const emit = defineEmits(['close'])

const open = ref(false)
const action = ref({
	name: 'Action',
	fields: [],
	dangerous: false
})
const selected = ref([])

const formId = ref()
const actionType = computed(() => {
	return action.value.dangerous ? 'danger' : 'primary'
})

Invicta.on('show-action-modal', (event) => {
	action.value = event.action
	formId.value = `action.${event.action.name}`
	selected.value = event.selected
	open.value = true
})

const resource = computed(() => ({
	blueprint: {
		settings: {
			form: {
				labelPosition: 'right',
				class: 'w-full'
			}
		},
		fields: action.value.fields
	}
}))


const processAction = () => {

	let data = {
		class: action.value.class,
		selected: selected.value,
		fields: []
	}

	if (action.value.fields.length) {
		const resourceForm = useResourceForm(formId.value)
		data.fields = resourceForm.formData()
	}

	open.value = false

	Invicta.axios.post(props.actionsUrl, data)
		.then(({data}) => {
			Invicta.message(data.message)
			Invicta.emit('refresh-resource')
		})
}

onKeyStroke('Enter', (e) => {
	e.preventDefault()
	processAction()
})
</script>