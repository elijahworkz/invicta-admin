<template>
    <FieldBase :form-id="formId" :field-props="props" :key="path">
        <el-select
            v-model="fieldValue"
            filterable
            clearable
            allow-create
            :placeholder="data.props?.placeholder"
            :disabled="field.disabled"
        >
            <el-option-group
                v-for="group in options"
                :key="group.label"
                :label="group.label"
            >
                <el-option
                    v-for="item in group.options"
                    :key="item.value"
                    :value="item.value"
                    :label="item.label"
                />
            </el-option-group>
        </el-select>
    </FieldBase>
</template>

<script setup>
const props = defineProps({
    formId: String,
    data: Object,
    path: String,
});
const resourceForm = useResourceForm(props.formId);
const field = useFormField(props);
const fieldValue = field.value();

const options = computed(() => {
    let allOptions = resourceForm.remoteData.get("linkField");
    console.log("I have options", allOptions);
    if ("resources" in props.data) {
        return allOptions.filter((option) =>
            props.data.resources.includes(option.handle),
        );
    }

    return allOptions;
});
</script>
