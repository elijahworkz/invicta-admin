<template>
    <FieldBase
        :form-id="formId"
        :field-props="props"
        :class="{ 'is-error': jsonError }"
    >
        <div class="code-wrapper">
            <codemirror
                v-model="stringValue"
                :style="{ height: 'auto', width: '100%' }"
                :autofocus="true"
                :indent-with-tab="true"
                :tab-size="4"
                :extensions="extensions"
            />
        </div>
    </FieldBase>
</template>

<script setup>
import { Codemirror } from "vue-codemirror";
import { json } from "@codemirror/lang-json";
import { css } from "@codemirror/lang-css";
import { oneDark } from "@codemirror/theme-one-dark";
// import { ElMessage } from 'element-plus'

const props = defineProps({
    formId: String,
    data: Object,
    path: String,
});
const field = useFormField(props);
const value = field.value();
const cssField = "css" in props.data && props.data.css == true;
const lang = cssField ? css() : json();

const jsonError = ref(false);
const stringValue = cssField
    ? value.value
    : ref(JSON.stringify(value.value, null, "\t"));

const extensions = [lang, oneDark];
if (!cssField) {
    watch(
        stringValue,
        debounce((_code) => {
            try {
                value.value = JSON.parse(_code);
                jsonError.value = false;
            } catch (error) {
                jsonError.value = true;
                ElMessage.error("You have some errors in your JSON");
                console.log("error in json", error.message);
            }
        }, 500),
    );
} else {
    watch(stringValue, (code) => (value.value = JSON.parse(code)));
}
</script>

<style lang="scss">
.cm-editor {
    .is-error & {
        border: 2px solid var(--el-color-danger);
    }
}
</style>
