<template>
	<div class="py-6 px-10">
		<div class="flex items-end justify-between mb-4">
			<div>
				<BackLink class="breadcrumb" :data="{name: 'resourceIndex', params: { handle: resourceItem.meta.handle }, text: resourceItem.meta.indexTitle}"/>
				<div v-html="resourceItem.header.title"></div>
			</div>
			<div class="header-details text-right" v-if="resourceItem.header.info" v-html="resourceItem.header.info"></div>
		</div>

		<FormBase
			:form-id="`${resourceItem.meta.handle}.${resourceItem.meta.id}.detail`"
			:resource="resourceItem"
			:headless="true"
			:page-form="true"
			action-url="">
		</FormBase>
	</div>
</template>

<script setup>
import { ArrowLeft, Close, Plus, ArrowDown } from '@element-plus/icons-vue'
defineOptions({
	beforeRouteEnter: async function (to) {
		let {data} = await Invicta.axios.get(`api${to.path}`, {params: to.query})
		to.meta.data = data
	}
})

const props = defineProps({
	resourceItem: Object
})

Invicta.pageTitle(props.resourceItem.meta.pageTitle)
</script>