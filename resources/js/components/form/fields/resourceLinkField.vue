<template>
	<FieldBase :form-id="formId" :field-props="props">
		<el-select
			v-model="fieldValue"
			filterable
			remote
			reserve-keyword
			:placeholder="data.props?.placeholder"
			:remote-method="remoteMethod"
			:loading="loading"
			:disabled="data.readOnly">
				<el-option
					v-for="item in options"
					:key="item.value"
					:value="item.value"
					:label="item.label"
				/>
		</el-select>
	</FieldBase>
</template>

<script setup>
import { ref, onMounted } from 'vue'	
import { useFormField } from '@/services/form/field'
import FieldBase from '@/components/form/FieldBase.vue'

const props = defineProps({
	formId: String,
	data: Object,
	path: String
})

const field = useFormField(props)
const fieldValue = field.value([])
const list = ref([])
const options = ref([])
const loading = ref(false)

console.log(fieldValue);

onMounted(() => {
	Invicta.axios.get("/fields/resource-link/options")
		.then(({data}) => {
			list.value = data
			remoteMethod()
		})
})

function remoteMethod (query) {
	if (query) {
		loading.value = true
		setTimeout(() => {
			loading.value = false
			options.value = list.value.filter((item) => {
				return item.label.toLowerCase().includes(query.toLowerCase())
			})
		}, 200)
	} else {
		options.value = list.value
	}
}


</script>