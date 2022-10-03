<template>
	<FieldRow v-if="showField" :field-data="fieldData">
		<component 
			:is="fieldComponent" 
			:form-id="formId"
			:data="fieldData" 
			:path="path"/>
	</FieldRow>
</template>

<script setup>
const props = defineProps({
	formId: String,
	fieldData: Object,
	dataPath: String
})

let fieldComponent = shallowRef('textField')
let path = props.dataPath == 'data' ? '_data' : props.dataPath

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
</script>