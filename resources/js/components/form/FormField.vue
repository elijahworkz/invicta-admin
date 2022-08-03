<template>
	<FieldRow v-if="showField" :field-data="fieldData">
		<component :is="fieldComponent" :data="fieldData" :path="dataPath"></component>
	</FieldRow>
</template>

<script setup>
import { shallowRef, computed } from 'vue'
import { useFieldCondition } from '@/services/form/condition'
import FieldRow from '@/components/form/FieldRow.vue'

const props = defineProps({
	fieldData: Object,
	dataPath: String
})

let fieldComponent = shallowRef('textField')

const showField = useFieldCondition(props.fieldData)
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