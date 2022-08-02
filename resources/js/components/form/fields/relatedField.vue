<template>
	<FieldBase :field-props="props">
		<template v-if="data.select">
			<el-select
				v-model="fieldValue"
				valueKey="id"
				:remote-method="getRemote"
				:loading="loading"
				width="100%"
				v-bind="data.select"
				@change="maybeUpdateValue">
					<el-option
						v-for="item in relatedOptions"
						:key="item.key"
						:value="item.value"
						:label="item.label"
					/>
			</el-select>
		</template>
		<template v-if="data.stack">
			<ItemList 
				v-model="fieldValue" 
				:items-url="relatedUrl" 
				:title-field="titleField"
				@change="maybeUpdateValue"
			/>
		</template>
	</FieldBase>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import FieldBase from '@/components/form/FieldBase.vue'
import ItemList from '@/components/form/ItemList.vue'
import { useResourceForm } from '@/services/form'
import { useFormField } from '@/services/form/field'
import map from 'lodash/map'
import get from 'lodash/get'

const props = defineProps({
	data: Object,
	path: String
})

const loading = ref(false)
const relatedPath = props.path.split('.').pop()
const field = useFormField({ data: props.data, path: relatedPath })
const fieldValue = field.value([])

const resourceForm = useResourceForm()
const titleField = props.data.titleField
const relatedUrl = `/resource/${resourceForm.meta.slug}/relationship/${props.data.id}`

const relatedOptions = ref([])
const relatedFromValue = ref([])

onMounted(() => {
	
	if (props.data.select) {
		if (props.data.select.remote) {

			relatedFromValue.value = relatedOptions.value = map(fieldValue.value, (item) => {
				return { key: item.id, value: { id: item.id, name: item[titleField] }, label: item[titleField] }
			})
		} else {

			let params = {
				title: titleField
			}

			getRelatedOptions(params)
		}
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
		})	
}

function maybeUpdateValue(value) {
	if (props.path !== relatedPath) {
		// we only want IDs when saving elsewhere
		let ids = value.map(item => item.id)
		resourceForm.set(props.path, ids)
	}
}
</script>