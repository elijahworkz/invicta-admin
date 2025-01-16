<template>
	<div class="ckeditor">
		<ckeditor ref="ckeditor" @ready="onReady" :editor="editor" v-model="editorValue" :disabled="disabled"/>
	</div>
</template>

<script setup>
import CkeditorVue from '@ckeditor/ckeditor5-vue'
import ClassicEditor from 'ckeditor5-build-invicta'

const props = defineProps({
	initialValue: String,
	disabled: Boolean
})

const emit = defineEmits(['updated'])

const Ckeditor = CkeditorVue.component
const editor  = ClassicEditor
const editorValue = ref(props.initialValue)
const editorInstance = ref(null)

Invicta.on('ckeditor-execute-command', (command) => {
	editorInstance.value.execute(command.name, command.data)
})

Invicta.on('resource-form-submitted', (event) => {
	if (event.action && event.action == 'create') {
		editorValue.value = ''
	}
})

const onReady = (editor) => {
	editorInstance.value = editor
}

watch(editorValue, debounce(newValue => {
	emit('updated', newValue)
}, 1000))

</script>

<style lang="scss">
.ckeditor {
	width: 100%;
	font-size: 16px;

	h2, h3, h4 {
		font-weight: 600;
		margin-bottom: 15px;
		line-height: 1.2;
	}

	h2 {
		font-size: 30px;
	}

	h3 {
		font-size: 26px;
	}

	h4 {
		font-size: 20px;
	}

	p {
		line-height: 1.3;
		margin-bottom: 1em;
	}

	a {
		color: var(--el-color-primary);
		text-decoration: underline;
		cursor: pointer;
	}

	ul, ol {
		display: block;
		margin-block-start: 1em;
		margin-block-end: 1em;
		margin-inline-start: 0px;
		margin-inline-end: 0px;
		padding-inline-start: 40px;
	}

	ul {
		list-style-type: disc;
	}

	ol {
		list-style: decimal;
	}
}
</style>