<template>
    <el-table-column
        :prop="id"
        v-bind="props"
        :align="align(props)"
        :header-align="align(props, true)"
        :sortable="props.sortable ? 'custom' : false"
        :column-key="props.editLink || props.customLink ? 'no-select' : null">

        <template #default="scope">
            <i v-if="props.boolean" class="icon-status" :class="{ 'success' : scope.row[id] }"></i>
            <div v-else-if="props.list">
                {{ buildList(scope.row[id], props.titleField) }}
            </div>
            <div
                v-else-if="props.editLink && canEdit"
                @click.prevent="$emit('edit', scope.row.id)"
                class="edit-link"
                >
                <CopyText :text="scope.row[id]" :can-copy="props.canCopy"/>
            </div>
            <router-link 
                v-else-if="props.customLink && canEdit"
                :to="customLink(props.customLink, scope.row)">
                <span class="edit-link">
                    <CopyText :text="scope.row[id]" :can-copy="props.canCopy"/>
                </span>
            </router-link>
            <router-link
                v-else-if="props.detailLink && hasDetail"
                :to="{ name: 'resourceDetail', params: {id: scope.row.id}}">
                <span class="edit-link">
                    <CopyText :text="scope.row[id]" :can-copy="props.canCopy"/>
                </span>
            </router-link>
            <div v-else>
                <CopyText :text="scope.row[id]" :can-copy="props.canCopy"/>
            </div>
        </template>

    </el-table-column>
</template>

<script setup>

defineProps({
    id: String,
    props: Object,
    canEdit: Boolean,
    hasDetail: Boolean,
})

const align = (props, header = false) => props.boolean ? 'center' : (header ? props.headerAlign : props.align)

function buildList(item, titleField) {
    if (Array.isArray(item)) {
        return item.map(i => i[titleField]).join(', ')
    }

    return (typeof item === 'object') ? item[titleField] : item
}

function customLink(link, item) {
    let linkParts = link.split('/')

    if (linkParts.length) {
        linkParts.forEach((part, index) => {
            if (part.includes(':')) {
                let param = part.substring(1) // we try to get param name
                let value = item[param] ?? null

                if (value) {
                    linkParts[index] = value
                }
            }
        })
        linkParts = linkParts.join('/')
    }
    return linkParts
}
</script>