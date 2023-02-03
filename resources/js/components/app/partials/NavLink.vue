<template>
    <Link
    	v-if="item.inertia"
        :class="[{'active': $page.url === item.url}, 'nav-link']"
        :href="`${item.url}`">
        	<slot/>
    </Link>
    <a v-else :href="item.url" class="nav-link" target="_blank">
    	<slot/>
    </a>
</template>

<script setup>
defineProps({
	item: Object
})
</script>