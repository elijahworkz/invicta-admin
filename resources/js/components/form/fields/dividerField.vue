<template>
	<template v-if="data.section">
		<h2 v-text="sectionTitle()"></h2>
		<p v-if="sectionDescription" v-html="sectionDescription"></p>
	</template>
	<el-divider v-else content-position="left" v-bind="data.props">{{ data.content }}</el-divider>
</template>

<script setup>
const props = defineProps({
	formId: String,
	data: Object,
	path: String
})

const sectionTitle = () => {
	if (isString(props.data.content)) 
		return props.data.content

	return get(props.data, 'content.title')
}

const sectionDescription = get(props.data, 'content.description')
</script>
