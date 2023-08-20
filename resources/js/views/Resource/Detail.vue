<template>
	<Head :title="resource.meta.pageTitle"/>
	<div class="py-6 px-10">

		<div class="flex items-end justify-between mb-4">
			<div>
				<BackLink class="breadcrumb" :text="resource.meta.indexTitle"/>
				<div v-html="resource.header.title"></div>
			</div>
			<div class="header-details text-right" v-if="resource.header.info" v-html="resource.header.info"></div>
		</div>

		<FormBase
			:form-id="`${resource.meta.handle}.${resource.meta.id}.detail`"
			:resource="resource"
			:headless="true"
			action-url="">
		</FormBase>
	</div>
</template>

<script setup>
import { ArrowLeft, Close, Plus, ArrowDown } from '@element-plus/icons-vue'

defineProps({
	resource: Object
})
</script>