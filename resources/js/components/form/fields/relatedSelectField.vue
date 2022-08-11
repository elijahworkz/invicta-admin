<template>
	<FieldBase :form-id="formId" :field-props="props" class="related-field">
		<el-select
			v-model="fieldValue"
			valueKey="id"
			:remote-method="getRemote"
			:loading="loading"
			v-bind="fieldProps">
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
import { ref, onMounted, computed, watch } from 'vue'
import FieldBase from '@/components/form/FieldBase.vue'
import { useResourceForm } from '@/services/form'
import { useFormField } from '@/services/form/field'
import map from 'lodash/map'
import get from 'lodash/get'

const props = defineProps({
	formId: String,
	data: Object,
	path: String
})

const loading = ref(false)

const field = useFormField(props)
const fieldValue = field.value([])
const fieldProps = props.data.props

const resourceForm = useResourceForm(props.formId)

const titleField = props.data.titleField
const relatedUrl = `/resource/${resourceForm.meta.handle}/relationship/${props.data.id}`

const relatedOptions = ref([])
const relatedFromValue = ref([])

onMounted(() => {
	
	if (fieldProps.remote) {

		relatedFromValue.value = relatedOptions.value = map(fieldValue.value, (item) => {
			return { key: item.id, value: { id: item.id, name: item[titleField] }, label: item[titleField] }
		})
	} else {

		let params = {
			title: titleField
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
				return { key: value, value: { id: Number(value), name: label }, label: label }
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