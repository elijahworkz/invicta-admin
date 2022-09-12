<template>
	<FieldBase :form-id="formId" :field-props="props">
		<TextEditorBase @updated="onUpdated" :initial-value="fieldValue" />
	</FieldBase>

	<Drawer 
		v-if="drawer" 
		@close="drawer" 
		:style="{ width: '80%' }">
		
		<AssetSelector
			@selected="updateAsset"
			@cancel="drawer = false" />
		
	</Drawer>	
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import FieldBase from '@/components/form/FieldBase.vue'
import TextEditorBase from '@/components/form/TextEditorBase.vue'
import AssetSelector from '@/components/assets/AssetSelector.vue'
import { useFormField } from '@/services/form/field'


const props = defineProps({
	formId: String,
	data: Object,
	path: String
})
const field = useFormField(props)
const fieldValue = field.value('')

const drawer = ref(false)

const onUpdated = (value) => {
	fieldValue.value = value
}

const updateAsset = (asset) => {
	drawer.value = false
	let detail = {image_url: asset.src}
	console.log('about to issue an event', detail)
	let event = new CustomEvent('ckeditor-image-selected', {detail})
	document.dispatchEvent(event)	
}

Invicta.on('ckeditor-insert-image', () => {
	console.log('I hear soemthing from ckeditor')
	drawer.value = true
})
</script>