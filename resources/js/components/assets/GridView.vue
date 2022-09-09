<template>
	<div class="p-4">
		<Uploader type="drag" />

		<div class="cards-wrapper grid">
			<div class="card-wrap"
				v-for="(item, index) in resource.data"
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
					<div class="actions-layer">
<!-- 						<span
							class="copy-item"
							v-clipboard="() => item.name"
							:title="`Copy filename to clipboard: ${item.name}`">
							<unicon name="copy"/>
						</span>
						<span
							v-if="item.type == 'image'" class="preview-item" @click="handleImagePreview( item.path, item.name )" title="Click to preview image">
							<unicon name="search-plus"/>
						</span>
						<span class="preview-item" @click="handleOpenMedia(item.path)" :title="`Click to open ${item.type} in new tab`">
							<unicon name="external-link-alt"/>
						</span>
						<span class="delete-item" @click="handleImageDelete(item)" title="Click to delete image">
							<unicon name="trash-alt"/>
						</span> -->
					</div>
				</el-card>		
			</div>
		</div>
     </div>
</template>

<script setup>
import { Picture as IconPicture } from '@element-plus/icons-vue'
import Uploader from '@/components/assets/Uploader.vue'
defineProps({
	resource: Object
})
</script>

<style lang="scss">
		.cards-wrapper {

			&.grid {
				grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
				display: grid;
				grid-gap: 1em;

				.el-card {
					height: 30vh;
					position: relative;
					text-align: center;

					.el-card__body {
						height: 100%;
					}

					.media-asset {
						height: 100%;
						display: flex;
						align-items: center;
						justify-content: center;

						img {
							max-width: 100%;
							height: auto;
						}

						svg {
							fill: #909399;
							width: 40px;
							height: 40px;
						}
					}
					.media-details {
						text-align: left;
						position: absolute;
						bottom: 0;
						width: 100%;
						background: rgba(255, 255, 255, 0.65);
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

						.unicon {
							font-size: 30px;
							line-height: 30px;
							svg {
								width: 30px;
								height: 30px;
							}
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
								display: inline-block;
							}
						}

						span {
							display: none;
						}
					}
				}
			}
		}

.image-transparent-back {
	display: inline-block;
	background-image: linear-gradient(45deg, #eee 25%, transparent 25%), linear-gradient(-45deg, #eee 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #eee 75%), linear-gradient(-45deg, transparent 75%, #eee 75%);
	background-size: 20px 20px;
	background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
}
</style>