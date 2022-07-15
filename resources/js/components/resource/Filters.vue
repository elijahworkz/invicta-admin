<template>
	<el-dropdown>
		<el-button type="primary">
			<el-icon><Filter /></el-icon><el-icon class="el-icon--right"><arrow-down /></el-icon>
		</el-button>
		<template #dropdown>
				
		</template>
	</el-dropdown>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Filter, ArrowDown } from '@element-plus/icons-vue'
onMounted(() => {

	Invicta.axios.get(`/resource/users/filters`)
		.then((data) => console.log(data))

	console.log('I am in filter - should request')
})

// const hasFilters = 
</script>

<style lang="scss">

</style>