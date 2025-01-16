<template>
	<div class="google-preview">
		<div class="google-preview_label mb-2"> Google search preview </div>
		<div class="google-preview_box mb-2">
			<p class="google-preview_title">{{ preview.title }}</p>
			<p class="google-preview_link">{{ preview.url }}</p>
			<p class="google-preview_description">{{ preview.description }}</p>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	formId: String,
	data: Object,
	path: String
})

const resourceForm = useResourceForm(props.formId)
// const uri = resourceForm.data?.uri
const uri = computed(() => resourceForm.get('uri') ?? '')
const slug = computed(() => resourceForm.get('slug') ?? '')

const previewUri = computed(() => {
	if (! uri.value) {
		return slug.value
	}

	let uriParts = uri.value.split('/')

	uriParts[uriParts.length - 1] = slug.value

	return uriParts.join('/')
})

const preview = computed( () => {

	const titleFieldName = props.data.props && props.data.props.titleField ? props.data.props.titleField : 'seo.title'
	const descriptionFieldName = props.data.props && props.data.props.descriptionField ? props.data.props.descriptionField : 'seo.description'
	return {
		title: resourceForm.get(titleFieldName),
		url: Invicta.config.appUrl + previewUri.value,
		description: resourceForm.get(descriptionFieldName)
	}
})

</script>

<style lang="scss">
.google-preview_box {
	width: 100%;
	border-radius: 4px;
	padding: 10px 15px;
	box-shadow: 0 0 0 1px rgb(49 49 93 / 5%), 0 2px 5px 0 rgb(49 49 93 / 8%), 0 1px 3px 0 rgb(49 49 93 / 15%);
	font-size: 13px;
}

.google-preview_title {
	color: #1a0dab;
	font-size: 16px;
}
.google-preview_link {
	color: #006621;
}
.google-preview_description {
	color: #545454;
}
</style>