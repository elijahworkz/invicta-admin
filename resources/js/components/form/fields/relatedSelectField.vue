<template>
	<FieldBase :form-id="formId" :field-props="props" class="related-field">
		<el-select
			v-model="fieldValue"
			valueKey="id"
			:remote-method="getRemote"
			:loading="loading"
			:teleported="false"
			:disabled="field.disabled"
			v-bind="data.props">
				<el-option
					v-for="item in relatedOptions"
					:key="item.key"
					:value="item.value"
					:label="item.label"
				/>
		</el-select>
	</FieldBase>
</template>

<script setup>
const props = defineProps({
	formId: String,
	data: Object,
	path: String
})

const loading = ref(false)

const field = useFormField(props)
const fieldValue = field.value([])

const resourceForm = useResourceForm(props.formId)

const titleField = get(props.data, 'titleField', 'title')
const remote = get(props.data, 'remote', false)
const relatedUrl = `/resource/${resourceForm.meta.handle}/relationship/${props.data.id}`

const relatedOptions = ref([])
const relatedFromValue = ref([])

onMounted(() => {
	
	if (remote) {

		relatedFromValue.value = relatedOptions.value = map(fieldValue.value, (item) => {
			return { key: item.id, value: { id: item.id, name: item[titleField] }, label: item[titleField] }
		})
	} else {

		let params = {
			title: titleField
		}
		if (props.data.where) {
			console.log('is there a where?')
			params.where = props.data.where
		}

		getRelatedOptions(params)
	}

})

async function getRemote(query) {
	if (query !== '') {
		let params = {
			title: titleField,
			search: query
		}

		if (props.data.where) {
			console.log('getting remote hwerde')
			params.where = props.data.where
		}

		await getRelatedOptions(params, true)
	} else {
		relatedOptions.value = []
	}
}

function getRelatedOptions(params, remote = false) {

	loading.value = true

	Invicta.axios.get(relatedUrl, { params })
		.then(({data}) => {

			let remoteOptions = map(data, (label, value) => {
				let _value = ('path' in props.data)
					? Number(value)
					: { id: Number(value)}
				return { key: value, value: _value, label: label }
			})

			if (remote) {
				relatedOptions.value = [...relatedFromValue.value, ...remoteOptions]
			} else {
				relatedOptions.value = remoteOptions
			}

			loading.value = false
		})	
}
</script>

<style lang="scss">
.related-field {
	.el-select,
	.items-stack {
		width: 100%;
	}
}
</style>