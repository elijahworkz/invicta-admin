<template>
    <div class="ckeditor">
        <ckeditor ref="ckeditor" @ready="onReady" :editor="editor" :config="editorConfig" v-model="editorValue"/>
    </div>
</template>

<script setup>
import CkeditorVue from '@ckeditor/ckeditor5-vue'
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import editorConfig from './config.js'

const props = defineProps({
	initialValue: String,
})

const emit = defineEmits(['updated'])

const Ckeditor = CkeditorVue.component
const editor  = ClassicEditor
const editorValue = ref(props.initialValue)

const onReady = (editor) => {
    Invicta.on( `${editor.id}-insert-image`, (asset) => {
        editor.execute('editorInsertImage', {image_url: asset.src, image_alt: asset.alt})
    })
    Invicta.on( `${editor.id}-insert-link`, (selected) => {
        const data = {
            resource_url: selected[0].item.uri,
            resource_title: selected[0].item.title
        }
        editor.execute('editorAddLink', data)
    })
}

watch(editorValue, debounce(newValue => {
	emit('updated', newValue)
}, 1000))
</script>
