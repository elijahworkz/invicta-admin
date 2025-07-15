<template>
    <div class="py-6 px-10" v-if="resourceIndex.static.settings">
        <div class="flex items-end justify-start mb-4">
            <div class="flex-auto mr-4">
                <h1 class="mb-1">{{ resourceIndex.static.settings.title }}</h1>
                <div class="max-w-sm">
                    <Search
                        :currentSearch="route.query.search"
                        :key="handle"
                        @update="resourceIndex.setSearch"
                    />
                </div>
            </div>
            <div class="ml-auto flex items-center">
                <LocaleSwitch
                    v-if="resourceIndex.static.settings.locales"
                    :locales="resourceIndex.static.settings.locales"
                />
                <Actions
                    v-if="resourceIndex.static.actions?.global"
                    :global="true"
                    :actions="resourceIndex.static.actions.global"
                    name="Resource Actions"
                />
                <slot name="actions" :settings="resourceIndex.static.settings">
                    <router-link
                        :to="{ name: 'resourceCreate' }"
                        v-show="resourceIndex.static.settings.canCreate"
                    >
                        <el-button type="primary" size="large"
                            >Create new</el-button
                        >
                    </router-link>
                </slot>
            </div>
        </div>

        <div class="el-card">
            <div class="flex items-center justify-start p-3">
                <div class="mr-2 leading-none">
                    Total: <strong>{{ resourceIndex.data.total }}</strong>
                </div>
                <div>
                    <FilterBadges :badges="resourceIndex.data.filterBadges" />
                </div>

                <div class="ml-auto leading-none flex items-center">
                    <el-link
                        v-if="canResetFilters"
                        @click="resourceIndex.clearFilters"
                        :underline="false"
                        type="danger"
                        class="mr-2"
                        >Clear all filters</el-link
                    >
                    <Filters
                        v-if="resourceIndex.static.filters"
                        :resource-handle="handle"
                        :filters="resourceIndex.static.filters"
                        :active-filters="resourceIndex.data.activeFilters"
                    />
                </div>
            </div>

            <div
                class="bg-slate-100 px-3 py-2 flex items-center justify-between"
                v-if="selectedRows.length"
            >
                <div class="flex items-center leading-none">
                    <span class="mr-2 text-sm">{{ selectedText }}</span>
                    <el-link
                        v-if="!selectedAll"
                        type="primary"
                        :underline="false"
                        @click="selectAll"
                        class="mr-2"
                        >Select all {{ resourceIndex.data.total }}</el-link
                    >
                    <el-link :underline="false" type="info" @click="deselect"
                        >Deselect all</el-link
                    >
                </div>
                <div class="ml-auto flex items-center">
                    <Actions
                        v-if="resourceIndex.static.actions?.bulk"
                        name="Bulk Actions"
                        :actions="resourceIndex.static.actions.bulk"
                        :selected="selectedRows"
                        :selected-all="selectedAll"
                    />
                    <div
                        v-show="resourceIndex.static.settings.canDelete"
                        class="ml-3"
                        title="Delete Selected"
                    >
                        <el-button :icon="Delete" @click="handleBulkDelete" />
                    </div>
                </div>
            </div>

            <slot
                :resource="resourceIndex.data.resourceData"
                :settings="resourceIndex.static.settings"
                :handle-edit="handleEdit"
                :handle-select="handleSelect"
                :handle-delete="handleDelete"
            >
                <ResourceTable
                    ref="resourceTableRef"
                    :key="handle"
                    :resource-handle="handle"
                    :data="resourceIndex.data.resourceData"
                    :table-props="resourceIndex.static.settings.table"
                    :columns="resourceIndex.static.settings.columns"
                    :can-edit="resourceIndex.static.settings.canEdit"
                    :can-delete="resourceIndex.static.settings.canDelete"
                    :has-detail="resourceIndex.static.settings.hasDetail"
                    @select="handleSelect"
                    @edit="handleEdit"
                    @delete="handleDelete"
                    v-loading="resourceIndex.data.loading"
                />
            </slot>

            <div class="flex items-center justify-between p-3 mt-2">
                <div>
                    Total: <strong>{{ resourceIndex.data.total }}</strong>
                </div>
                <el-pagination
                    background
                    size="small"
                    layout="jumper, prev, pager, next, sizes"
                    :current-page="resourceIndex.data.currentPage"
                    :page-size="resourceIndex.data.perPage"
                    :total="resourceIndex.data.total"
                    @update:page-size="resourceIndex.setPageSize"
                    @update:current-page="resourceIndex.setPage"
                />
            </div>
        </div>
    </div>

    <div v-else class="p-10 flex items-center justify-center">
        <Loading />
    </div>

    <ActionsModal :actions-url="actionsUrl" />

    <Drawer v-if="drawer" @close="drawer = false" :style="{ width: '80%' }">
        <el-scrollbar>
            <div class="px-8 pb-4 pt-12 w-full">
                <FormBase
                    class="mx-auto"
                    :key="drawerFormId"
                    :form-id="drawerFormId"
                    :resource="drawerItem"
                    :action-url="drawerFormActionUrl"
                    :params="drawerFormParams"
                    :post-submit-actions="['close', 'edit']"
                    @submitted="afterSubmit"
                >
                </FormBase>
            </div>
        </el-scrollbar>
    </Drawer>
