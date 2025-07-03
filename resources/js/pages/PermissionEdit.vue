<template>
    <div class="py-6 px-10">
        <div class="invicta-form w-2/3">
            <div class="flex items-center justify-between mb-4">
                <div>
                    <h1>{{ title }}</h1>
                </div>
                <el-button type="primary" @click="submit" :disabled="loading" :loading="loading">Save</el-button>
            </div>
            <div class="flex items-center justify-center h-full" v-if="loading">
                <Loading />
            </div>
            <div class="w-full" v-else>
                <template v-for="tree in trees">
                    <div class="pb-6">
                        <header v-if="tree.label" class="text-base font-bold pb-2">{{ tree.label }}</header>
                        <el-card>
                            <div class="px-5">
                                <CheckTree :initial-items="tree.children" :disabled="false" :depth="1" />
                            </div>
                        </el-card>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const title = ref('Permissions')
const loading = ref(false)

const form = reactive({
    permissions: []
})
const permissionsTree = ref([])
const permissions = ref([])

onMounted(() => {
    getPermissions(true)
})

watch(() => route.params.id, () => {
    getPermissions()
})

function getPermissions(getTree = false) {
    loading.value = true

    let params = getTree
        ? { params: { tree: true } }
        : {}

    Invicta.fetch.get(`api${route.path}`, params)
        .then((data) => {
            if (getTree && data.tree) {
                permissionsTree.value = data.tree
            }

            title.value = `${data.title} Permissions`
            Invicta.pageTitle(title.value)
            permissions.value = data.permissions
            loading.value = false
        })
}

const trees = computed(() => {
    return permissionsTree.value.map((group) => {
        return {
            checked: true, // needed for the submit
            label: group.label,
            children: group.permissions.map((permission) => parsePermissionItem(permission))
        }
    })
})

function parsePermissionItem(permissionItem) {
    return {
        label: permissionItem.label,
        value: permissionItem.permission,
        checked: permissions.value.length ? permissions.value.includes(permissionItem.permission) : false,
        children: permissionItem.children ? permissionItem.children.map((children) => parsePermissionItem(children)) : []
    }
}

function submit() {
    loading.value = true
    let permissions = pickBy(checked(trees.value), isString)

    Invicta.fetch.post(`api${route.path}`, { permissions })
        .then((data) => {
            Invicta.message(data.message)
            loading.value = false
        })
}
</script>
