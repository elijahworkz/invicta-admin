<template>
	<div class="p-4">
		<Uploader v-if="!selector" type="drag" :multiple="multiple" />
		<div class="cards-wrapper grid">
			<div class="card-wrap"
				v-for="(item, index) in resource"
				:key="item.img_name">

				<el-card body-style="padding: 0px" :title="item.img_name">
					<div class="media-asset">
						<div class="image-transparent-back" v-if="item.type == 'image'">
							<img :src="item.src" />
						</div>
					</div>

					<div class="media-details">
						<div class="name">{{ item.img_name }}</div>
						<div class="bottom">
							<span>{{ item.created }}</span>
							<span v-if="item.type == 'image'">{{ item.dimensions }}px</span>
							<span>{{item.size }}</span>
						</div>
					</div>
					<div class="actions-layer" v-if="selector">
						<el-button
							v-if="item.type == 'image'"
							type="primary"
							@click="$emit('asset-selected', item)">Select Image</el-button>
					</div>
					<div class="actions-layer" v-else>
						<span
							v-if="isSupported"
							class="copy-item"
							@click="copy(item.img_name)"
							:title="`Copy filename to clipboard: ${item.img_name}`">
							<DocumentCopy/>
						</span>
						<span
							v-if="item.type == 'image'" class="preview-item" @click="$emit('edit', item)" title="Click to preview image">
							<Edit/>
						</span>
						<span class="preview-item" @click="handleOpenMedia(item.src)" :title="`Click to open ${item.type} in new tab`">
							<SvgIcon :icon="mdiOpenInNew"/>
						</span>
						<span class="delete-item" @click="handleDelete([item.id])" title="Click to delete image">
							<Delete/>
						</span>
					</div>
				</el-card>		
			</div>
		</div>
     </div>
</template>

<script setup>
import { Picture as IconPicture } from '@element-plus/icons-vue'
import { Inertia } from '@inertiajs/inertia'
import Uploader from '@/components/assets/Uploader.vue'
import { useClipboard, usePermission } from '@vueuse/core'
import { mdiOpenInNew } from '@mdi/js';
import { DocumentCopy, Delete, Edit } from '@element-plus/icons-vue'

const props = defineProps({
	resource: Object,
	multiple: Boolean,
	selector: {
		type: Boolean,
		default: false
	}
})
const { isSupported, copy } = useClipboard()
const permissionRead = usePermission('clipboard-read')
const permissionWrite = usePermission('clipboard-write')

/* Handle Delete Actions */
const handleDelete = (selected) => {

	ElMessageBox.confirm(
		'This action will permanently delete records from database. Are you sure you want to continue?',
		'Deleting',
		{
			confirmButtonText: 'Delete',
			cancelButtonText: 'Cancel',
			confirmButtonClass: 'el-button--danger'
		}
	).then(() => {
		Inertia.delete(props.resource.meta.path, {data: { selected }})
	})
	.catch(() => console.log('cancel'))
}

/* Handle Preview Image */
const handleOpenMedia = (path) => window.open(path, '_blank')

</script>