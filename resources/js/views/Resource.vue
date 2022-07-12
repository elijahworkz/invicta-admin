<template>

	<div class="p-6">

		<el-card>

			<ResourceTable :data="resource.data" :columns="resource.columns" />

			<div class="flex items-center justify-between mt-4">
				<div>Total: <strong>{{ resource.meta.total }}</strong></div>
				<el-pagination background small layout="prev, pager, next" :total="resource.meta.total" />
			</div>

		</el-card>
	</div>

</template>

<script setup>
import { usePage } from '@inertiajs/inertia-vue3'
import { useResource, Inertia } from '@/services'

import ResourceTable from '@/components/ResourceTable.vue'

defineProps({
	resource: Object
})

const { resource, pageUrl } = usePage().props.value
const { requestQuery } = useResource(resource, pageUrl)
</script>

<style lang="scss">

</style>