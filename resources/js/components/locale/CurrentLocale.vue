<template>
    <div>
        <el-tooltip :content="locales[current].name">
            <Flag v-if="hasFlag" :country="locales[current].flag" />
        </el-tooltip>
    </div>
</template>

<script setup>
const locales = Invicta.getConfig('locales')
const current = Invicta.getConfig('currentLocale')
const hasFlag = locales[current].hasOwnProperty('flag')

</script>
