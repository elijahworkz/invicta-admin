<template>
    <ul class="nav">
        <li><Link href="/admin">Home</Link></li>
        <li><Link href="/admin/resource/pages/index">Pages</Link></li>
        <li><Link href="/admin/resource/campaigns/index">Campaigns</Link></li>
        <li><Link href="/admin/resource/lessons/index">Lessons</Link></li>
        <li><Link href="/admin/test">Student Test</Link></li>
        <li
            v-for="item in navItems"
            :key="item.url"
            class="nav-item">
            <Link
                v-if="!hasSubMenu(item)"
                :class="[{'active': $page.component === item.component}, 'nav-link']"
                :href="`${item.url}`">
                    <span class="sidebar-mini">
                        <svgIcon :name="item.icon" />
                    </span>
                    <span class="sidebar-normal">{{ item.name }}</span>
            </Link>
            <div v-else
                class="has-children"
                :class="{ open: showSubmenu}">
                <div class="nav-link" @click="showSubmenu = !showSubmenu">
                    <span class="sidebar-mini">
                        <svgIcon :name="item.icon"/>
                    </span>
                    <span class="sidebar-normal">{{ item.name }}</span>
                    <SvgIcon 
                        name="angle-down" 
                        class="ml-auto text-white nav-arrow"/>
                </div>
                <el-collapse-transition>
                    <div class="submenu sidebar-normal" v-show="showSubmenu">
                        <ul class="nav">
                            <li
                                v-for="(link, index) in item.submenu"
                                :key="index"
                                class="nav-item">

                                    <a :href="link" target="_blank" class="nav-link">{{ index }}</a>
                                </li>
                        </ul>
                    </div>
                </el-collapse-transition>
            </div>
        </li>
    </ul>
</template>

<script setup>
import { ref } from 'vue'

const showSubmenu = ref(false)
const menuItems = Invicta.getConfig('menu')

Invicta.log('Menu', menuItems)

const navItems = [
    {
        name: 'Campaigns',
        url: '/manager/campaigns',
        icon: 'apps'
    },
    {
        name: 'Masters',
        url: '/manager/masters',
        icon: 'inbox',
        auth: 'view-masters'
    },
    {
        name: 'Media Library',
        url: '/manager/media',
        icon: 'image',
        auth: 'view-media'
    },
    {
        name: 'Reviews',
        url: '/manager/reviews',
        icon: 'users-alt',
        auth: 'view-reviews'
    },
    {
        name: 'Dropdown',
        icon: 'link',
        submenu: [
            { 'link 1': '/admin/resource/something/index' },
            { 'link 2': '/test/test' }
        ]
    },
    {
        name: 'A/B Tests',
        url: '/manager/split-tests',
        icon: 'flask',
        auth: 'view-tests'
    }
]

const hasSubMenu = (item) => {
    return!item.hasOwnProperty('component') 
        && item.hasOwnProperty('submenu')
}
</script>

<style lang="scss">
.has-children {
    .nav-arrow {
        transition: transform .2s;
    }

    &.open {
        .nav-arrow {
            transform: rotate(180deg);
        }
    }
}
</style>