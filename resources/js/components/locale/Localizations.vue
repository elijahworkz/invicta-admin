<template>
    <el-dropdown class="mr-4" @command="handleCommand">
        <el-button size="small" text type="info">
            <SvgIcon :icon="mdiTranslate" :width="15" /> <span class="mx-2">{{ localizations[currentLocale].name
                }}</span>
            <Flag :country="localizations[currentLocale].flag" />
        </el-button>
        <template #dropdown>
            <el-dropdown-menu>
                <template v-for="locale in localizations" :key="locale.iso">
                    <el-dropdown-item v-if="!locale.current" :command="locale" :title="localeTitle(locale)">
                        <SvgIcon v-if="locale.translation || locale.origin" :icon="mdiTextBoxEditOutline" :width="18"
                            class="opacity-50" />
                        <SvgIcon :icon="mdiPlus" :width="18" v-else />
                        <span class="ml-2">{{ locale.name }}</span>
                    </el-dropdown-item>
                </template>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup>
import { mdiTranslate, mdiPlus, mdiTextBoxEditOutline } from '@mdi/js'
import { useRouter } from 'vue-router'

const props = defineProps({
    localizations: Object,
    formId: String,
    resourceUrl: String,
})

const router = useRouter()
const resourceForm = useResourceForm(props.formId)

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
    let id = locale.translation
        ? locale.translation
        : (locale.origin ? locale.origin : null)

    let handle = resourceForm.settings.handle

    if (id) {
        let url = router.resolve({ name: 'resourceEdit', params: { id, handle } })
        window.location.href = url.href
    } else {

        Invicta.axios.post(`/api/resource/${handle}/${origin.value}/localize/${locale.iso}`)
            .then(({ data }) => {
                console.log('I have created localized version of this page', data)
                let url = router.resolve({ name: 'resourceEdit', params: { id: data, handle } })
                window.location.href = url.href
            })
    }
}

function loadTranslation(url) {
    // Get the current URL
    let currentUrl = new URL(window.location.href);

    // Add or update the 'location' query parameter
    currentUrl.searchParams.set('locale', locale);

    // Reload the page with the updated URL
    window.location.href = currentUrl.toString();
}
</script>
