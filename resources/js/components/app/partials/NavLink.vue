<template>
    <a v-if="item.external" :href="item.url" class="nav-link" target="_blank">
    	<slot/>
    </a>
    <router-link
        v-else	
        class="nav-link"
        :to="item.url">
        	<slot/>
    </router-link>
</template>

<script setup>
defineProps({
	item: Object
})
</script>