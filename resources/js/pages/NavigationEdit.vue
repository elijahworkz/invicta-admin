<template>
    <div class="py-6 px-10">
        <div class="w-2/3 mx-auto" v-loading="loading">
            <div class="flex items-end justify-between mb-4">
                <div>
                    <router-link :to="{ name: 'resourceIndex', params: { handle: 'navigation' } }" class="breadcrumb">
                        <el-icon>
                            <ArrowLeft />
                        </el-icon>Navigation</router-link>
                    <h1 class="mb-1">{{ menuTitle }}</h1>
                </div>
                <div class="nav-actions flex items-center">

                    <NavLocalizations v-if="localizations" :localizations="localizations" />

                    <el-dropdown @command="handleCommand" class="mr-2">
                        <el-button size="large">
                            New Item<el-icon class="el-icon--right"><arrow-down /></el-icon>
                        </el-button>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item v-for="(resource, handle) in resources" :command="handle">{{
                                    resource.title }}</el-dropdown-item>
                                <el-dropdown-item command="custom">Custom Link</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>

                    <el-button size="large" type="primary" @click="saveNavigation" :disabled="!canSave">Save
                        Changes</el-button>
                </div>
            </div>

            <div class="mb-3" v-if="hasErrors">
                <el-alert title="This navigation has errors! Save disabled." type="error" effect="dark" show-icon
                    :closable="false" />
            </div>

            <NavTree :key="locale" :list="treeItems" :child-actions="childActions" @add-child="addChild"
                @edit-item="editItem" @change="dirtyState = true" @remove-item="dirtyState = true" />
        </div>
    </div>

    <Drawer v-if="drawer.state" :style="{ width: '400px' }" @close="drawer.state = false">
        <ItemsSelector v-if="drawer.context == 'list'" :select="['title', 'locale']" :columns="tableColumns"
            :exclude="excludeItems[currentResource]" :request-url="itemsUrl" :title-field="titleField"
            :resource-handle="currentResource" @selected="updateItems" @cancel="drawer.state = false"
            :where="`locale='${locale}'`" />

        <NavItemForm v-if="drawer.context == 'form'" :mode="formMode" :item-data="formItem" @saved="updateItem"
            @close="drawer.state = false" />
    </Drawer>
</template>

<script setup>
import { ArrowLeft, ArrowDown } from '@element-plus/icons-vue'
import NavLocalizations from '../components/locale/NavLocalizations.vue';
import { useRoute } from 'vue-router'

const route = useRoute()

const loading = ref(false)
const actionUrl = ref('')
const menuTitle = ref('Menu')
const locale = ref('')
const localizations = ref(null)
const resources = ref(null)
const treeItems = ref(null)

const drawer = reactive({
    state: false,
    context: 'list'
})

watch(() => route.params.id, getNav, { immediate: true })
function getNav(id) {
    loading.value = true

    Invicta.fetch.get(`api/navigation/${id}/items`)
        .then((data) => {
            actionUrl.value = data.actionUrl
            menuTitle.value = data.menuTitle
            locale.value = data.locale
            localizations.value = data.localizations
            treeItems.value = data.tree
            resources.value = data.resources
            loading.value = false
        })
}
const tableColumns = { title: { label: 'Title', sortable: true }, locale: { label: 'Locale', align: 'center' } }

const itemsUrl = ref('')
const titleField = ref()
const currentResource = ref('link')
const currentItem = ref(null)
const dirtyState = ref(false)

const hasErrors = computed(() => {
    if (treeItems.value) {
        return checkTreeForErrors(treeItems.value)
    }
    return false
})

const canSave = computed(() => {
    return dirtyState.value && !hasErrors.value
})

function checkTreeForErrors(branches) {
    let error = false
    for (let branch of branches) {
        if ('error' in branch) {
            error = true
            break
        }

        if (branch.children.length) {
            error = checkTreeForErrors(branch.children)
        }
    }
    return error
}

/* Build Menu Items */
const excludeItems = computed(() => {
    return treeItems.value.reduce((obj, item) => {
        obj[item.handle] = obj[item.handle] || []
        obj[item.handle].push(item.id)
        return obj
    }, {})
})

const updateChildItems = (tree, items) => {
    tree.forEach(item => {
        if (item.id == currentItem.value.id
            && item.handle == currentItem.value.handle
            && item.label == currentItem.value.label) {
            console.log('debugging items', item.id, currentItem.value.id, item.handle, currentItem.value.handle)
            item.children.push(...items)
        } else if (item.children.length) {
            console.log('nav items have children')
            updateChildItems(item.children, items)
        }
    })
    return tree
}

const updateItems = (selected) => {
    drawer.state = false
    let items = selected.map(item => {
        return {
            label: item[titleField.value],
            url: item?.url,
            id: item?.id,
            handle: currentResource.value,
            type: resources.value[currentResource.value]?.title || item?.type,
            icon: item?.icon,
            css: item?.css,
            text: item?.text,
            external: item?.external,
            children: []
        }
    })

    console.log('something was selected', selected, currentItem.value)

    if (currentItem.value) {
        treeItems.value = updateChildItems(treeItems.value, items)
    } else {
        treeItems.value = [...treeItems.value, ...items]
    }

    currentItem.value = null
    currentResource.value = 'custom'
    dirtyState.value = true
}

/* Action Commands */

const childActions = map(resources.value, (item, handle) => {
    return { name: item.title, action: handle }
})
childActions.push({ name: 'Custom Link', action: 'custom', divider: true })
childActions.push({ name: 'Remove Item', action: 'remove', danger: true })

const handleCommand = (command) => {
    if (command == 'custom') {
        addCustomLink()
    } else {
        selectItems(command)
    }
    currentResource.value = command
}

const addChild = (event) => {
    console.log('adding child', event)
    currentItem.value = event.item
    currentResource.value = event.action

    if (event.action == 'custom') {
        addCustomLink()
    } else {
        selectItems(event.action)
    }
}

function selectItems(handle) {
    drawer.context = 'list'
    titleField.value = resources.value[handle].titleField
    itemsUrl.value = `/api/resource/${handle}/items`
    drawer.state = true
}

/* Setup Item Form */
const formMode = ref('create')
const formItem = ref({})

const newItem = {
    label: '',
    url: '',
    css: '',
    icon: '',
    text: '',
    external: false,
}

const addCustomLink = () => {
    formMode.value = 'create'
    formItem.value = { ...newItem }
    drawer.context = 'form'
    drawer.state = true
}

const updateItem = (item) => {
    drawer.state = false
    titleField.value = 'label'

    if (!item.id) {
        console.log('check for type', item.url, item.url == '')
        item.type = item.url == '' ? 'Text' : 'Link'
    }

    if (formMode.value == 'create') {
        updateItems([item])
    }
    dirtyState.value = true
}

const editItem = (item) => {
    console.log('editing item', item)

    formMode.value = 'edit'
    formItem.value = item
    drawer.context = 'form'
    drawer.state = true
}

/* Save Navigation */

const saveNavigation = () => {
    Invicta.fetch.post(actionUrl.value, { tree: treeItems.value })
        .then((data) => {
            Invicta.message(data.message)
        })
}
</script>

<style>
.el-alert__title {
    vertical-align: middle;
}
</style>