</template>

<script setup>
import { Delete } from "@element-plus/icons-vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

const props = defineProps({
    handle: String,
});

const resourceIndex = useResource(props.handle);
resourceIndex.initIndex(route);

const resourceTableRef = ref();

/* Setup drawer */
const drawer = ref(false);
const drawerFormId = ref();
const drawerItem = ref();
const drawerFormActionUrl = ref("");
const drawerFormParams = ref({});

/* Handle Actions */
const actionsUrl = `api${route.path}/actions`;

onMounted(() => {
    Invicta.on("action-called", handleActions);
});

onUnmounted(() => {
    Invicta.off("action-called", handleActions);
});

const handleActions = ({ action, selected }) => {
    // console.log('action-called', action, action.modal);
    if (action.modal) {
        // Action modal is opened. If action has form - it will
        // be setup from there
        Invicta.emit("show-action-modal", { action, selected });
    } else {
        // We have Drawer form action
        // need to get the blueprint first
        let item = null;

        drawerFormParams.value = {
            class: action.class,
        };

        if (selected.length) {
            drawerFormParams.value.selected = selected;
            item = selected[0];
        }

        Invicta.fetch
            .get(`${actionsUrl}/blueprint/${item}`, {
                params: { class: action.class },
            })
            .then((data) => {
                drawerFormId.value = `${props.handle}.${item}.${action.class}`;
                drawerItem.value = data;
                drawerFormActionUrl.value = actionsUrl;
                drawer.value = true;
            });
    }
};

// Handle Edit
const handleEdit = (item) => {
    if (resourceIndex.static.settings.indexEdit) {
        let itemUrl = `api${route.path}/${item}`;
        drawerFormParams.value = {};

        Invicta.fetch.get(`${itemUrl}/edit`).then((data) => {
            drawerFormId.value = `${props.handle}.${data.item.id}`;
            drawerItem.value = data;
            drawerFormActionUrl.value = itemUrl;
            drawer.value = true;
        });
    } else {
        router.push({
            name: "resourceEdit",
            params: { handle: props.handle, id: item },
        });
    }
};

/* Setup Selection */
const selectedAll = ref(false);
const selectedRows = ref([]);
const handleSelect = (selection) => {
    selectedAll.value = false;
    selectedRows.value = selection.map((row) => row.id);
};

const selectAll = async () => {
    let result = await resourceIndex.selectAll();
    selectedAll.value = true;
    selectedRows.value = result.data;
};

const selectedText = computed(() => {
    let records = selectedAll.value
        ? resourceIndex.data.total
        : selectedRows.value.length;
    return `${records} records selected`;
});

const deselect = () => {
    selectedAll.value = false;
    resourceTableRef.value.clearSelection();
    selectedRows.value = [];
};

// Handle filters
const canResetFilters = computed(
    () => !isEmpty(resourceIndex.data.activeFilters),
);

/* Handle Delete Actions */
const handleDelete = (selected) => {
    ElMessageBox.confirm(
        "This action will permanently delete records from database. Are you sure you want to continue?",
        "Deleting",
        {
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            confirmButtonClass: "el-button--danger",
        },
    )
        .then(() => {
            Invicta.fetch
                .delete(`api${route.path}`, { selected })
                .then((data) => {
                    Invicta.message(data.message);
                    resourceIndex.getResource();
                });
        })
        .catch((error) => {
            console.log("cancel", error);
        });
};

const handleBulkDelete = () => {
    if (selectedRows.value.length) {
        handleDelete(selectedRows.value);
    }
};

const afterSubmit = (event) => {
    if (event.action == "close") {
        drawer.value = false;
    }
    resourceIndex.getResource();
};

Invicta.on("refresh-resource", () => {
    resourceIndex.getResource();
});
</script>
