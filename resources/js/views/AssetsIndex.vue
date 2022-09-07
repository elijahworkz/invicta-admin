<template>
	<Head :title="resource.title"/>
	<div class="py-6 px-10">
		<div class="flex items-end justify-start mb-4">
			<div>
				<h1 class="mb-1">{{ resource.title }}</h1>
				<Search :currentSearch="resource.meta.search" />
			</div>
			<div class="ml-auto">
				<el-button-group class="mr-2" >
					<el-button @click="layout = 'list'" title="List view" :active="layout == 'list'">
						<SvgIcon :icon="mdiFormatListText" :width="16" />
					</el-button>
					<el-button @click="layout = 'grid'" title="Grid view" :active="layout == 'grid'">
						<SvgIcon :icon="mdiViewGridOutline" :width="16" />
					</el-button>
				</el-button-group>

				<Uploader v-show="canCreate" />

				<!-- <el-button v-show="canCreate" type="primary" @click="handleUpload" :icon="UploadFilled">Upload</el-button> -->
			</div>
		</div>
		<el-card body-style="padding: 0px">

			<ListView v-if="layout == 'list'"
				:resource="resource"
				:can-edit="canEdit"
				:can-delete="canDelete"/>

			<GridView v-if="layout == 'grid'" :resource="resource" />

			<div class="flex items-center justify-between p-3 mt-2">
				<div>Total: <strong>{{ resource.meta.total }}</strong></div>
				<el-pagination
					background
					small
					layout="jumper, prev, pager, next, sizes"
					:current-page="resource.meta.current_page"
					:page-size="resource.meta.per_page"
					:total="resource.meta.total"
					@update:page-size="changePerPage"
					@update:current-page="changePage"
				/>
			</div>

		</el-card>
	</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-vue3'
import { useResource } from '@/services'
import Search from '@/components/resource/Search.vue'
import Uploader from '@/components/assets/Uploader.vue'
import ListView from '@/components/assets/ListView.vue'
import GridView from '@/components/assets/GridView.vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { mdiViewGridOutline, mdiFormatListText } from '@mdi/js';

const props = defineProps({
	resource: Object,
	canCreate: Boolean,
	canEdit: Boolean,
	canDelete: Boolean,
})

const { pageUrl } = usePage().props.value
const resourceIndex = useResource()
resourceIndex.init(pageUrl)

/* Layout type */
const layout = ref('grid')

/* Pagination Setup */
const changePerPage = (event) => Invicta.emit('page-size-change', event)
const changePage = (event) => Invicta.emit('page-change', event)


Invicta.on('refresh-resource', () => {
	console.log('you want to refresh')
	Inertia.reload()
})

</script>

<style lang="scss">
.el-button {
	&[active=true] {
		color: var(--el-button-active-text-color);
	    border-color: var(--el-button-active-border-color);
	    background-color: var(--el-button-active-bg-color);
	    outline: 0;
	    z-index: 1;
	}
}

.asset-inline {
	display: flex;
	align-items: center;

	.thumbnail {
		width: 30px;
		height: 30px;
		margin-right: 10px;
	}
}	
</style>