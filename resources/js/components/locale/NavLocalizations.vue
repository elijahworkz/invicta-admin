<template>
    <el-dropdown class="mr-4" @command="handleCommand">
        <el-button size="small" text type="info">
            <SvgIcon :icon="mdiTranslate" :width="15" class="mr-2" /> {{ localizations[currentLocale].name }}
        </el-button>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item v-for="locale in localizations" :key="locale.iso" :command="locale"
                    :disabled="locale.current" :title="localeTitle(locale)">
                    <i class="icon-status" :class="{ 'success': locale.translation || locale.origin }"></i> <span
                        class="ml-2">{{ locale.name }}</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup>
import { mdiTranslate } from '@mdi/js'
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps({
    localizations: Object,
})


const origin = computed(() => {
    let { localizations } = props
    return Object.values(localizations).filter((l) => {
        return l.origin !== null
    })[0].origin
})

const currentLocale = Object.values(props.localizations).filter((l) => l.current)[0].iso

const localeTitle = (locale) => {
    if (locale.origin)
        return 'Original'

    if (locale.current)
        return 'Current translation'

    let action = locale.translation ? 'Edit' : 'Create'
    return `${action} ${locale.name} translation`
}

const handleCommand = (locale) => {
    console.log('hadndle command', locale)
    let id = locale.translation
        ? locale.translation
        : (locale.origin ? locale.origin : null)

    if (id) {
        console.log('do I have the command', id, locale)
        router.replace({ name: 'navEditItems', params: { id }, force: true })
    } else {

        Invicta.axios.post(`/api/navigation/${origin.value}/localize/${locale.iso}`)
            .then(({ data }) => {
                console.log('I have created localized version of this menu', data)
                router.push({ name: 'navEditItems', params: { id: data } })
            })
    }
}
</script>
/script>
