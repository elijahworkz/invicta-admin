<template>
	<div class="w-full flex flex-col">
		<header class="p-3 flex items-center justify-between">
			<h1>{{ asset.img_name || asset.name }}</h1>
			<span class="preview-item ml-auto mr-4" @click="handleOpenMedia(asset.src)" :title="`Click to open asset in new tab`">
				<SvgIcon :icon="mdiOpenInNew"/>
			</span>
			<el-button :icon="Close" text circle bg @click="$emit('close')" />
		</header>

		<main class="preview">
			<!-- <el-scrollbar> -->
				<div class="image-transparent-back">
					<img :src="asset.src">
				</div>
			<!-- </el-scrollbar> -->
		</main>

		<footer>
			<div class="flex p-3">
				<el-input v-model="asset.alt" class="mr-2" placeholder="Specify Alt attribute for the image" />
				<el-button type="primary" @click="updateAsset" :disabled="!asset.alt">
					<i v-if="isSaving" class="el-icon is-loading"><Loading/></i>
					Update Alt
				</el-button>
			</div>
		</footer>
	</div>
</template>

<script setup>
import { Close, Loading } from '@element-plus/icons-vue'
import { mdiOpenInNew } from '@mdi/js';

const props = defineProps({
	asset: Object
})
const emit = defineEmits(['close'])

/* Handle Preview Image */
const handleOpenMedia = (path) => window.open(path, '_blank')

/* Update Alt */
const isSaving = ref(false)

const updateAsset = () => {
	isSaving.value = true
	Invicta.axios.post(`api/assets/${props.asset.id}`, { alt: props.asset.alt })
		.then(() => {
			isSaving.value = false
			emit('close', true)
		})
}
</script>

<style lang="scss">
#drawer {
	.preview-item {
		cursor: pointer;
	}

	.preview {
		display: flex;
		align-items: center;
		justify-content: center;

		img {
			max-width: 100%;
			height: auto;
		}
	}
}
</style>