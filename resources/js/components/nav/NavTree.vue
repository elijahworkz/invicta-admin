<template>
    <draggable :list="list" tag="ul" :group="{ name: 'g1' }" :animation="150" item-key="label"
        @change="$emit('change', true)">
        <template #item="{ element, index }">
            <li>
                <div class="item flex items-center justify-start border rounded bg-white mb-1 p-2"
                    :class="{ 'error': element.error }">
                    <DragHandle class="mr-2 text-gray-300 hover:text-gray-400" />
                    <el-link :underline="false" @click="handleEdit(element)">{{ element.label }}</el-link>
                    <div class="ml-auto item-type">{{ element.error ? `${element.type} | Error` : element.type }}</div>

                    <ActionsDropdown :actions="childActions" :item="{ index, ...element }" title="New Child Item"
                        @selected="handleAction" class="ml-3" />
                </div>

                <NavTree :list="element.children" :child-actions="childActions" @change="$emit('change', true)"
                    @add-child="handleAction" @edit-item="handleEdit" @remove-item="$emit('removeItem', true)" />
            </li>
        </template>
    </draggable>
</template>

<script setup>
import draggable from 'vuedraggable'

const props = defineProps({
    list: Array,
    childActions: Array
})

const emit = defineEmits(['addChild', 'editItem', 'removeItem', 'change'])

/* Menu Items actions */
const handleAction = (event) => {

    if (event.action == 'remove') {
        props.list.splice(event.item.index, 1)
        emit('removeItem', true)
    } else {
        emit('addChild', event)
    }
}

const handleEdit = (event) => {
    emit('editItem', event)
}

</script>

<style lang="scss">
ul {
    >li>ul {
        margin-left: 25px;
    }

    .item {
        &.error {
            background: var(--el-color-danger-light-9);
        }
    }

    .item-type {
        text-transform: uppercase;
        opacity: .5;
        font-size: 10px;
    }
}
</style>
