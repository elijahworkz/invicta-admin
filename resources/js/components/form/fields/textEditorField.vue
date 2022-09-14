<template>
	<FieldBase :form-id="formId" :field-props="props">
		<TextEditorBase :initial-value="fieldValue" @updated="onUpdated" />
	</FieldBase>

	<Drawer 
		v-if="drawer.state" 
		@close="drawer.state = false" 
		:style="{ width: drawer.context == 'assets' ? '80%' : '500px' }">
		
		<AssetSelector
			v-if="drawer.context == 'assets'"
			@selected="updateAsset"
			@cancel="drawer.state = false" />

		<ItemsSelector
			v-if="drawer.context == 'items'"
			:single-select="true"
			:select="['uri']"
			:columns="columns"
			:resources="resourcesForLinks"
			@selected="insertItems"
			@cancel="drawer.state = false" />			
		
	</Drawer>	
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import FieldBase from '@/components/form/FieldBase.vue'
import TextEditorBase from '@/components/form/TextEditorBase.vue'
import AssetSelector from '@/components/assets/AssetSelector.vue'
import ItemsSelector from '@/components/form/ItemsSelector.vue'
import { useFormField } from '@/services/form/field'

const props = defineProps({
	formId: String,
	data: Object,
	path: String
})
const field = useFormField(props)
const fieldValue = field.value('')

/* Setup Editor */
const editor = ref()
const editorReady = (editor) => {
	editor.value = editor
}

const onUpdated = (value) => {
	fieldValue.value = value
}

/* Get Resources for Links */
const resourcesForLinks = ref([])
onMounted(() => {
	Invicta.axios.get('/fields/texteditor/resources')
		.then(({data}) => {
			resourcesForLinks.value = data
		})
})

const drawer = reactive({
	state: false,
	context: 'assets'
})

/* Insert Images */
Invicta.on('ckeditor-insert-image', () => {
	drawer.context = 'assets'
	drawer.state = true
})

const updateAsset = (asset) => {
	drawer.state = false
	let command = {
		name: 'invictaInsertImage',
		data: {
			image_url: asset.src,
			image_alt: asset.alt
		}
	}
	Invicta.emit('ckeditor-execute-command', command);
}

/* Setup Insert Internal links */
const columns = {
	title: { label: 'Title', sortable: true },
	uri: { label: 'Uri' }
}

Invicta.on('ckeditor-insert-link', () => {
	drawer.context = 'items'
	drawer.state = true
})

const insertItems = (selected) => {

	console.log('got items for links' , selected)
	drawer.state = false
	let command = {
		name: 'invictaAddLink',
		data: {
			resource_url: selected[0].item.uri,
			resource_title: selected[0].item.title
		},
	}
	Invicta.emit('ckeditor-execute-command', command)
}
</script>