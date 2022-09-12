<template>
	<Head :title="resource.name"/>
	<div class="py-6 px-10">
		<FormBase
			:form-id="`${resource.meta.handle}.${resource.meta?.id || 'new'}`"
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
import FormBase from '@/components/form/FormBase.vue'

defineProps({
	resource: Object
})
</script>