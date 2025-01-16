<template>
    <div class="image-uploader" :class="type">
        <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
            <div v-if="type == 'drag'" class="dropbox" :class="{
                'is-dragover': dragover,
                'is-initial': isInitial
            }" @drop.prevent="initUpload" @dragover.prevent="dragover = true" @dragleave.prevent="dragover = false">

                <input type="file" ref="uploadInput" :multiple="multiple" :accept="settings.accept" class="input-file"
                    :disabled="isSaving" @change="initUpload">

                <div class="dropbox-initial" v-if="isInitial">
                    <div class="dropbox-text" @click="inputClick">
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
                <span class="el-button el-button--primary" @click="inputClick" title="Upload new asset">
                    <input type="file" ref="uploadInput" :multiple="multiple" :accept="settings.accept"
                        class="input-file" :disabled="isSaving" @change="initUpload">
                    <i v-if="isSaving" class="el-icon is-loading">
                        <Loading />
                    </i>
                    <i v-if="!isSaving" class="el-icon">
                        <UploadFilled />
                    </i>

                    <span v-if="type === 'button'">Upload</span>
                </span>
                <el-button v-if="type === 'browse'" :icon="Picture" @click="$emit('open-library')">Media
                    Library</el-button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { mdiCloudUploadOutline } from '@mdi/js';
import { UploadFilled, Loading, Picture } from '@element-plus/icons-vue'

const props = defineProps({
    type: {
        type: String,
        default: 'button' // possible values are 'drag', 'button', 'browse'
    },
    single: {
        type: Boolean,
        default: false
    },
    folder: String
})

const emit = defineEmits(['upload-complete', 'open-library'])
const settings = Invicta.getConfig('assetsSettings')

const multiple = computed(() => {
    if (props.single) {
        return false
    }
    return settings.multiupload
})

/* Set statuses */
const isInitial = ref(true)
const isSaving = ref(false)
const dragover = ref(false)

/* Set Input Ref */
const uploadInput = ref()

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

    for (let file of files) {
        upload(file)
    }
}

const inputClick = () => {
    uploadInput.value.value = null
    uploadInput.value.click()
}

function upload(file) {
    uploadInput.value = null

    let formData = new FormData()
    formData.append('file', file)

    if (props.folder && props.folder != '') {
        formData.append('folder', props.folder)
    }

    const config = {
        onUploadProgress: (event) => {
            if (event.lengthComputable) {
                uploadProgress.value = Math.round((event.loaded * 100) / event.total)
            }
        }
    }

    Invicta.axios.post('/api/assets', formData, config)
        .then(({ data }) => {
            Invicta.message(data.message)
            emit('upload-complete', data.asset)
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
}
</script>
