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
					</div>

					<div class="media-details">
						<div class="name">{{ item.img_name }}</div>
						<div class="bottom">
							<span>{{ item.created }}</span>
							<span v-if="item.type == 'image'">{{ item.dimensions }}px</span>
							<span>{{item.size }}</span>
						</div>
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

<style lang="scss">
.grid {
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	display: grid;
	grid-gap: 1em;
	grid-auto-rows: 1fr;

	.el-card {

		.el-card__body {
			display: flex;
			flex-direction: column;
		}

		.media-asset {
			flex: 0 1 250px;
			overflow: hidden;
			position: relative;
			text-align: center;

			.image-transparent-back {
				height: 100%;
			}

			svg {
				fill: #909399;
				width: 40px;
				height: 40px;
			}
		}

		.media-details {
			background: #fff;
			padding: 15px;

			.name {
				font-size: 15px;
				font-weight: 600;
				line-height: 1;
			}
			.bottom {

				span {
					display: inline-block;
					margin-right: 3px;
					padding-right: 5px;
					font-size: 12px;
					font-weight: 400;
					line-height: 1;
					border-right: 1px solid grey;

					&:last-of-type {
						margin-right: 0;
						padding-right: 0;
						border-right: 0;
					}
					&.active {
						font-weight: 600;
					}
				}
			}
		}

		.actions-layer {
			position: absolute;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			cursor: default;
			text-align: center;
			color: #fff;
			opacity: 0;
			font-size: 1.7rem;
			background-color: rgba(0,0,0,.5);
			transition: opacity .3s;
			line-height: 30px;

			svg {
				width: 30px;
				height: 30px;
			}

			&:after {
				display: inline-block;
				content: "";
				height: 100%;
				vertical-align: middle;
			}
			&:hover {
				opacity: 1;

				span {
				}
			}

			span {
				display: inline-block;
				// display: none;
				cursor: pointer;

				+ span {
					margin-left: 15px;
				}
			}
		}
	}
}
</style>