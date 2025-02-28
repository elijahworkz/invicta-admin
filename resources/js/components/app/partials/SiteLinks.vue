<template>
    <el-dropdown @command="handleCommand">
        <el-button :icon="Link" text>Site links</el-button>
        <template #dropdown>
            <el-dropdown-item command="current">Current site</el-dropdown-item>
            <el-dropdown-item command="production">Production site</el-dropdown-item>
        </template>
    </el-dropdown>
</template>

<script setup>
import { Link } from '@element-plus/icons-vue'

const handleCommand = (command) => {
    let url = Invicta.getConfig('appUrl')

    switch (command) {
        case 'production':
            url = Invicta.getConfig('appProductionUrl')
            break
    }

    window.open(url, '_blank')
}
</script>
