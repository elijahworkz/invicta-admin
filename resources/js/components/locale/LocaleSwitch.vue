<template>
    <el-dropdown class="mr-4" @command="changeLocale">
        <el-button size="small" text type="info">
            <SvgIcon :icon="mdiTranslate" :width="15" class="mr-2" /> {{ locales[currentLocale].name }}
        </el-button>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item v-for="locale in locales" :key="locale.iso" :command="locale.iso"
                    :disabled="currentLocale == locale.iso">
                    {{ locale.name }}
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup>
import { mdiTranslate } from '@mdi/js'

const props = defineProps({
    handle: String,
    locales: Object
})

const { handle, locales } = props
const currentLocale = ref('en')
const resourceIndex = useResource(handle)

onMounted(() => {
    let current = filterFn(locales, l => l.current)[0]
    currentLocale.value = current.iso
})

const changeLocale = (locale) => {
    resourceIndex.setLocale(locale)
    currentLocale.value = locale
}
</script>
