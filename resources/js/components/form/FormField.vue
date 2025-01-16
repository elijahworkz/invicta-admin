<template>
	<div v-if="showField" :class="fieldClass()">
		<component
			:is="fieldComponent" 
			:form-id="formId"
			:data="fieldData" 
			:path="dataPath"/>
	</div>
</template>

<script setup>
const props = defineProps({
	formId: String,
	fieldData: Object,
	dataPath: String
})

let fieldComponent = shallowRef('textField')
let id = props.dataPath && props.dataPath.includes('.') ? split(props.dataPath, '.')[0] : props.dataPath
// let path = id == 'data' ? `_${props.dataPath}` : props.dataPath

const showField = useFieldCondition(props.fieldData, props.formId)
if (showField) {

	if (Invicta.componentExists(props.fieldData.type)) {
		fieldComponent.value = props.fieldData.type
	} else {

		let fieldType = props.fieldData.type.replace('-', '')
		fieldType = fieldType == 'group' ? 'json' : fieldType

		import(`./fields/${fieldType}Field.vue`)
			.then(value => fieldComponent.value = value.default)
			.catch(err => console.log(err))
	}

}

const { type } = props.fieldData

const fieldClass = () => {
	if (type == 'divider' && props.fieldData.section) {
		return 'section'
	} 

	if (type == 'row') {
		return ['field-row-full', 'inline-fields']
	}
	
	if (type == 'hidden') {
		return 'hidden'
	}

	return [`field-row-${get(props.fieldData, 'width', 'full')}`, get(props.fieldData, 'customClass', '')]
}
</script>