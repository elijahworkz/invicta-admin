<template>
    <div class="actions flex items-center justify-end">
        <ActionsDropdown v-if="actions.length" :actions="actions" :item="id" @selected="handleAction" class="mr-2" />

        <router-link v-if="hasDetail" :to="{ name: 'resourceDetail', params: { id, handle: resourceHandle } }"
            class="action-icon">
            <SvgIcon :icon="mdiEyeOutline" />
        </router-link>
        <router-link v-if="canEdit" :to="{ name: 'resourceEdit', params: { id, handle: resourceHandle } }"
            class="action-icon">
            <SvgIcon :icon="mdiSquareEditOutline" />
        </router-link>
        <span v-if="canDelete" class="action-icon" @click="$emit('delete', [id])" title="Delete Item">
            <SvgIcon :icon="mdiTrashCanOutline" />
        </span>

    </div>
</template>

<script setup>
import { mdiTrashCanOutline, mdiEyeOutline, mdiSquareEditOutline } from '@mdi/js'

const props = defineProps({
    id: Number,
    resourceHandle: String,
    actions: Array,
    hasDetail: Boolean,
    canEdit: Boolean,
    canDelete: Boolean,
})

const handleAction = (event) => {
    console.log('action call', event)
    Invicta.emit('action-called', { action: event.action, selected: [props.id] })
}
</script>
