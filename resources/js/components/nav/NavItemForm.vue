<template>
    <div class="p-4 w-full">
        <header class="mb-4 flex items-center justify-between">
            <h1>{{ title }}</h1>

            <el-button :icon="Close" text circle bg @click="$emit('close')" />
        </header>

        <div class="mb-2" v-if="error">
            <el-alert :title="errorMessage" type="error" effect="dark" show-icon :closable="false" />
        </div>

        <el-form label-position="top" class="invicta-form">
            <el-form-item label="Label">
                <el-input size="large" v-model="itemForm.label" />
                <div class="info info-bottom opacity-60">Navigation label.</div>
            </el-form-item>

            <el-form-item label="URL">
                <el-input size="large" v-model="itemForm.url" :disabled="resource" />
                <div class="info info-bottom opacity-60">Leave blank to make simple text item.</div>
            </el-form-item>

            <NavItemIcon v-model="itemForm.icon" :disabled="false" />

            <el-form-item label="CSS class">
                <el-input size="large" v-model="itemForm.css" />
                <div class="info info-bottom opacity-60">Set custom CSS classes.</div>
            </el-form-item>

            <el-form-item label="Description">
                <el-input size="large" v-model="itemForm.text" />
                <div class="info info-bottom opacity-60">Set item description.</div>
            </el-form-item>

            <el-form-item label="Open in new tab">
                <el-switch size="large" v-model="itemForm.external" />
                <div class="info info-bottom opacity-60">Open link in the new tab.</div>
            </el-form-item>

            <div class="text-right">
                <el-button type="primary" size="large" @click="$emit('saved', itemForm)">Save Item</el-button>
            </div>

        </el-form>
    </div>
</template>

<script setup>
import { Close } from '@element-plus/icons-vue'

const props = defineProps({
    mode: String,
    itemData: Object,
})
const title = computed(() => props.mode == 'create' ? 'Create Item' : 'Edit Item')
const itemForm = ref(props.itemData)
const resource = ref(false)
const error = ref(false)
const errorMessage = ref('')

onMounted(() => {

    if ('id' in props.itemData) {
        resource.value = true
        let itemUrl = `/api/resource/${props.itemData.handle}/${props.itemData.id}/uri`
        Invicta.axios.get(itemUrl)
            .then(({ data }) => {
                if (!data) {
                    error.value = true
                    errorMessage.value = `${props.itemData.type} not found`
                }
                itemForm.value.url = data
            })
    } else {
        resource.value = false
    }
})
</script>
