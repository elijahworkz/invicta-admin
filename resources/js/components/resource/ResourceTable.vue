<template>
    <div class="resource-table">
        <el-table ref="resourceTableRef" :data="data" v-bind="tableSettings" highlight-current-row
            @selection-change="$emit('select', $event)" @current-change="$emit('single-select', $event)"
            @sort-change="handleSortChange" @row-click="handleRowClick">
            <el-table-column v-if="!singleSelect && !noSelect" type="selection" fixed />

            <template v-for="(column, key) in visibleColumns">
                <Column :id="key" :props="column" :can-edit="canEdit" :has-detail="hasDetail"
                    @edit="$emit('edit', $event)" />
            </template>

            <el-table-column v-if="!noActions" width="100" header-align="right" column-key="no-select" fixed="right">
                <template #header v-if="columnsSelect">
                    <TableSettings :tree-model="treeModel" :table-props="tableSettings" />
                </template>

                <template #default="scope">
                    <RowActions :id="scope.row.id" :resource-handle="resourceHandle" :actions="scope.row.actions || []"
                        :can-edit="canEdit" :can-delete="canDelete" :has-detail="hasDetail"
                        @delete="$emit('delete', $event)" />
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
const props = defineProps({
    resourceHandle: String,
    data: Array,
    tableProps: Object,
    columns: Object,
    canEdit: {
        type: Boolean,
        default: false,
    },
    canDelete: {
        type: Boolean,
        default: false,
    },
    hasDetail: {
        type: Boolean,
        default: false,
    },
    noActions: {
        type: Boolean,
        default: false,
    },
    singleSelect: {
        type: Boolean,
        default: false,
    },
    noSelect: {
        type: Boolean,
        default: false,
    },
    columnsSelect: {
        type: Boolean,
        default: true,
    },
});

const resourceTableRef = ref();
const treeModel = ref([]);
const tableSettings = reactive(
    JSON.parse(Invicta.remember(`table-settings`)) ?? props.tableProps,
);

watch(tableSettings, (settings) => {
    Invicta.remember("table-settings", JSON.stringify(settings));
});

let columns = map(props.columns, (item, index) => {
    return {
        label: item.label,
        value: index,
        checked: item.hidden ? false : true,
    };
});

treeModel.value = props.columnsSelect
    ? JSON.parse(Invicta.remember(`${props.resourceHandle}-index-columns`)) ||
    columns
    : columns;

const visibleColumns = computed(() => {
    let visible = checked(treeModel.value);

    if (props.columnsSelect) {
        Invicta.remember(
            `${props.resourceHandle}-index-columns`,
            JSON.stringify(treeModel.value),
        );
    }

    return pickBy(props.columns, (column, index) => visible.includes(index));
});

tableSettings.value = JSON.parse(Invicta.remember(`${props.tableProps}`));

// Handle sorting
const handleSortChange = ({ prop, order }) => {
    console.log("before sort event", prop, order);
    Invicta.emit("sort-change", { prop, order });
};

// Handle Row click
const handleRowClick = (row, column, event) => {
    if (!column.columnKey && column.columnKey != "no-select") {
        resourceTableRef.value.toggleRowSelection(row, undefined);
    }
};

// Handle Table settings update
const updateTableSettings = (event) => {
    console.log("I hear table settings update event", event);
    tableSettings.value = event;
};

// Expose Clear selection to parents
const clearSelection = () => {
    resourceTableRef.value.clearSelection();
};
defineExpose({ clearSelection });
</script>
