<template>
	<el-dropdown trigger="click" class="!align-middle" teleported>
		<el-icon class="action-icon"><SetUp /></el-icon>
	    <template #dropdown>
	    	<div class="table-settings flex p-4">
	    		<div class="settings pr-4">
	    			<h4 class="mb-1">Settings</h4>
    				<el-form-item>
	    				<el-checkbox v-model="tableProps['stripe']">Striped</el-checkbox>
	    			</el-form-item>
	    			<el-form-item>
	    				<el-checkbox v-model="tableProps['border']">Border</el-checkbox>
	    			</el-form-item>
    				<el-form-item>
    					<label>Size</label>
	    				<el-select v-model="tableProps['size']" placeholder="Size">
	    					<el-option value="small">Small</el-option>
	    					<el-option value="default">Default</el-option>
	    					<el-option value="large">Large</el-option>
	    				</el-select>
	    			</el-form-item>
	    		</div>
		    	<div class="columns pl-4">
		    		<h4 class="mb-1">Columns</h4>
			    	<CheckTree :initial-items="treeModel" :disabled="false" :depth="1" />
			    </div>
	    	</div>
	    </template>
	</el-dropdown>
</template>

<script setup>
import { SetUp } from '@element-plus/icons-vue'
const props = defineProps({
	treeModel: Array,
	tableProps: Object,
})
</script>