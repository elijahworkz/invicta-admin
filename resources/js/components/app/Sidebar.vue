<template>
    <div class="app-nav">
        <el-scrollbar>
            <ul class="nav">
                <template v-for="item in menuItems">
                    <li v-if="item.group" class="nav-group">{{ item.group }}</li>
                    <li class="nav-item" :class="{ divider: item.divider, external: !item.inertia }">
                        <NavItem :item="item" />
                    </li>
                </template>
            </ul>
        </el-scrollbar>
    </div>
</template>

<script setup>
import NavItem from './partials/NavItem.vue'

const menuItems = Invicta.getConfig('menu')

Invicta.log('Menu', menuItems)
</script>

<style lang="scss">

</style>