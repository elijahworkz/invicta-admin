<template>
	<FieldBase :form-id="formId" :field-props="props" :style="{'--grid-column': `repeat(${columns}, 1fr)` }">
    <el-checkbox-group v-model="fieldValue">
      <el-checkbox v-for="(option) in options" :value="option[valueField]" :label="option[labelField]"/>
    </el-checkbox-group>
	</FieldBase>
</template>

<script setup>
const props = defineProps({
  formId: String,
  data: Object,
  path: String
})

const resourceForm = useResourceForm(props.formId)
const field = useFormField(props)
const fieldValue = field.value([])
const options = ref([])
const columns = props.data.columns ?? 1

const valueField = props.data.valueField || 'value'
const labelField = props.data.labelField || 'label'

if (Array.isArray(props.data.options)) {
  options.value = props.data.options
} else {
  options.value = resourceForm.remoteData.get(props.data.options)

  if (! Array.isArray(options.value)) {
    Invicta.on(props.data.options, () => {
      options.value = resourceForm.remoteData.get(props.data.options)
    })
  }
}

</script>

<style lang="scss">
  .el-checkbox-group {
    display: grid;
    grid-template-columns: var(--grid-column);
  }
</style>