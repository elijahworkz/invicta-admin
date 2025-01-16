<template>
    <div class="mb-4">
        <label class="mb-3">Icon</label>
        <div class="asset-wrap" v-if="icon">
            <div class="asset" @click="editAsset">
                <img :src="icon.src" />
            </div>
            <div class="asset-details mr-auto">
                <strong>{{ icon.name }}</strong>
            </div>
            <span class="mr-3 action-icon" @click="icon = null">
                <SvgIcon :icon="mdiTrashCanOutline" :width="18" />
            </span>
        </div>
        <Uploader v-else-if="!disabled" type="browse" @upload-complete="updateAsset" @open-library="openLibrary"
            :single="true" />
        <div class="asset-wrap" v-else-if="disabled">No image</div>

        <div class="info info-bottom opacity-60 mt-2">Add an image to menu item.</div>
    </div>
    <Drawer v-if="drawer.state" @close="drawer.state = false"
        :style="{ width: drawer.context == 'library' ? '80%' : '' }">

        <AssetSelector v-if="drawer.context == 'library'" @selected="updateAsset" @cancel="drawer.state = false" />

        <AssetForm v-if="drawer.context == 'edit'" :asset="fieldValue" @close="drawer.state = false" />

    </Drawer>
</template>

<script setup>
import { formatBytes } from '@/utils/functions'
import { Picture } from '@element-plus/icons-vue'
import { mdiTrashCanOutline } from '@mdi/js'

const icon = defineModel()
const props = defineProps({
    disabled: {
        type: Boolean,
        default: false
    }
})

const drawer = reactive({
    state: false,
    context: 'library'
})

/* Actions */
const updateAsset = (asset) => {
    icon.value = asset
    drawer.state = false
}

const editAsset = () => {
    if (props.disabled) return
    drawer.context = 'edit'
    drawer.state = true
}

const openLibrary = () => {
    drawer.context = 'library'
    drawer.state = true
}
</script>

<style lang="scss">
.asset-wrap {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border: 1px solid var(--el-border-color-lighter);
    background: var(--el-fill-color-light);
    border-radius: .15rem;
    padding: .5rem;

    .asset {
        overflow: hidden;
        margin: 0 15px 0 0;
        cursor: pointer;

        img {
            height: 50px;
            width: 50px;
            object-fit: contain;
        }
    }

    .asset-details {
        line-height: 1.4;

        strong {
            display: block;
        }
    }
}
</style>
