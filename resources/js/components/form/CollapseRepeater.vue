<template>
    <div class="repeater-field">
        <div class="accordion inner">
            <draggable
                :list="list"
                handle=".drag-handle"
                item-key="index"
                :disabled="disableDraggable"
                @update="$emit('updated', list)"
            >
                <template #item="{ element, index }">
                    <details
                        :name="`${randomId}-item-${index}`"
                        :disabled="readOnly"
                    >
                        <summary>
                            <DragHandle v-if="!disableDraggable" />
                            <span class="ms-2 summary-text">{{
                                itemTitle(element, index)
                            }}</span>
                            <el-button
                                v-if="!readOnly"
                                type="danger"
                                text
                                :icon="Delete"
                                @click="removeRow(index)"
                            ></el-button>
                        </summary>
                        <div class="details-body">
                            <div :class="panelClass">
                                <slot :item="element" :index="index"></slot>
                                <div class="flex-full text-end mt-2">
                                    <el-button
                                        type="danger"
                                        text
                                        @click="removeRow(index)"
                                        :icon="Close"
                                    >
                                        Remove {{ itemName }}
                                    </el-button>
                                </div>
                            </div>
                        </div>
                    </details>
                </template>
            </draggable>
        </div>
        <div class="mt-3" v-if="!readOnly">
            <el-button type="primary" @click="addRow"
                >Add {{ itemName }}</el-button
            >
        </div>
    </div>
</template>

<script setup>
import draggable from "vuedraggable";
import { Close, Delete } from "@element-plus/icons-vue";

const props = defineProps({
    list: {
        type: Array,
        default: [],
        required: true,
    },
    default: {
        type: Object,
        default(rawProps) {
            return {};
        },
    },
    itemName: {
        type: String,
        default: "row",
    },
    itemTitle: {
        type: Function,
        default(item, index) {
            return "Empty";
        },
    },
    panelClass: {
        type: String,
        default: "",
    },
    disableDraggable: {
        type: Boolean,
        default: false,
    },
    readOnly: {
        type: Boolean,
        default: false,
    },
});

const randomId = Math.random().toString(36).substring(2, 15);

const emit = defineEmits(["updated"]);
const defaultRow = props.list.length ? props.list[0] : props.default;

function addRow() {
    let row = clone(defaultRow);
    let cloneList = toRaw(props.list);

    let updated = [...cloneList, row];
    emit("updated", updated);
}

function removeRow(index) {
    props.list.splice(index, 1);
}
</script>
