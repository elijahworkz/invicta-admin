<template>
	<FormBase v-if="blueprint" :blueprint="blueprint"></FormBase>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useResourceForm } from '@/services/form'
import FormBase from './FormBase.vue'

const props = defineProps({
	requestUrl: String
})

const resourceForm = useResourceForm()
const blueprint = ref(null)

onMounted(() => {
	// we need to get Item Form
	// 
	Invicta.axios.get(props.requestUrl)
		.then(({data}) => {
			blueprint.value = data.blueprint
			resourceForm.init(data)
		})
})
</script>

<style lang="scss">

</style>