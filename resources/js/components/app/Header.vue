<template>

    <header class="app-header">
        <span class="sidebar-toggle" title="Minimize sidebar" @click="toggleSidebar">
            <SvgIcon :icon="mdiMenuOpen" />
        </span>
        <div class="app-branding" :title="appVersion">{{ appName }}</div>
        <CurrentLocale class="ml-3" />


        <div class="ml-auto flex items-center">
            <SiteLinks class="mr-3" />
            <!-- <Notifications /> -->

            <Impersonator v-if="impersonator" />

            <el-dropdown>
                <User />
                <template #dropdown>
                    <el-dropdown-item>
                        <span class="text-gray-400" @click="logout">Logout</span>
                    </el-dropdown-item>
                </template>
            </el-dropdown>
        </div>
    </header>
</template>

<script setup>
import { mdiMenuOpen, mdiLogoutVariant } from '@mdi/js'

const appName = Invicta.getConfig('appName')
const appVersion = Invicta.getConfig('appVersion')
const impersonator = Invicta.getConfig('impersonator')

const toggleSidebar = () => {
    document.body.classList.toggle('sidebar-mini')
    Invicta.emit('close-sidebar-submenus')
}

const logout = () => {
    Invicta.fetch.post('/logout')
        .then(() => window.location.reload())
}
</script>
