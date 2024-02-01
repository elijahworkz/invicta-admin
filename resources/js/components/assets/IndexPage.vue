<template>
	<div class="asset-library">
		<IndexBase>
			<template #actions="{ settings }">
				<el-button-group class="mr-2" >
					<el-button @click="setLayout('list')" title="List view" :active="layout == 'list'">
						<SvgIcon :icon="mdiFormatListText" :width="16" />
					</el-button>
					<el-button @click="setLayout('grid')" title="Grid view" :active="layout == 'grid'">
						<SvgIcon :icon="mdiViewGridOutline" :width="16" />
					</el-button>
				</el-button-group>

				<Uploader v-show="settings.canCreate" />
			</template>

			<template #default="{ resource, settings, handleEdit, handleSelect, handleDelete }">
				<ResourceTable
					v-if="layout == 'list'"
					resource-handle="assets"
					:data="resource"
					:columns="settings.columns"
					:can-edit="settings.canEdit"
					:can-delete="settings.canDelete"
					@select="handleSelect"
					@edit="handleEdit"
					@delete="handleDelete" />

				<GridView v-if="layout == 'grid'" 
					:resource="resource"
					:settings="settings"
					@edit="handleEdit"
					@delete="handleDelete" />
			</template>
		</IndexBase>
	</div>
</template>

<script setup>
import { UploadFilled } from '@element-plus/icons-vue'
import { mdiViewGridOutline, mdiFormatListText } from '@mdi/js';

let resourceIndex = useResource('assets')

/* Layout Setup */
const layout = ref(Invicta.remember('media-layout') || 'grid')

const setLayout = (type) => {
	layout.value = type
	Invicta.remember('media-layout', type)
}
</script>