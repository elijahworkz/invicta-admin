<template>
	<FieldBase :form-id="formId" :field-props="props">
		<div class="asset-wrap" v-if="fieldValue">
			<div class="asset" @click="editAsset">
				<img :src="fieldValue.src" />
			</div>
			<div class="asset-details">
				<strong>{{ fieldValue.name }}</strong>
				{{ fieldValue.width }}x{{ fieldValue.height }} | {{ fieldValue.alt ? fieldValue.alt : 'No Alt!' }}
			</div>
			<el-icon class="ml-auto mr-3 action-icon" @click="fieldValue = null"><Delete/></el-icon>
		</div>
		<Uploader v-else type="browse" @upload-complete="updateAsset" @open-library="openLibrary" />
	</FieldBase>

	<Drawer 
		v-if="drawer.state" 
		@close="drawer.state = false" 
		:style="{ width: drawer.context == 'library' ? '80%' : '' }">
		
		<AssetSelector 
			v-if="drawer.context == 'library'" 
			@selected="updateAsset"
			@cancel="drawer.state = false" />

		<AssetForm v-if="drawer.context == 'edit'" :asset="fieldValue" @close="drawer.state = false" />
		
	</Drawer>
</template>

<script setup>
import { Delete } from '@element-plus/icons-vue'

const props = defineProps({
	formId: String,
	data: Object,
	path: String
})
const field = useFormField(props)
const fieldValue = field.value()

const drawer = reactive({
	state: false,
	context: 'library'
})

/* Actions */
const updateAsset = (asset) => {
	fieldValue.value = asset
	drawer.state = false
}

const editAsset = () => {
	drawer.context = 'edit'
	drawer.state = true
}

const openLibrary = () => {
	drawer.context = 'library'
	drawer.state = true
}

</script>

<style lang="scss">
.asset-wrap {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	border: 1px solid var(--el-border-color-lighter);
	background: var(--el-fill-color-light);
	border-radius: .15rem;
	padding: .5rem;

	.asset {
		overflow: hidden;
		margin: 0 15px 0 0;
		cursor: pointer;

		img {
			height: 50px;
			width: 50px;
			object-fit: contain;
		}
	}

	.asset-details {
		line-height: 1.4;
		strong {
			display: block;
		}
	}
}
</style>