<template>
    <FieldBase :form-id="formId" :field-props="props">
        <el-select
            v-model="fieldValue"
            v-bind="data.props"
            :value-key="data.valueKey || null"
            :teleported="false"
            :remote-method="getOptions"
            :disabled="field.disabled"
        >
            <template #label="{ label, value }">
                <div class="flex justify-between">
                    <span>{{ label }}</span>
                    <span v-if="value.group" class="opacity-50">{{
                        value.group
                    }}</span>
                </div>
            </template>
            <el-option-group
                v-if="optionsReady"
                v-for="group in options"
                :key="group.label"
                :label="group.label"
            >
                <el-option
                    v-for="(item, index) in group.options"
                    :key="index"
                    :value="item[valueField]"
                    :label="item[labelField]"
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
const optionsReady = ref(false);

const resourceForm = useResourceForm(props.formId);
const field = useFormField(props);
const fieldValue = field.value();
const options = ref([]);

const valueField = props.data.valueField || "value";
const labelField = props.data.labelField || "label";
console.log("initializing the group select field", props.data.id);

if (Array.isArray(props.data.options)) {
    options.value = props.data.options;
    optionsReady.value = true;
} else if (!props.data.props?.remote) {
    let groupOptions = resourceForm.remoteData.get(props.data.options);

    if (Array.isArray(groupOptions)) {
        options.value = filterGroup(groupOptions);
        optionsReady.value = true;
        console.log("group options are ready", props.data.id);
    } else {
        console.log("group options are NOT ready", props.data.id);
        Invicta.on(props.data.options, () => {
            options.value = filterGroup(
                resourceForm.remoteData.get(props.data.options),
            );
            optionsReady.value = true;
            console.log("group options are FINALLY ready", props.data.id);
        });
    }
}

function filterGroup(options) {
    if (props.data.hasOwnProperty("filterBy")) {
        return options.filter((group) =>
            props.data.filterBy.includes(group.handle),
        );
    }
    return options;
}

function getOptions() {
    Invicta.fetch.get(props.data.options).then((data) => {
        options.value = data;
        optionsReady.value = true;
    });
}

function groupLabel(label, value) {
    let groupTitle = value.hasOwnProperty("group")
        ? `<span class="text-muted">${value.group}</span>`
        : "";
    return `<div class="d-flex content-space-between><span>${label}</span>${groupTitle}`;
}
</script>
