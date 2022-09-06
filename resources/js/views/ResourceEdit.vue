<template>
	<Head :title="resource.name"/>
	<div class="py-6 px-10">
		<FormBase
			:form-id="`${props.resource.meta.handle}.${props.resource.meta?.id || 'new'}`"
			:resource="resource"
			:action-url="resource.meta.actionUrl"
			:breadcrumb="{ url: resource.meta.indexUrl, text: resource.meta.indexTitle }">

			<template #form-actions v-if="resource.meta.availableBlueprints">
				<label class="mr-2" >Template:</label>
				<el-select v-model="blueprint" @change="changeBlueprint" class="mr-3">
				    <el-option
				      v-for="item in resource.meta.availableBlueprints"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value"
				    />
				</el-select>

			</template>
		</FormBase>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-vue3'
import FormBase from '@/components/form/FormBase.vue'
import { useUrlSearchParams } from '@vueuse/core'

const props = defineProps({
	resource: Object
})

const params = useUrlSearchParams('history')
const blueprint = ref(props.resource.item?.blueprint || params.blueprint || 'default')

const changeBlueprint = (value) => {
	const { pageUrl } = usePage().props.value
	
	Inertia.get(pageUrl, { blueprint: value })
}
</script>