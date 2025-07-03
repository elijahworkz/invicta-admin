<template>
    <div class="py-6 px-10">
        <FormBase
            v-if="resourceItem"
            :form-id="formId"
            :resource="resourceItem"
            :action-url="resourceItem.meta.actionUrl"
            :breadcrumb="{
                name: 'resourceIndex',
                params: { handle: route.params.handle },
                text: resourceItem.meta.indexTitle,
            }"
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
        let data = await Invicta.fetch.get(`api${to.path}`, {
            params: to.query,
        });
        to.meta.data = data;
    },
});

const props = defineProps({
    data: null | Object,
});

import { useRoute, onBeforeRouteUpdate } from "vue-router";
const route = useRoute();
const loading = ref(false);
const resourceItem = ref(props.data);

const user = Invicta.user;
const activeUsers = ref([]);
const formId = computed(() => {
    return `resource/${route.params.handle}/${route.params.id || "create"}`;
});
// const formId = `${handle}.${route.params.id || 'new'}`
//
watch(
    () => route.params.handle + route.params.id,
    () => {
        console.log("I see params change");
        // resourceItem.value = route.meta.data
        loading.value = true;
        resourceItem.value = null;
        Invicta.fetch.get(`api${route.path}`).then(({ data }) => {
            resourceItem.value = data;
            loading.value = false;
        });
    },
);

onMounted(() => {
    // window.Echo.join(channel.value)
    // 	.here(users => {
    // 		console.log('I got these users', users)
    // 	})
    // 	.joining(user => console.log('someone came in', user))
    // 	.leaving(user => console.log('someone just left', user))
    // 	.error(error => console.log('there was an error', error))
});

// const resource = toRaw(props.resource)

// const formKey = computed(() => {
// 	let key = resource.meta?.id || 'new'
// 	return `${key}-${activeUsers.value.length}`
// })
const readOnly = false;
// const readOnly = computed(() => {
// 	return false //activeUsers.value.length > 1 && activeUsers.value[0].id !== user.id
// })

function getResourceItem(url) {
    loading.value = true;

    Invicta.fetch.get(url).then(({ data }) => {
        console.log("we have some info here", data);
        loading.value = false;
        // resourceFormId.value = `${settings.handle}.${data.item.id}`
        resourceItem.value = data;
        // indexFormActionUrl.value = `${resource.meta.path}/${item}`
        // drawer.value = true
    });
}
</script>
