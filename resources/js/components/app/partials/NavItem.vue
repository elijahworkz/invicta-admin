<template>
	<template v-if="!item.children">
	    <Link
	    	v-if="item.inertia"
	        :class="[{'active': $page.url === item.url}, 'nav-link']"
	        :href="`${item.url}`">
	            <span class="sidebar-mini">
	                <SvgIcon :icon="item.icon" />
	            </span>
	            <span class="sidebar-normal">{{ item.name }}</span>
	    </Link>
	    <a v-else :href="item.url" class="nav-link" target="_blank">
	    	<span class="sidebar-mini">
	    		<SvgIcon :icon="item.icon"/>
	    	</span>
	    	<span class="sidebar-normal">{{ item.name }}</span>
	    </a>
	</template>
    <div
    	v-if="item.children"
        class="has-children"
        :class="{ open: showSubmenu}">
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
            <div class="submenu sidebar-normal" v-show="showSubmenu">
                <ul class="nav">
                    <li
                        v-for="(link, index) in item.children"
                        :key="index"
                        class="nav-item">

                            <a :href="link" target="_blank" class="nav-link">{{ index }}</a>
                        </li>
                </ul>
            </div>
        </el-collapse-transition>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { mdiChevronDown } from '@mdi/js'

defineProps({
	item: Object
})

const showSubmenu = ref(false)
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