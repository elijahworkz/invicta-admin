<template>
    <el-dropdown class="mr-4" @command="changeLocale">
        <el-button size="small" text type="info">
            <SvgIcon :icon="mdiTranslate" :width="15" /> <span class="mx-2">
                {{ locales[current].name }}
            </span>
            <Flag v-if="hasFlag" :country="locales[current].flag" />
        </el-button>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item v-for="locale in locales" :key="locale.iso" :command="locale.iso"
                    :disabled="current == locale.iso">
                    {{ locale.name }}
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup>
import { mdiTranslate } from '@mdi/js'

const props = defineProps({
    locales: Object,
})

const { locales } = props
const current = Invicta.getConfig('currentLocale')
const hasFlag = locales[current].hasOwnProperty('flag')

const changeLocale = (locale) => {
    // Get the current URL
    let currentUrl = new URL(window.location.href);

    // Add or update the 'location' query parameter
    currentUrl.searchParams.set('locale', locale);

    // Reload the page with the updated URL
    window.location.href = currentUrl.toString();
}
</script>
