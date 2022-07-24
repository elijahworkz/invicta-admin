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
let fieldType = props.fieldData.type.replace('-', '')
fieldType = fieldType == 'group' ? 'json' : fieldType

const showField = useFieldCondition(props.fieldData)
if (showField) {
	import(`./fields/${fieldType}Field.vue`)
		.then(value => fieldComponent.value = value.default)
		.catch(err => console.log(err))
}
</script>