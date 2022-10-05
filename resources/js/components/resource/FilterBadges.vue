<template>
	<el-tag
		v-for="(filter, index) in filterBadges"
		:key="index"
		class="mx-1"
		closable
		@close="removeFilter(filter.handle)">
		{{ filter.badge }}
	</el-tag>
</template>

<script setup>
const props = defineProps({
	badges: Object
})

const filterBadges = computed(() => {
	return map(props.badges, (item, key) => {
		let value = Array.isArray(item.value)
			? item.value.join(', ')
			: item.value
		return { handle: key, badge: `${item.name}: ${value}` }
	})
})

const removeFilter = (handle) => Invicta.emit('remove-filter', handle)

</script>