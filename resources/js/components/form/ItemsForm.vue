<template>
  <el-scrollbar>
    <div class="w-9/12 pt-12 mx-auto">
      <FormBase
        v-if="resource"
        :key="formId"
        :form-id="formId"
        :resource="resource"
        :action-url="resource.meta.actionUrl"
        :post-submit-actions="['close', 'create']"
        @form-ready="prepopulateFields"
        @submitted="handleSubmit"
      >
        <template #form-actions>
          <el-button class="ml-auto mr-2" text @click="$emit('cancel')"
            >Cancel</el-button
          >
        </template>
      </FormBase>
    </div>
  </el-scrollbar>
</template>

<script setup>
const props = defineProps({
  requestUrl: String,
  createWith: Object,
});
const emit = defineEmits(["submit"]);

const resource = ref(null);
const formId = ref(null);
const counter = ref(0);
const { createWith } = props;

onMounted(() => {
  Invicta.fetch.get(props.requestUrl).then((data) => {
    resource.value = data;
    formId.value = data.meta.id
      ? `${data.meta.handle}.${data.meta.id}`
      : `${data.meta.handle}.${counter.value}.new`;
  });
  counter.value++;
});

const prepopulateFields = () => {
  if (createWith) {
    const resourceForm = useResourceForm(formId.value);
    resourceForm.set(createWith.field, createWith.value);
    resourceForm.setReadOnly(createWith.field);
  }
};

const handleSubmit = (event) => {
  console.log("we have handle submit in Items Form", event);
  if (event.action == "back" || event.action == "close") {
    emit("submit");
  }
};
</script>
