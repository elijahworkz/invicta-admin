<template>
    <div class="sun-toolbar"></div>
    <textarea :id="editorId"></textarea>
</template>

<script setup>
import 'suneditor/dist/css/suneditor.min.css'
import suneditor from 'suneditor'
import { blockquote, align, fontColor, link, fontSize, formatBlock, list, table, image } from 'suneditor/src/plugins'

const props = defineProps({
    id: String,
    initialValue: String,
    disabled: Boolean,
})
const emit = defineEmits(['updated'])
const editorId = `${props.id}-sun-editor`

const customImage = {
    name: 'custom_image',
    display: 'command',
    title: 'Insert Image',
    innerHTML: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.75 15.77"><g><path d="M8.77,8.72a.88.88,0,0,1-.61-.27.82.82,0,0,1-.25-.61.89.89,0,0,1,.25-.62A.82.82,0,0,1,8.77,7a.81.81,0,0,1,.61.25.83.83,0,0,1,.27.62.81.81,0,0,1-.25.61.91.91,0,0,1-.63.27Zm9.62-5a1.74,1.74,0,0,1,1.76,1.76V17.76a1.74,1.74,0,0,1-1.76,1.76H6.16A1.74,1.74,0,0,1,4.4,17.76V5.51A1.74,1.74,0,0,1,6.16,3.75H18.39Zm0,1.75H6.16v8L8.53,11.8a.94.94,0,0,1,.54-.17.86.86,0,0,1,.54.2L11.09,13l3.64-4.55a.78.78,0,0,1,.34-.25.85.85,0,0,1,.42-.07.89.89,0,0,1,.39.12.78.78,0,0,1,.28.29l2.24,3.67V5.51Zm0,12.24V15.6L15.3,10.53,11.89,14.8a.89.89,0,0,1-.59.32.82.82,0,0,1-.64-.18L9,13.62,6.16,15.74v2Z" transform="translate(-4.4 -3.75)"></path></g></svg>',
    action: function () {
        const eventData = {
            name: `${props.id}-insert-image`,
            mediaType: "image",
        };
        window.Invicta.emit("open-media-library", eventData);
    },
    add: function () { }
}


let editor
onMounted(() => {
    editor = suneditor.create(editorId, {
        strictMode: false,
        plugins: [blockquote, align, fontColor, link, fontSize, formatBlock, list, table, image, customImage],
        width: '100%',
        height: 'auto',
        buttonList: [
            ['formatBlock', 'fontSize', 'fontColor'],
            ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
            ['align', 'list'],
            ['blockquote', 'custom_image', 'link', 'table'],
            ['removeFormat'],
            ['-right', 'undo', 'redo', 'codeView'],
        ],
        defaultStyle: 'font-size: 16px',
        fontSize: [14, 16, 18, 20, 22, 24],
        formats: ['p', 'h2', 'h3'],
    })

    editor.setContents('')
    editor.insertHTML(props.initialValue)
    editor.onChange = (contents) => emit('updated', contents)

    Invicta.on(`${props.id}-insert-image`, (asset) => {
        editor.insertHTML(`<img src="${asset.src}" alt="${asset.alt}">`, true, true)
    })
})
</script>

<style lang="scss">
.sun-editor {
    width: 100%;

    .audio-button {
        margin-bottom: 0.5rem;

        .button-wrap {
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }

        .image {
            margin: 0 10px 0 0;
        }

        p {
            margin: 0;
        }
    }
}
</style>
