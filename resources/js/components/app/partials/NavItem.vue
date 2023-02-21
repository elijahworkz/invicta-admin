<template>
	<template v-if="!item.children">
        <NavLink :item="item">
            <span class="sidebar-mini">
                <SvgIcon :icon="item.icon"/>
            </span>
            <span class="sidebar-normal">{{ item.name }}</span>
            <Badge :data="item.badge || null" />
        </NavLink>
	</template>
    <div
    	v-if="item.children"
        class="has-children"
        :class="{ open: showSubmenu, 'has-badges': childrenHaveBadges(item.children) }">
        <div class="nav-link" @click="showSubmenu = !showSubmenu">
            <span class="sidebar-mini">
                <SvgIcon :icon="item.icon"/>
            </span>
            <span class="sidebar-normal">{{ item.name }}</span>
            <SvgIcon 
                :icon="mdiChevronDown" 
                class="ml-auto nav-arrow"/>
        </div>
        <el-collapse-transition>
            <div class="submenu" v-show="showSubmenu">
                <ul class="nav">
                    <li
                        v-for="(child, index) in item.children"
                        :key="index"
                        class="nav-item">
                            <NavLink :item="child">
                                <span class="sidebar-normal">{{ child.name }}</span>
                                <Badge :data="child.badge || null" />
                            </NavLink>
                        </li>
                </ul>
            </div>
        </el-collapse-transition>
    </div>
</template>

<script setup>
import { mdiChevronDown } from '@mdi/js'

defineProps({
    item: Object
})

const showSubmenu = ref(false)

const childrenHaveBadges = (items) => {
    return items.filter(i => i.badge).length
}

Invicta.on('close-sidebar-submenus', () => showSubmenu.value = false)
</script>

<style lang="scss">
.has-children {
    .nav-arrow {
        transition: transform .2s;
        opacity: .5;
    }

    &.open {
        .nav-arrow {
            transform: rotate(180deg);
        }
    }
}
</style>