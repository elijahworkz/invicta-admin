<template>
	<div class="p-4">
		<Uploader v-if="!selector" type="drag" />
		<div class="assets-grid">
			<div class="asset-card"
				v-for="(item, index) in resourceList"
				:key="item.path"
				:title="item.img_name">

				<div class="wrap">
					<div class="image-wrap">
						<div class="image-transparent-back" v-if="item.type == 'image'">
							<img :src="item.src" />
						</div>
						<div class="p-6" v-else>
							<el-skeleton :rows="5" />
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
								@click="copy(item.src)"
								title="Copy file path to clipboard">
								<DocumentCopy/>
							</span>
							<span
								v-if="item.type == 'image' && settings.canEdit" 
								class="preview-item" 
								@click="$emit('edit', item.id)" 
								title="Click to preview image">
								<Edit/>
							</span>
							<span class="preview-item" @click="handleOpenMedia(item.src)" :title="`Click to open ${item.type} in new tab`">
								<SvgIcon :icon="mdiOpenInNew"/>
							</span>
							<span 
								v-if="settings.canDelete"
								class="delete-item" 
								@click="$emit('delete', [item.id])"
								title="Click to delete image">
								<Delete/>
							</span>
						</div>
					</div>
					<div class="media-details">
						<div class="name">{{ item.img_name }}</div>
						<div class="bottom">
							<span v-if="item.type == 'image'">{{ item.dimensions }}px</span>
							<span>{{item.size }}</span>
							<span>{{ item.created }}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
     </div>
</template>

<script setup>
import { mdiOpenInNew } from '@mdi/js';
import { DocumentCopy, Delete, Edit, Picture as IconPicture } from '@element-plus/icons-vue'

const props = defineProps({
	resource: Object,
	settings: Object,
	selector: {
		type: Boolean,
		default: false
	}
})

const resourceList = computed(function () {
	return props.resource.data ? props.resource.data : props.resource
})
const { isSupported, copy } = useClipboard()
const permissionRead = usePermission('clipboard-read')
const permissionWrite = usePermission('clipboard-write')

/* Handle Preview Image */
const handleOpenMedia = (path) => window.open(path, '_blank')

</script>

<style lang="scss">
.assets-grid {
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	display: grid;
	grid-gap: 1em;

	.asset-card {
		border-radius: var(--el-card-border-radius);
		display: grid;
		border: 1px solid var(--el-border-color-lighter);
		box-shadow: var(--el-box-shadow-light);
		background: #fff;

		&:before {
			content: '';
			display: block;
			grid-area: 1 / 1 / 2 / 2;
			padding-bottom: 100%;
		}

		.wrap {
			grid-area: 1 / 1 / 2 / 2;
			display: flex;
			flex-direction: column;
		}

		.image-wrap {
			position: relative;
			overflow: hidden;
			flex: 1;
		}

		.image-transparent-back {
			position: absolute;
			width: 100%;
			height: 100%;
		}

		img {
			display: none;
			display: block;
			width: 100%;
			height: 100%;
			object-fit: contain;
		}

		.media-details {
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
			top: 0;
			bottom: 0;
			opacity: 0;
			cursor: default;
			text-align: center;
			color: #fff;
			font-size: 1.7rem;
			background-color: rgba(0,0,0,.7);
			transition: opacity .3s;
			line-height: 30px;
			display: flex;
			align-items: center;
			justify-content: center;

			svg {
				width: 30px;
				height: 30px;
			}

			&:hover {
				opacity: 1;
			}

			span {
				display: inline-block;
				cursor: pointer;

				+ span {
					margin-left: 15px;
				}
			}
		}		
	}
}
</style>