<template>
	<div class="image-uploader" :class="type">
		<form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
			<div v-if="type == 'drag'" class="dropbox"
				:class="{
					'is-dragover': dragover,
					'is-initial': isInitial
				}"
				@drop.prevent="initUpload"
				@dragover.prevent="dragover = true"
				@dragleave.prevent="dragover = false">

				<input 
					type="file" 
					ref="uploadImage" 
					:accept="accept"
					class="input-file"
					:disabled="isSaving"
					@change="initUpload">

				<div class="dropbox-initial" v-if="isInitial">
					<div class="dropbox-text">
						<SvgIcon :icon="mdiCloudUploadOutline" />
						<span>Drop file here or <strong>click to select</strong></span>
					</div>
				</div>
				<div class="dropbox-saving" v-if="isSaving">
					<el-progress type="circle" :percentage="uploadProgress" />
					<div>{{ uploadStatus }}</div>
				</div>
			</div>
			<div v-else class="button-upload">
				<span class="el-button el-button--primary" @click="clickUpload" title="Upload new asset">
					<input
						type="file"
						ref="uploadImage"
						:accept="accept"
						class="input-file"
						:disabled="isSaving"
						@change="initUpload">
						<i v-if="isSaving" class="el-icon is-loading"><Loading/></i>
						<i v-if="!isSaving" class="el-icon"><UploadFilled/></i>

						<span v-if="type === 'button'">Upload</span>
				</span>
				<el-button v-if="type === 'gallery'" :icon="Picture">Media Library</el-button>
			</div>
		</form>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { mdiCloudUploadOutline } from '@mdi/js';
import { UploadFilled, Loading, Picture } from '@element-plus/icons-vue'

const props = defineProps({
	type: {
		type: String,
		default: 'button' // possible values are 'drag', 'button', 'gallery'
	},
	accept: {
		type: String,
		default: 'image/*,audio/*,.pdf'
	}
})

/* Set statuses */
const isInitial = ref(true)
const isSaving = ref(false)
const dragover = ref(false)

/* Set Input Ref */
const uploadImage = ref()

/* Upload progress */
const uploadProgress = ref(0)
const uploadStatus = computed(() => {
	return uploadProgress.value == 100 ? 'Saving to database...' : 'Uploading to server...'
})

/* Handle Upload */
const initUpload = (event) => {
	dragover.value = false
	isInitial.value = false
	isSaving.value = true

	const files = (event.target.files.length !== 0) ? event.target.files : event.dataTransfer.files

	if (files.length == 0) return

	let formData = new FormData()
	formData.append('file', files[0])
	upload(formData)
}

const clickUpload = () => {
	uploadImage.value.value = null
	uploadImage.value.click()
}

function upload(formData) {
	uploadImage.value = null

	const config = {
		onUploadProgress: (event) => {
			if (event.lengthComputable) {
				uploadProgress.value = Math.round((event.loaded * 100) / event.total)
			}
		}
	}

	Invicta.axios.post('/assets', formData, config)
		.then(({data}) => {
			Invicta.message(data.message)
			Invicta.emit('refresh-resource')
			reset()
		})
		.catch(error => {
			reset()
		})
}

function reset() {
	isSaving.value = false
	isInitial.value = true
	Invicta.emit('refresh-library', true)
}
</script>

<style lang="scss">
.image-uploader {
	white-space: nowrap;

	&.button {
		display: inline-block;
	}

	.el-button--small {
		padding: 9px 7px;
	}
}
.dropbox {
	border: 1px dashed #d9d9d9; /* the dash box */
	border-radius: 6px;
	box-sizing: border-box;
	text-align: center;
	cursor: pointer;
	min-height: 180px; /* minimum height */
	position: relative;
	overflow: hidden;
	margin-bottom: 20px;


	&.is-dragover {
		border: 2px dashed #409eff;
		background: rgba(32,159,255,.06);
	}
	.input-file {
		opacity: 0; /* invisible but it's there! */
		width: 100%;
		height: 180px;
		position: absolute;
		cursor: pointer;
		left: 0;
		top: 0;
	}
	.dropbox-text {
		font-size: 1em;
		text-align: center;
		padding: 40px 0;

			svg {
				color: #c0c4cc;
				display: block;
				margin: 0px auto 16px;
				line-height: 70px;
				height: 70px;
				width: 70px;
			}
	}

	&.is-initial:hover {
		border-color: #409eff; /* when mouse over to the drop zone, change color */

		.dropbox-text {
			svg {
				color: #409eff;
			}
		}
	}
	.dropbox-saving {
		margin-top: 60px;
	}
}

.button-upload {
	display: inline-block;

	.input-file {
		display: none;
	}
}
</style>