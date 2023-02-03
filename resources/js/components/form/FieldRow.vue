<template>
	<div :class="fieldClass">
		<slot />
	</div>
</template>

<script setup>
const props = defineProps({
	fieldData: Object
})

const { type } = props.fieldData

const fieldClass = computed(() => {

	let wrapperClass

	if (type == 'divider' && props.fieldData.section) {
		wrapperClass = 'section'
	} else if (type == 'row') {
		wrapperClass = ['field-row-full', 'inline-fields']
	} else {
		wrapperClass = [`field-row-${get(props.fieldData, 'width', 'full')}`, get(props.fieldData, 'customClass', '')]
	}

	return wrapperClass
})
</script>