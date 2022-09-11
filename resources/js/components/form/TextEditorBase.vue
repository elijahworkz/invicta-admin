<template>
	<div class="ckeditor">
		<ckeditor ref="ckeditor" @ready="onReady" :editor="editor" v-model="editorValue" />
	</div>
</template>

<script>
import CkeditorVue from '@ckeditor/ckeditor5-vue'
import ClassicEditor from 'ckeditor5-build-invicta'

export default {
	name: 'TextEditorBase',

	props: {
		initialValue: String
	},

	components: {
		ckeditor: CkeditorVue.component
	},

	data() {
		return {
			editor: ClassicEditor,
			editorValue: ''
		}
	},

	watch: {
		editorValue(newValue) {
			this.$emit('updated', newValue)
		} 
	},

	methods: {
		onReady() {
			this.editorValue = this.initialValue
		}
	}
}
</script>