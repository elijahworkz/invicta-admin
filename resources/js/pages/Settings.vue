<template>
    <div class="py-6 px-10">
        <FormBase
            v-if="settingsData"
            form-id="settings"
            :resource="settingsData"
            :action-url="settingsData.actionUrl"
            :post-submit-actions="['disabled']"
            :read-only="readOnly"
            :page-form="true"
            v-loading="loading"
        >
        </FormBase>
    </div>
</template>

<script setup>
defineOptions({
    beforeRouteEnter: async function (to) {
        let data = await Invicta.fetch.get(`api${to.path}`);
        to.meta.data = data;
    },
});

const props = defineProps({
    data: null | Object,
});

const loading = ref(false);
const settingsData = ref(props.data);

const readOnly = false;

// TODO: Localization for the fields
</script>
